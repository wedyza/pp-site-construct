from django.shortcuts import render
from rest_framework import viewsets, mixins, permissions
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
)
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from .permissions import AdminOrReadOnly

User = get_user_model()


class GoodCategoryViewSet(viewsets.ModelViewSet):
    queryset = GoodCategory.objects.all()
    serializer_class = GoodCategorySerializer  # необходимо перегрузить лист категорий пагинацией ( вроде есть в фильтрах насколько я помню )
    permission_classes = (AdminOrReadOnly, )


class GoodItemViewSet(viewsets.ModelViewSet):
    queryset = GoodItem.objects.all()
    serializer_class = GoodItemSerializer  # тоже самое, что и сверху + добавить еще фильтр по категориям скорее всего
    permission_classes = (AdminOrReadOnly, )


class PaymentMethodViewSet(viewsets.ModelViewSet):
    queryset = PaymentMethod.objects.all()
    serializer_class = PaymentMethodSerializer
    permission_classes = (AdminOrReadOnly, )


class DeliveryMethodViewSet(viewsets.ModelViewSet):
    queryset = DeliveryMethod.objects.all()
    serializer_class = DeliveryMethodSerializer
    permission_classes = (AdminOrReadOnly, )


class RecipentViewSet(viewsets.ModelViewSet):
    queryset = Recipent.objects.all()
    serializer_class = RecipentSerializer
    permission_classes = (AdminOrReadOnly, )


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
        basket = Basket.objects.filter(visible=True).filter(user__id=self.request.user.id)
        if len(basket) == 0:
            basket = Basket.objects.create(user_id=self.request.user.id)
        else:
            basket = basket.get()
        basket_items = BasketItem.objects.filter(basket=basket)
        return basket_items

    def perform_create(
        self, serializer
    ):  # Нерабочий роут, дома посмотреть и разобраться, почему так
        basket = Basket.objects.filter(visible=True).filter(user__id=self.request.user.id)
        if len(basket) == 0:
            basket = Basket.objects.create(user_id=self.request.user.id)
        else:
            basket = basket.get()
        serializer.save(basket_id=basket.id)
        # return super().perform_create(serializer)
