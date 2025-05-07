from rest_framework import serializers, validators
from .models import (
    Basket,
    BasketItem,
    Characteristics,
    Market,
    Order,
    DeliveryMethod,
    GoodCategory,
    GoodItem,
    PaymentMethod,
    Recipent,
    Transaction,
    ItemCharacteristic
)
from django.contrib.auth import get_user_model
from django_enum.drf import EnumField

User = get_user_model()

class CharacteristicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Characteristics
        fields = ('title',)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("email", "user_type", "first_name", "last_name", "sex", "id")


class GoodCategorySerializer(serializers.ModelSerializer):
    parent = "self"
    # characteristics = CharacteristicSerializer(many=True, read_only=True)

    class Meta:
        model = GoodCategory
        fields = "__all__"
        # read_only_fields = ('parent', )


class GoodItemSerializer(serializers.ModelSerializer):
    # category = GoodCategorySerializer()
    characteristics = serializers.SerializerMethodField(
        'get_characteristics',
        read_only=True
    )

    class Meta:
        model = GoodItem
        fields = ('category', 'name', 'description', 'price', 'discount', 'visible', 'apply', 'characteristics', 'market')

    def get_characteristics(self, obj):
        connection = ItemCharacteristic.objects.filter(item=obj).all()
        return_list = []

        for conn in connection:
            characteristic = Characteristics.objects.get(id=conn.characteristic.id)
            return_list.append({
                'title': characteristic.title,
                'value': conn.body
            })
        return return_list


class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = ("card_body", "card_expire_date")


class PaymentMethodCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = ("card_body", "card_expire_date", 'card_cvv_code')


class DeliveryMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryMethod
        fields = "__all__"


class RecipentSerializer(serializers.ModelSerializer):
    # user = UserSerializer()

    class Meta:
        model = Recipent
        fields = "__all__"
        read_only_fields = ('user',)

class BasketItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BasketItem
        fields = ('good_item', 'count', 'basket')
        read_only_fields = ("basket",)
        

class BasketItemCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BasketItem
        fields = '__all__'
        read_only_fields = ("basket",)


class BasketSerializer(serializers.ModelSerializer):
    summary = serializers.SerializerMethodField()
    items = BasketItemSerializer(many=True)

    class Meta:
        model = Basket
        exclude = ("visible",)
        read_only_fields = ("items",)

    def create(self, validated_data):
        basket = Basket.objects.create(**validated_data)
        basket.user = User.objects.first(id=1)
        basket.save()
        return basket

    def get_summary(self, obj):
        return None


class OrderCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ('user', "payment_total")
        extra_kwargs = {'payment_method': {'required': True}, 'delivery_method': {'required': True}}

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = "__all__"


class OrderToBuyerSerializer(serializers.ModelSerializer):
    basket = BasketSerializer()
    payment_method = PaymentMethodSerializer()
    delivery_method = DeliveryMethodSerializer()
    transaction = TransactionSerializer()

    class Meta:
        model = Order
        fields = ('transaction', 'basket', 'payment_method', 'delivery_method', 'recipent', 'status')
        read_only_fields = ('basket', 'payment_method', 'delivery_method')


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'sex', 'first_name', 'last_name')
        required = ('emai', 'first_name')


class UserLoginOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField()


class CharacteristicCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Characteristics
        fields = '__all__'


class ItemApplyCharacteristic(serializers.ModelSerializer):
    class Meta:
        model = ItemCharacteristic
        fields = ('characteristic', 'body')


class MarketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Market
        fields = '__all__'
        read_only_fields = ('user',)