from django.shortcuts import render
from rest_framework import viewsets, mixins, permissions, status, views
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from .models import (
    Basket,
    BasketItem,
    CommentReply,
    DeliveryMethod,
    GoodCategory,
    GoodItem,
    Market,
    PaymentMethod,
    Recipent,
    Order,
    Characteristics,
    Like,
    Comment
)
from .serializers import (
    BasketItemCreateSerializer,
    BasketItemSerializer,
    CommentCreateSerializer,
    CommentReplySerializer,
    CommentSerializer,
    DeliveryMethodSerializer,
    GoodCategorySerializer,
    GoodItemCreateSerializer,
    GoodItemRetrieveSerializer,
    GoodItemSerializer,
    ItemApplyCharacteristic,
    MarketSerializer,
    PaymentMethodCreateSerializer,
    PaymentMethodSerializer,
    RecipentSerializer,
    UserSerializer,
    OrderToBuyerSerializer,
    OrderCreateSerializer,
    CharacteristicCreateSerializer,
    CharacteristicSerializer
)
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from .permissions import AdminOrReadOnly, Owner, OwnerOrReadOnly, AdminOrModerator, SellerOrReadOnly
from .paginators import CustomPagination
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Sum

User = get_user_model()


class GoodCategoryViewSet(viewsets.ModelViewSet):
    queryset = GoodCategory.objects.all()
    serializer_class = GoodCategorySerializer  # необходимо перегрузить лист категорий пагинацией ( вроде есть в фильтрах насколько я помню )
    permission_classes = (AdminOrReadOnly,)
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ("title",)

    @action(
        methods=["GET"],
        detail=True,
        url_path="items",
        pagination_class=CustomPagination,
    )
    def get_items(self, request, pk):
        items = (
            GoodItem.objects.filter(category_id=pk)
            .filter(visible=True)
            .filter(apply=True)
            .all()
        )
        
        page = self.paginate_queryset(items)

        if page is not None:
            serializer = GoodItemSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = GoodItemSerializer(items, many=True)
        return Response(serializer.data)

    @action(methods=["GET"], url_path='characteristics', detail=True, serializer_class=CharacteristicSerializer)
    def get_characteristics(self, request, pk):
        characteristics = Characteristics.objects.filter(category_id=pk).all()
        category = GoodCategory.objects.get(id=pk)
        if category.parent != None:
            parent_characteristics = Characteristics.objects.filter(category_id=category.parent.id).all()
            characteristics = characteristics.union(parent_characteristics)
        
        characteristics = CharacteristicSerializer(characteristics, many=True)
        return Response(characteristics.data)

class GoodItemViewSet(viewsets.ModelViewSet):
    queryset = GoodItem.objects.all()
    # serializer_class = GoodItemSerializer  # тоже самое, что и сверху + добавить еще фильтр по категориям скорее всего
    # permission_classes = (OwnerOrReadOnly,)
    filter_backends = (DjangoFilterBackend,)
    permission_classes = (permissions.AllowAny,)
    filterset_fields = ("name",)
    pagination_class = CustomPagination

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return GoodItemCreateSerializer
        if self.action == 'list':
            return GoodItemSerializer
        return GoodItemRetrieveSerializer


    @action(detail=True, methods=['POST'], url_path='apply_characteristic', serializer_class=ItemApplyCharacteristic)
    def apply_characteristic(self, request, pk):
        item = GoodItem.objects.get(id=pk)
        payload = self.serializer_class(data = request.data)

        if not payload.is_valid():
            return Response({'error': "Не обнаружено "}, status=status.HTTP_400_BAD_REQUEST)
        
        characteristic = Characteristics.objects.get(id=payload.data['characteristic'])
        item.characteristics.add(characteristic, through_defaults={'body': payload.data['body']})
        return Response({'success': "Успено"}, status=status.HTTP_200_OK)
    

    @action(detail=True, methods=['POST'], url_path='switch_wishlist', permission_classes=(permissions.IsAuthenticated,))
    def add_to_wishlist(self, request, pk):
        item = GoodItem.objects.get(id=pk)
        user = request.user

        like = Like.objects.filter(item=item).filter(user=user).first()
        if like is not None:
            like.delete()
        else:
            like = Like.objects.create(item=item, user=user)
            like.save()

        return Response('success')
    

    @action(detail=True, methods=['GET'], url_path='comments')
    def get_comments(self, request, pk):
        comments = Comment.objects.filter(item_id=pk).all()
        comments_serializer = CommentSerializer(data=comments, many=True)
        comments_serializer.is_valid()
        return Response(comments_serializer.data)


class PaymentMethodViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentMethodSerializer
    permission_classes = (OwnerOrReadOnly,)

    def get_serializer_class(self):
        if self.request.method == 'GET':
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
        if self.request.method == 'POST':
            return BasketItemCreateSerializer
        return BasketItemSerializer


    def get_queryset(self):
        basket = Basket.objects.filter(visible=True).filter(
            user__id=self.request.user.id
        )
        if len(basket) == 0:
            basket = Basket.objects.create(user_id=self.request.user.id)
        else:
            basket = basket.get()
        basket_items = BasketItem.objects.filter(basket=basket)
        return basket_items

    def create(self, request, *args, **kwargs):
        basket = Basket.objects.filter(visible=True).filter(
            user=self.request.user
        )
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
            return Response({'error': "Такой товар уже есть в корзине"}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(basket_item.data, status=status.HTTP_200_OK)



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

    @action(detail=False, url_path="me", methods=["GET", "PATCH"], permission_classes=(permissions.IsAuthenticated,))
    def active_user(self, request, *args, **kwargs):
        if self.request.method == "GET":
            serializer = self.serializer_class(request.user)
            return Response(serializer.data)
        if self.request.method == "PATCH":
            serializer = self.serializer_class(
                request.user, data=request.data, partial=True
            )
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors)


class RecipentViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        return Recipent.objects.filter(user=self.request.user).all()

    serializer_class = RecipentSerializer
    permission_classes = (OwnerOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class OrderViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.DestroyModelMixin, mixins.CreateModelMixin):
    permission_classes = (OwnerOrReadOnly, )
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return OrderToBuyerSerializer
        elif self.request.method == 'POST':
            return OrderCreateSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).all()
    
    def create(self, request, *args, **kwargs): # сделать проверку на то, что получатель / способ оплаты принадлежит пользователю
        order = OrderCreateSerializer(data=request.data)

        if not order.is_valid():
            return Response(order.errors)
        
        basket = Basket.objects.filter(visible=True).filter(
            user__id=self.request.user.id
        ).first()

        if basket is None:
            return Response({'error': 'Невозможно создать заказ с пустой корзиной!'}, status=status.HTTP_400_BAD_REQUEST)
        
        # basket_items = BasketItem.objects.filter(basket=basket).all()

        # if len(basket_items) == 0:
        
        sum_total = BasketItem.objects.filter(basket=basket).select_related("good_item").aggregate(Sum('good_item__price'))['good_item__price__sum']

        if sum_total == 0:
            return Response({'error': 'Невозможно создать заказ с пустой корзиной!'}, status=status.HTTP_400_BAD_REQUEST)

        basket.visible = False
        basket.save()
        order.save(basket=basket, payment_total=sum_total, user=self.request.user)
        return Response(order.data)


    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)
    
    # @action(detail=True, )
    

class CharacteristicViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin, mixins.DestroyModelMixin, mixins.UpdateModelMixin):
    permission_classes = (AdminOrReadOnly, )
    serializer_class = CharacteristicCreateSerializer
    queryset = Characteristics.objects.all()


class GetMyWishlistView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        user = self.request.user
        wishlist = Like.objects.filter(user=user).select_related("item").all()

        items = [like.item for like in wishlist]

        serializer = GoodItemSerializer(data=items, many=True)
        serializer.is_valid()
        return Response(serializer.data)
    

class MarketViewSet(viewsets.ModelViewSet):
    queryset = Market.objects.all()
    serializer_class = MarketSerializer
    permission_classes = (SellerOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CommentViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin, mixins.DestroyModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin):
    # serializer_class = CommentSerializer

    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return CommentSerializer
        return CommentCreateSerializer

    @action(methods=['GET'], detail=True, url_path='replies')
    def get_replies(self, request, pk):
        comment_replies = CommentReply.objects.filter(comment_id=pk).all()
        comments = CommentReplySerializer(data=comment_replies, many=True)
        comments.is_valid()
        return Response(comments.data)



    def get_queryset(self):
        return Comment.objects.filter(user=self.request.user).all()
    
    def create(self, request, *args, **kwargs):
        comment = CommentCreateSerializer(data=request.data)

        if not comment.is_valid():
            return Response(comment.errors)        

        basket_ids = BasketItem.objects.filter(basket__in=Basket.objects.filter(user=self.request.user).filter(visible=False)).values_list('good_item_id', flat=True).distinct()

        if comment.initial_data['item'] not in basket_ids:
            return Response({'detail': "You did not ordered this item yet"}, status=status.HTTP_401_UNAUTHORIZED)

        comment.save(user=self.request.user)
        return Response(comment.data)
    

class CommentReplyViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    serializer_class = CommentReplySerializer
    permission_classes = (SellerOrReadOnly,)
    
    def get_queryset(self):
        return CommentReply.objects.filter(user=self.request.user).all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)