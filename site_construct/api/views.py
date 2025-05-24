from django.shortcuts import render
from rest_framework import viewsets, mixins, permissions, status, views, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from enum import Enum
import datetime
from .functions import define_this_week_period, fill_this_week_with_days, unwrap_categories, unwrap_categories_items, define_this_month_period
from .models import (
    Basket,
    BasketItem,
    CharacteristicsCategory,
    CommentReply,
    DeliveryMethod,
    GoodCategory,
    GoodItem,
    ItemMedia,
    MoneyPayout,
    PaymentMethod,
    Order,
    Characteristics,
    Like,
    Comment,
    Refund,
    Transaction,
)
from .serializers import (
    # AnalyticsSerializer,
    BasketItemCreateSerializer,
    BasketItemSerializer,
    CharacteristicsCategoryResponseSerializer,
    CommentCreateSerializer,
    CommentReplySerializer,
    CommentSerializer,
    CommentToSellerSerialzier,
    DeliveryMethodSerializer,
    GoodCategorySerializer,
    GoodItemCreateSerializer,
    GoodItemInWishListSerializer,
    GoodItemRetrieveSerializer,
    GoodItemSerializer,
    ItemApplyCharacteristic,
    ListApply,
    OrderStatusChangeSerializer,
    OrderToSellerSerializer,
    PaymentMethodCreateSerializer,
    PaymentMethodSerializer,
    RefundCreateSerializer,
    RefundResponseSerializer,
    SwitchSerializer,
    UserSerializer,
    OrderToBuyerSerializer,
    OrderCreateSerializer,
    CharacteristicCreateSerializer,
    CharacteristicSerializer,
    CharacteristicCategorySerializer,
    SimplifiedGoodItemSerializer,
)
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from .permissions import (
    AdminOrReadOnly,
    IsSeller,
    Owner,
    OwnerOrReadOnly,
    AdminOrModerator,
    SellerOrReadOnly,
    IsBuyer,
)
from .paginators import CustomPagination
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Sum, Q, F, Avg, Count
import httpx
import uuid
from django.conf import settings

User = get_user_model()
BASE_NOTIFICATION_URL = "http://188.68.80.72/api/v1/notifications/"

class GoodCategoryViewSet(viewsets.ModelViewSet):
    queryset = GoodCategory.objects.all()
    serializer_class = GoodCategorySerializer  # необходимо перегрузить лист категорий пагинацией ( вроде есть в фильтрах насколько я помню )
    permission_classes = (AdminOrReadOnly,)
    filter_backends = [filters.SearchFilter]
    search_fields = ("title",)

    @action(
        methods=["GET"],
        detail=True,
        url_path="items",
        pagination_class=CustomPagination,
        serializer_class=GoodItemSerializer,
    )
    def get_items(self, request, pk):
        items = unwrap_categories_items(GoodCategory.objects.get(id=pk))

        page = self.paginate_queryset(items)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(items, many=True)
        return Response(serializer.data)

    @action(methods=["GET"], url_path="characteristics", detail=True)
    def get_characteristics(self, request, pk):
        characteristics = unwrap_categories(GoodCategory.objects.get(id=pk))
        characteristics = CharacteristicsCategoryResponseSerializer(
            characteristics, many=True
        )
        return Response(characteristics.data)


class GoodItemViewSet(viewsets.ModelViewSet):
    queryset = GoodItem.objects.all()
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    permission_classes = (permissions.AllowAny,)
    filterset_fields = ('visible',)
    search_fields = ("name", "description")
    pagination_class = CustomPagination

    def get_queryset(self):
        if (
            not self.request.user.is_anonymous
            and self.request.user.user_type == "Продавец"
        ):
            return GoodItem.objects.filter(user=self.request.user).all()
        return GoodItem.objects.filter(visible=True).all()

    def get_serializer_class(self):
        if self.action == "apply_characteristic":
            return ListApply
        if self.action == "add_to_wishlist":
            return SwitchSerializer
        if (
            self.request.method == "POST"
            or self.request.method == "PATCH"
            or self.request.method == "PUT"
        ):
            return GoodItemCreateSerializer
        if self.action == "list" or self.action == "bought":
            return GoodItemSerializer
        return GoodItemRetrieveSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

    def create(self, request):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            instance = serializer.save(user=request.user)
            returning = SimplifiedGoodItemSerializer(instance=instance)
            return Response(returning.data)
        return Response(serializer.errors)

    @action(
        detail=True,
        methods=["POST"],
        url_path="apply_characteristic",
        serializer_class=ListApply,
    )
    def apply_characteristic(self, request, pk):
        item = GoodItem.objects.get(id=pk)
        payload = self.serializer_class(data=request.data)

        if not payload.is_valid():
            return Response(
                {"error": "Не обнаружено "}, status=status.HTTP_400_BAD_REQUEST
            )

        for another_characteristic in payload.data["characteristics"]:
            characteristic = Characteristics.objects.get(
                id=another_characteristic["characteristic"]
            )
            item.characteristics.add(
                characteristic,
                through_defaults={"body": another_characteristic["body"]},
            )
        return Response({"success": "Успешно"}, status=status.HTTP_200_OK)

    @action(
        detail=True,
        methods=["POST"],
        url_path="switch_wishlist",
        permission_classes=(permissions.IsAuthenticated,),
    )
    def add_to_wishlist(self, request, pk):
        item = GoodItem.objects.get(id=pk)
        user = request.user
        status = self.get_serializer(data=request.data)

        if not status.is_valid():
            return Response(status.errors)
        like = Like.objects.filter(item=item).filter(user=user).first()
        if like is not None and not status.data["enable"]:
            like.delete()
        elif like is None:
            like = Like.objects.create(item=item, user=user)
            like.save()
        return Response({"enabled": status.data["enable"]})

    @action(detail=True, methods=["PATCH"], url_path="remove_media")
    def remove_media(self, request, pk):
        good_item = GoodItem.objects.get(id=pk)
        ids = request.data

        item_medias = (
            ItemMedia.objects.filter(item=good_item).filter(id__in=ids).delete()
        )
        return Response({"success": True})

    def perform_create(self, serializer):
        instance = serializer.save(user=self.request.user)
        return instance.id

    @action(detail=True, methods=["GET"], url_path="comments")
    def get_comments(self, request, pk):
        comments = Comment.objects.filter(item_id=pk).all()
        comments_serializer = CommentSerializer(data=comments, many=True)
        comments_serializer.is_valid()
        return Response(comments_serializer.data)

    @action(
        detail=False,
        methods=["GET"],
        url_path="bought",
        permission_classes=(permissions.IsAuthenticated, IsBuyer),
    )
    def get_bought(self, request):
        baskets = (
            BasketItem.objects.filter(
                basket__in=Basket.objects.filter(user=request.user).filter(
                    visible=False
                )
            )
            .values_list("good_item_id", flat=True)
            .distinct()
        )
        items = GoodItem.objects.filter(id__in=baskets).all()
        seriazlier = self.get_serializer(data=items, many=True)
        seriazlier.is_valid()
        return Response(seriazlier.data)

    @action(
        detail=False,
        methods=["GET"],
        url_path="refunded",
        permission_classes=(permissions.IsAuthenticated, IsBuyer),
    )
    def get_refunded(self, request):
        declined_orders = (
            Order.objects.filter(user=request.user)
            .filter(status=Order.OrderStatusChoices.REFUND)
            .select_related("basket")
            .values_list("basket__id", flat=True)
            .distinct()
        )
        baskets = (
            BasketItem.objects.filter(basket_id__in=declined_orders)
            .values_list("good_item_id", flat=True)
            .distinct()
        )
        items = GoodItem.objects.filter(id__in=baskets).all()
        seriazlier = self.get_serializer(data=items, many=True)
        seriazlier.is_valid()
        return Response(seriazlier.data)

    @action(
        detail=False,
        methods=["GET"],
        url_path="bought/uncommented",
        permission_classes=(permissions.IsAuthenticated, IsBuyer),
    )
    def get_uncommented(self, request):
        baskets = (
            BasketItem.objects.filter(
                basket__in=Basket.objects.filter(user=request.user).filter(
                    visible=False
                )
            )
            .values_list("good_item_id", flat=True)
            .distinct()
        )
        commented_items = Comment.objects.filter(user=request.user).values_list(
            "item_id", flat=True
        )
        items = (
            GoodItem.objects.filter(id__in=baskets)
            .exclude(id__in=commented_items)
            .all()
        )
        seriazlier = self.get_serializer(data=items, many=True)
        seriazlier.is_valid()
        return Response(seriazlier.data)


class PaymentMethodViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentMethodSerializer
    mission_classes = (OwnerOrReadOnly,)

    def get_serializer_class(self):
        if self.request.method == "GET":
            return PaymentMethodSerializer
        return PaymentMethodCreateSerializer

    def get_queryset(self):
        return PaymentMethod.objects.filter(user=self.request.user).all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class DeliveryMethodViewSet(viewsets.ModelViewSet):
    queryset = DeliveryMethod.objects.all()
    serializer_class = DeliveryMethodSerializer
    permission_classes = (AdminOrReadOnly,)


class BasketItemViewSet(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.UpdateModelMixin,
):
    permission_classes = (permissions.IsAuthenticated,)

    def get_serializer_class(self):
        if self.action == "switch_to_order":
            return SwitchSerializer
        if self.request.method == "POST":
            return BasketItemCreateSerializer
        return BasketItemSerializer

    def get_queryset(self):
        basket = Basket.objects.filter(visible=True).filter(
            user__id=self.request.user.id
        )
        basket_order = (
            Basket.objects.filter(visible=False)
            .filter(user=self.request.user)
            .filter(currently_for_order=True)
            .first()
        )
        if len(basket) == 0:
            basket = Basket.objects.create(user_id=self.request.user.id)
        else:
            basket = basket.get()
        basket_items = BasketItem.objects.filter(
            Q(basket=basket) | Q(basket=basket_order)
        )
        return basket_items

    def create(self, request, *args, **kwargs):
        basket = Basket.objects.filter(visible=True).filter(user=self.request.user)
        if len(basket) == 0:
            basket = Basket.objects.create(user=self.request.user)
        else:
            basket = basket.get()

        basket_item = BasketItemCreateSerializer(data=request.data)
        if not basket_item.is_valid():
            return Response(basket_item.errors)

        try:
            basket_item.save(basket=basket)
        except:
            return Response(
                {"error": "Такой товар уже есть в корзине"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(basket_item.data, status=status.HTTP_200_OK)

    @action(detail=True, url_path="switch_to_order", methods=["POST"])
    def switch_to_order(self, request, pk):
        status = self.get_serializer(data=request.data)

        if not status.is_valid():
            return Response(status.errors)

        basket_item = BasketItem.objects.get(id=pk)

        if status.data["enable"]:
            order_basket = (
                Basket.objects.filter(user=request.user)
                .filter(visible=False)
                .filter(currently_for_order=True)
                .first()
            )

            if order_basket is None:
                order_basket = Basket.objects.create(
                    user=request.user, visible=False, currently_for_order=True
                )
                order_basket.save()

            basket_item.basket = order_basket
        else:
            default_basket = (
                Basket.objects.filter(user=request.user).filter(visible=True).first()
            )
            basket_item.basket = default_basket
        basket_item.save()

        return Response({"enabled": status.data["enable"]})


class UsersViewSet(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
    mixins.UpdateModelMixin,
):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AdminOrReadOnly,)

    @action(
        detail=False,
        url_path="me",
        methods=["GET", "PATCH"],
        permission_classes=(permissions.IsAuthenticated,),
    )
    def active_user(self, request, *args, **kwargs):
        if self.request.method == "GET":
            serializer = self.serializer_class(request.user)
            return Response(serializer.data)
        if self.request.method == "PATCH":
            print(request.data)
            serializer = self.serializer_class(
                request.user, data=request.data, partial=True
            )
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors)


class OrderViewSet(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
    mixins.CreateModelMixin,
):
    permission_classes = (OwnerOrReadOnly,)
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ("status",)

    def get_serializer_class(self):
        if self.action == 'patch_change_status':
            return OrderStatusChangeSerializer
        if self.request.method == "GET":
            if self.request.user.user_type == "Продавец":
                return OrderToSellerSerializer
            return OrderToBuyerSerializer
        elif self.request.method == "POST":
            return OrderCreateSerializer

    def get_queryset(self):
        if self.request.user.user_type == "Продавец":
            bought_baskets = (
                Basket.objects.filter(visible=False)
                .filter(currently_for_order=False)
                .filter()
                .all()
            )
            baskets = (
                BasketItem.objects.filter(basket__in=bought_baskets)
                .select_related("good_item")
                .filter(good_item__user=self.request.user)
                .values_list("basket_id", flat=True)
                .all()
            )
            return Order.objects.filter(basket_id__in=baskets).all()
        return Order.objects.filter(user=self.request.user).all()

    def create(self, request, *args, **kwargs):
        order = OrderCreateSerializer(data=request.data)

        if not order.is_valid():
            return Response(order.errors)

        basket = (
            Basket.objects.filter(visible=False)
            .filter(user__id=self.request.user.id)
            .filter(currently_for_order=True)
            .first()
        )

        if basket is None:
            return Response(
                {"error": "Невозможно создать заказ с пустой корзиной!"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        sum_total = (
            BasketItem.objects.filter(basket=basket)
            .select_related("good_item")
            .aggregate(total=Sum(F("good_item__price") * F("count")))["total"]
        )

        if sum_total == 0:
            return Response(
                {"error": "Невозможно создать заказ с пустой корзиной!"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        instance = order.save(basket=basket, payment_total=sum_total, user=self.request.user)
        transaction = Transaction.objects.create(amount=sum_total, order=instance, user=self.request.user)

        try:
            # тут оплата будет
            authorization = f"Basic {settings.YOMONEY_TESTKEY}"
            headers = {
                "Idempotence-Key": str(uuid.uuid4()),
                "Authorization": authorization
            }
            data = {
                "amount":{
                    "value": sum_total,
                    "currency": "RUB"
                },
                "capture": True,
                "confirmation": {
                    "type": "redirect",
                    "return_url": "http://localhost:3000/orders"
                },
                "description": f"Оплата заказа №{instance.id}",
                "metadata": {
                    "order_id": instance.id,
                    "transaction_id": transaction.id
                }
            }

            response = httpx.post(url="https://api.yookassa.ru/v3/payments", headers=headers, json=data)
            response = response.json()

            transaction.checkout_id = response["id"]
            transaction.save()

            user_response = {
                "payment_url": response["confirmation"]["confirmation_url"],
                "description": response["description"],
                "amount": response["amount"]
            }
            return Response(user_response, status=status.HTTP_200_OK)
        except Exception as e:
            instance.delete()
            transaction.delete()
            print(e)
            return Response({"error": "Something went wrong."}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, url_path="ended", methods=["GET"])
    def get_ended(self, request):
        orders = (
            self.get_queryset()
            .filter(Q(status="Получено") | Q(status="Отклонен") | Q(status="Возврат"))
            .all()
        )
        orders_serializer = self.get_serializer(data=orders, many=True)
        orders_serializer.is_valid()
        return Response(orders_serializer.data)

    @action(detail=False, url_path="processing", methods=["GET"])
    def get_processing(self, request):
        orders = (
            self.get_queryset()
            .filter(
                Q(status="В пути")
                | Q(status="Доставлено")
                | Q(status="Оплачено")
                | Q(status="В обработке")
            )
            .all()
        )
        orders_serializer = self.get_serializer(data=orders, many=True)
        orders_serializer.is_valid()
        return Response(orders_serializer.data)
    
    @action(detail=True, url_path="change_status", methods=["PATCH"], permission_classes=())
    def patch_change_status(self, request, pk):
        status = self.get_serializer(data=request.data)
        if not status.is_valid():
            return Response(status.errors)
        instance = Order.objects.get(id=pk)
        instance.status = status.data['status']
        instance.save()

        if instance.status == Order.OrderStatusChoices.RECEIVED:
            MoneyPayout.objects.filter(user_from=instance.user, order=instance).update(status=MoneyPayout.States.PAYOUT)
            return Response({"status": "Выплаты произведены"})
        else:        
            data = {
                "user_id": instance.user.id,
                "body": f"Статус вашего заказа №{instance.id} изменился на {instance.status}",
                "type": "Изменился статус заказа" 
            }

            httpx.post(BASE_NOTIFICATION_URL, json=data)
            return Response(status.data)
    
    @action(detail=False, url_path="payment_accept", methods=["POST"], permission_classes=(permissions.AllowAny,))
    def payment_accept(self, request):
        response = request.data

        metadata = response['object']['metadata']
        
        order_id = metadata['order_id']
        transaction_id = metadata['transaction_id']
        success = response['event'] == "payment.succeeded"

        order = Order.objects.get(id=order_id)
        transaction = Transaction.objects.get(id=transaction_id)

        transaction.status = Transaction.StatusChoices.SUCCESS if success else Transaction.StatusChoices.ERROR
        transaction.save()

        if not success:
            order.delete()
            return Response({"success": False}, status=status.HTTP_200_OK)
        
        # Тут получается, что деньги у нас, и надо будет создать переводы всем продавцам с вычетом коммисии
        basket = order.basket

        basket.currently_for_order = False
        basket.save()
        
        sellers = BasketItem.objects.filter(basket=basket).select_related("good_item").all()

        for basket_item in sellers:
            seller = basket_item.good_item.user
            amount = basket_item.good_item.price * basket_item.count
            payout = MoneyPayout.objects.create(user_from=order.user, user_to=seller, amount=amount, good_item=basket_item.good_item, order=order)

            data = {
                'user_id': seller.id,
                'type': 'Новый заказ',
                'body': f'Появился новый заказ! Его номер {order.id}. Скорее посмотрите, что в нем!'
            }
            response = httpx.post(BASE_NOTIFICATION_URL, json=data)

        return Response({"success": True}, status=status.HTTP_200_OK)


class CharacteristicViewSet(
    viewsets.GenericViewSet,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.UpdateModelMixin,
):
    permission_classes = (AdminOrReadOnly,)
    serializer_class = CharacteristicCreateSerializer
    queryset = Characteristics.objects.all()


class GetMyWishlistView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        user = request.user
        wishlist = Like.objects.filter(user=user).select_related("item").filter(item__visible=True).all()

        items = [like.item for like in wishlist]

        serializer = GoodItemInWishListSerializer(data=items, many=True)
        serializer.is_valid()
        return Response(serializer.data)


class SellerAnalyticsView(views.APIView):
    permission_classes = (IsSeller, )

    def get(self, request):
        pass

class CommentViewSet(viewsets.ModelViewSet):
    def get_serializer_class(self):
        if self.request.method == "GET":
            if self.request.user.user_type == "Покупатель":
                return CommentSerializer
            else:
                return CommentToSellerSerialzier
        return CommentCreateSerializer

    @action(methods=["GET"], detail=True, url_path="replies")
    def get_replies(self, request, pk):
        comment_replies = CommentReply.objects.filter(comment_id=pk).all()
        comments = CommentReplySerializer(data=comment_replies, many=True)
        comments.is_valid()
        return Response(comments.data)

    def get_queryset(self):
        if self.request.user.user_type == "Покупатель":
            return Comment.objects.filter(user=self.request.user).all()
        items = GoodItem.objects.filter(user=self.request.user).all()
        return Comment.objects.filter(item__in=items).all()

    def create(self, request, *args, **kwargs):
        comment = CommentCreateSerializer(data=request.data)

        if not comment.is_valid():
            return Response(comment.errors)

        basket_ids = (
            BasketItem.objects.filter(
                basket__in=Basket.objects.filter(user=self.request.user).filter(
                    visible=False
                )
            )
            .values_list("good_item_id", flat=True)
            .distinct()
        )

        if comment.initial_data["item"] not in basket_ids:
            return Response(
                {"detail": "You did not ordered this item yet"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        comment.save(user=self.request.user)
        return Response(comment.data)


class CommentReplyViewSet(
    viewsets.GenericViewSet,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
):
    serializer_class = CommentReplySerializer
    permission_classes = (SellerOrReadOnly,)

    def get_queryset(self):
        return CommentReply.objects.filter(user=self.request.user).all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CharacteristicCategoryViewSet(
    viewsets.GenericViewSet,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
):
    serializer_class = CharacteristicCategorySerializer
    permission_classes = (AdminOrReadOnly,)
    queryset = CharacteristicsCategory.objects.all()


class RefundViewSet(viewsets.ModelViewSet):
    def get_serializer_class(self):
        if self.request.method == "POST":
            return RefundCreateSerializer
        return RefundResponseSerializer

    def get_queryset(self):
        if self.request.user.class_type != 'Продавец':
            return Refund.objects.filter(user=self.request.user).all()  # dodelat
        return Refund.objects.filter(good_item__in=GoodItem.objects.filter(user=self.request.user).all()).all()

    def create(self, request, *args, **kwargs):
        payload = self.get_serializer(data=request.data)

        if not payload.is_valid():
            return Response(payload.errors)
        
        order = Order.objects.get(id=payload.initial_data["order"])
        
        order_items = GoodItem.objects.filter(id__in=BasketItem.objects.filter(basket=order.basket).values_list('good_item_id', flat=True)).values_list('id', flat=True)
        if payload.data['item'] not in order_items:
            return Response({'detail': 'You cant refund item, that is not in your order'}, status=status.HTTP_400_BAD_REQUEST)
        
        item = GoodItem.objects.get(payload.data['item'])


        payout =  MoneyPayout.objects.filter(user_from=self.request.user, order=order, good_item=item).first()
        if payout is not None:
            payout.state = payout.States.REFUND # Возврат
        httpx.post(url=BASE_NOTIFICATION_URL, json={ # вообще по-хорошему добавить очередь, так как если проихсодит ошибка, то все падает. Но в рамках теста все гарантируется (надо бы исправить)
            'user_id': item.id,
            'body': f"На ваш товар \"{item.name}\" оформлен возрат. ",
            'type': 'Возврат'
        })

        return Response(payload.data)
    

class AnalyticsViewSet(views.APIView):
    permission_classes = (permissions.IsAuthenticated, IsSeller)
    # serializer = AnalyticsSerializer
    
    def get(self, request): #in this month
        total_payed = MoneyPayout.objects.filter(user_to=request.user, state="Выплата").aggregate(Sum('amount'))
        total_freezed = MoneyPayout.objects.filter(user_to=request.user, state="Заморожен").aggregate(Sum('amount'))
        good_items = GoodItem.objects.filter(user=request.user).all()
        bought_baskets = (
            Basket.objects.filter(visible=False)
            .filter(currently_for_order=False)
            .filter()
            .all()
        )
        baskets = (
            BasketItem.objects.filter(basket__in=bought_baskets)
            .select_related("good_item")
            .filter(good_item__user=self.request.user)
            .values_list("basket_id", flat=True)
            .all()
        )
        start, end = define_this_month_period()
        orders = Order.objects.filter(basket_id__in=baskets).filter(created_at__gte=start, created_at__lte=end).all()
        today_orders = Order.objects.filter(basket_id__in=baskets).filter(created_at__date=datetime.date.today()).count()
        refunds = Refund.objects.filter(item__in=good_items).filter(created_at__gte=start, created_at__lte=end).all()
        today_refudns = Refund.objects.filter(item__in=good_items).filter(created_at__date=datetime.date.today()).count()
        average_rating = Comment.objects.filter(item__in=good_items).aggregate(Avg("rate"), Count("rate"))

        return Response({
            'total_payed': total_payed,
            'total_freezed': total_freezed,
            'orders_per_this_month': {
                'total': len(orders),
                'newest': today_orders
            },
            'refunds_per_this_month': {
                'total': len(refunds),
                'newset': today_refudns
            },
            'average_rating': average_rating
        })


class SellDynamicsViewSet(views.APIView):
    permission_classes = (permissions.IsAuthenticated, IsSeller)
    
    def get(self, request):
        start, end = define_this_week_period()
        orders = Order.objects.values('created_at__date').annotate(count=Count('id')).values('created_at__date', 'count').filter(created_at__gte=start, created_at__lte=end).order_by('created_at__date')
        total_profits = MoneyPayout.objects.filter(Q(state="Заморожен") | Q(state="Выплата")).filter(user_to=request.user).filter(created_at__gte=start, created_at__lte=end).values('created_at__date').annotate(count=Sum('amount')).values('created_at__date', 'count').order_by('created_at__date')
        
        orders = fill_this_week_with_days(orders, start)
        total_profits = fill_this_week_with_days(total_profits, start)

        data = {
            'order_counts': orders,
            'order_profits': total_profits
        }

        return Response(data)