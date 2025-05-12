from rest_framework import serializers, validators
from .models import (
    Basket,
    BasketItem,
    Characteristics,
    CharacteristicsCategory,
    CommentReply,
    Market,
    Order,
    DeliveryMethod,
    GoodCategory,
    GoodItem,
    PaymentMethod,
    Recipent,
    Transaction,
    ItemCharacteristic,
    Comment,
    Like
)
from django.contrib.auth import get_user_model
from django_enum.drf import EnumField
from django.db.models import Avg
from .functions import unwrap_categories

User = get_user_model()

class CharacteristicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Characteristics
        fields = ('title', 'id')


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


class GoodItemCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = GoodItem
        fields = ('category', 'name', 'description', 'price', 'market')
        extra_kwargs = {'price': {'required': True}}


class GoodItemInWishListSerializer(serializers.ModelSerializer):
    # category = GoodCategorySerializer()
    characteristics = serializers.SerializerMethodField(
        'get_characteristics',
        read_only=True
    )
    rate = serializers.SerializerMethodField(
        'get_rate',
        read_only=True
    )

    class Meta:
        model = GoodItem
        fields = ('category', 'name', 'description', 'price', 'discount', 'visible', 'apply', 'characteristics', 'market', 'rate', 'id')

    def get_characteristics(self, obj):
        connection = ItemCharacteristic.objects.filter(item=obj).all()
        return_list = []
        obj_characteristic_categories = unwrap_categories(obj.category)

        for category in obj_characteristic_categories:
            characteristics = category.characteristics
            print(characteristics)


        # for conn in connection:
        #     return_list.append({
        #         'title': characteristic.title,
        #         'value': conn.body
        #     })
        return 'пенис'
    
    def get_rate(self, obj):
        return Comment.objects.filter(item=obj).aggregate(Avg('rate'))['rate__avg']
    

class GoodItemSerializer(serializers.ModelSerializer):
    # category = GoodCategorySerializer()
    characteristics = serializers.SerializerMethodField(
        'get_characteristics',
        read_only=True
    )
    rate = serializers.SerializerMethodField(
        'get_rate',
        read_only=True
    )
    in_wishlist = serializers.SerializerMethodField(
        'get_in_wishlist',
        read_only=True
    )


    class Meta:
        model = GoodItem
        fields = ('category', 'name', 'description', 'price', 'discount', 'visible', 'apply', 'characteristics', 'market', 'rate', 'in_wishlist', 'id')

    def get_characteristics(self, obj):
        connection = ItemCharacteristic.objects.filter(item=obj).all()
        return_list = []
        obj_characteristic_categories = unwrap_categories(obj.category)

        for category in obj_characteristic_categories:
            characteristics = category.characteristics
            print(characteristics)


        # for conn in connection:
        #     return_list.append({
        #         'title': characteristic.title,
        #         'value': conn.body
        #     })
        return 'пенис'
    
    
    def get_rate(self, obj):
        return Comment.objects.filter(item=obj).aggregate(Avg('rate'))['rate__avg']
    
    def get_in_wishlist(self, obj):
        user = self.context['request'].user
        if user.is_anonymous or user is None:
            return False
        
        wishlist = Like.objects.filter(user=user).values_list("item_id", flat=True)
        return obj.id in wishlist
    

class GoodItemRetrieveSerializer(serializers.ModelSerializer):
    able_to_comment = serializers.SerializerMethodField(
        'get_able_to_comment',
        read_only=True
    )
    characteristics = serializers.SerializerMethodField(
        'get_characteristics',
        read_only=True
    )
    rate = serializers.SerializerMethodField(
        'get_rate',
        read_only=True
    )
    in_wishlist = serializers.SerializerMethodField(
        'get_in_wishlist',
        read_only=True
    )
    basket_count = serializers.SerializerMethodField(
        'get_basket_count',
        read_only=True
    )
    basket_id = serializers.SerializerMethodField(
        'get_basket_id',
        read_only=True
    )

    class Meta:
        model = GoodItem
        fields = ('category', 'name', 'description', 'price', 'discount', 'visible', 'apply', 'characteristics', 'market', 'rate', 'able_to_comment', 'in_wishlist', 'id', 'basket_count', 'basket_id')

    def get_characteristics(self, obj):
        # connection = ItemCharacteristic.objects.filter(item=obj).all()
        return_list = []
        obj_characteristic_categories = unwrap_categories(obj.category)
        # print(connection)
        for category in obj_characteristic_categories:
            characteristics = category.characteristics.filter(itemcharacteristic__item=obj).all()
            if len(characteristics) > 0:
                answer = []
                for c in characteristics:
                    connection = ItemCharacteristic.objects.filter(item=obj).filter(characteristic=c).first()
                    answer.append({
                        'title': c.title,
                        'value': connection.body,
                    })
                return_list.append({
                    "title": category.title,
                    "id": category.id,
                    "characteristics": answer
                })


        # for conn in connection:
        #     return_list.append({
        #         'title': characteristic.title,
        #         'value': conn.body
        #     })
        return return_list
    
    
    def get_rate(self, obj):
        return Comment.objects.filter(item=obj).aggregate(Avg('rate'))['rate__avg']
    
    def get_able_to_comment(self, obj):
        user = self.context['request'].user
        if user.is_anonymous:
            return False
        basket_ids = BasketItem.objects.filter(basket__in=Basket.objects.filter(user=user).filter(visible=False)).values_list('good_item_id', flat=True).distinct()

        return obj.id in basket_ids
    
    def get_in_wishlist(self, obj):
        user = self.context['request'].user
        if user.is_anonymous:
            return False
        
        wishlist = Like.objects.filter(user=user).values_list("item_id", flat=True)
        return obj.id in wishlist
        
    def get_basket_count(self, obj):
        user = self.context['request'].user
        if user.is_anonymous:
            return 0
        
        basket_item = BasketItem.objects.filter(basket__in=Basket.objects.filter(user=user).filter(visible=True)).filter(good_item=obj).first()
        if basket_item is None:
            return 0
        return basket_item.count
    
    def get_basket_id(self, obj):
        user = self.context['request'].user
        if user.is_anonymous:
            return None
        
        basket_item = BasketItem.objects.filter(good_item=obj).filter(basket=Basket.objects.filter(user=user).filter(visible=True).first()).first()

        if basket_item is None:
            return None
        return basket_item.id


class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = ("card_body", "card_expire_date", 'bank_name')


class PaymentMethodCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = ("card_body", "card_expire_date", 'card_cvv_code', 'bank_name')


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
        fields = ('good_item', 'count', 'basket', 'id')
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
        fields = ("recipent", "payment_method", "delivery_method")
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


class CharacteristicCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CharacteristicsCategory
        fields = '__all__'


# class CharacteristicsCategoryCreateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CharacteristicsCategory
#         fields = ()


class CharacteristicCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Characteristics
        fields = '__all__'


class ItemApplyCharacteristic(serializers.ModelSerializer):
    class Meta:
        model = ItemCharacteristic
        fields = ('characteristic', 'body')


class ListApply(serializers.Serializer):
    characteristics = ItemApplyCharacteristic(many=True)

class MarketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Market
        fields = '__all__'
        read_only_fields = ('user',)


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('user',)


class CommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('item', 'body', 'rate')


class CommentReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentReply
        fields = '__all__'
        read_only_fields = ('user',)


class CharacteristicsCategoryResponseSerializer(serializers.ModelSerializer):
    characteristics = CharacteristicSerializer(many=True)
    
    class Meta:
        model = CharacteristicsCategory
        fields = ('characteristics', 'title', 'id')
