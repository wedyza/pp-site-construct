from django.shortcuts import render
from rest_framework import viewsets, mixins, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from .models import (
    Basket,
    BasketItem,
    DeliveryMethod,
    GoodCategory,
    GoodItem,
    PaymentMethod,
    Recipent,
)
from .serializers import (
    BasketItemSerializer,
    DeliveryMethodSerializer,
    GoodCategorySerializer,
    GoodItemSerializer,
    PaymentMethodSerializer,
    RecipentSerializer,
    UserSerializer,
)
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from .permissions import AdminOrReadOnly, OwnerOrReadOnly, AdminOrModerator
from .paginators import CustomPagination
from django_filters.rest_framework import DjangoFilterBackend

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


class GoodItemViewSet(viewsets.ModelViewSet):
    queryset = GoodItem.objects.all()
    serializer_class = GoodItemSerializer  # тоже самое, что и сверху + добавить еще фильтр по категориям скорее всего
    permission_classes = (OwnerOrReadOnly,)
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ("name",)


class PaymentMethodViewSet(viewsets.ModelViewSet):
    queryset = PaymentMethod.objects.all()
    serializer_class = PaymentMethodSerializer
    permission_classes = (AdminOrReadOnly,)


class DeliveryMethodViewSet(viewsets.ModelViewSet):
    queryset = DeliveryMethod.objects.all()
    serializer_class = DeliveryMethodSerializer
    permission_classes = (AdminOrReadOnly,)


class RecipentViewSet(viewsets.ModelViewSet):
    queryset = Recipent.objects.all()
    serializer_class = RecipentSerializer
    permission_classes = (AdminOrReadOnly,)


class BasketItemViewSet(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.UpdateModelMixin,
):
    serializer_class = BasketItemSerializer
    permission_classes = (permissions.IsAuthenticated,)

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

    def perform_create(
        self, serializer
    ):  # Нерабочий роут, дома посмотреть и разобраться, почему так
        basket = Basket.objects.filter(visible=True).filter(
            user__id=self.request.user.id
        )
        if len(basket) == 0:
            basket = Basket.objects.create(user_id=self.request.user.id)
        else:
            basket = basket.get()
        serializer.save(basket_id=basket.id)
        # return super().perform_create(serializer)


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

    @action(detail=False, url_path="me", methods=["GET", "PATCH"])
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
