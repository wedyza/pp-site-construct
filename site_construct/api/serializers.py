from rest_framework import serializers
from .models import (
    Basket,
    BasketItem,
    Checkout,
    DeliveryMethod,
    GoodCategory,
    GoodItem,
    PaymentMethod,
    Recipent,
    Transaction,
)
from django.contrib.auth import get_user_model

User = get_user_model()


class GoodCategorySerializer(serializers.ModelSerializer):
    parent = "self"

    class Meta:
        model = GoodCategory
        fields = "__all__"
        # read_only_fields = ('parent', )


class GoodItemSerializer(serializers.ModelSerializer):
    category = GoodCategorySerializer

    class Meta:
        model = GoodItem
        fields = "__all__"


class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = "__all__"


class DeliveryMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryMethod
        fields = "__all__"


class RecipentSerializer(serializers.ModelSerializer):
    # user = UserSerializer()

    class Meta:
        model = Recipent
        fields = "__all__"


class BasketItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BasketItem
        fields = "__all__"
        read_only_fields = ("basket",)

class BasketSerializer(serializers.ModelSerializer):
    summary = serializers.SerializerMethodField()
    items = BasketItemSerializer(many=True)

    class Meta:
        model = Basket
        exclude = ("visible",)
        read_only_fields = "user"

    def create(self, validated_data):
        basket = Basket.objects.create(**validated_data)
        basket.user = User.objects.first(id=1)
        basket.save()
        return basket

    def get_summary(self, obj):
        print(dir(obj))
        return None



class CheckoutSerializer(serializers.ModelSerializer):
    basket = BasketSerializer()

    class Meta:
        model = Checkout
        fields = "__all__"


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = "__all__"
