from rest_framework import serializers
from .models import (
    Basket,
    BasketItem,
    Characteristics,
    CharacteristicsCategory,
    CommentMedia,
    CommentReply,
    Document,
    ItemMedia,
    Order,
    DeliveryMethod,
    GoodCategory,
    GoodItem,
    PaymentMethod,
    Refund,
    Transaction,
    ItemCharacteristic,
    Comment,
    Like,
)
from django.contrib.auth import get_user_model
from django.db.models import Avg, Count
from .functions import unwrap_categories

User = get_user_model()


BASE_NOTIFICATION_URL = "http://localhost/api/v1/notifications"
# ЕСЛИ ТЫ В БУДУЩЕМ СМОТРИШЬ ЭТОТ КОД. НЕ ИСПОЛЬЗУЙ CREATE SERIALIZERS, ЛУЧШЕ ПРОСТО УКАЗЫВАЙ __all__ fields ДЛЯ ВОЗВРАТА, А НА ПОЛЯ, КОТОРЫЕ НЕ НАДО УКАЗЫВАТЬ НАВЕШИВАЙ READ_ONLY, ЭТО ПОМОЖЕТ ИСБЕЖАТЬ ПРОБЛЕМ


class CharacteristicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Characteristics
        fields = ("title", "id")


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "email",
            "user_type",
            "first_name",
            "last_name",
            "sex",
            "id",
            "avatar",
            "is_active",
        )


class GoodCategorySerializer(serializers.ModelSerializer):
    parent = "self"
    # characteristics = CharacteristicSerializer(many=True, read_only=True)

    class Meta:
        model = GoodCategory
        fields = "__all__"
        # read_only_fields = ('parent', )


class ItemMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemMedia
        fields = ("source", "id")


class GoodItemCreateSerializer(serializers.ModelSerializer):
    media = ItemMediaSerializer(many=True, required=False)

    class Meta:
        model = GoodItem
        fields = (
            "category",
            "name",
            "description",
            "price",
            "media",
            "visible",
            "warehouse_count",
            "id",
        )
        extra_kwargs = {"price": {"required": True}}
        read_only_fields = ("id",)

    def update(self, instance, validated_data):
        if "media" in self.initial_data:
            medias = self.initial_data.pop("media")
            for media in medias:
                new_media = ItemMedia.objects.create(item=instance)
                new_media.source.save(media.name, media)
        return super().update(instance, validated_data)

    def create(self, validated_data):
        item = GoodItem.objects.create(**validated_data)
        if "media" not in self.initial_data:
            return item
        item.save()
        medias = self.initial_data.pop("media")
        for media in medias:
            new_media = ItemMedia.objects.create(item=item)
            new_media.source.save(media.name, media)
        return item


class GoodItemInWishListSerializer(serializers.ModelSerializer):
    # category = GoodCategorySerializer()
    characteristics = serializers.SerializerMethodField(
        "get_characteristics", read_only=True
    )
    rate = serializers.SerializerMethodField("get_rate", read_only=True)
    media = ItemMediaSerializer(many=True)

    class Meta:
        model = GoodItem
        fields = (
            "category",
            "name",
            "description",
            "price",
            "discount",
            "visible",
            "apply",
            "characteristics",
            "user",
            "rate",
            "id",
            "media",
        )

    def get_characteristics(self, obj):
        return_list = []
        if obj.category == None:
            return return_list
        obj_characteristic_categories = unwrap_categories(obj.category)
        for category in obj_characteristic_categories:
            characteristics = category.characteristics.filter(
                itemcharacteristic__item=obj
            ).all()
            if len(characteristics) > 0:
                answer = []
                for c in characteristics:
                    connection = (
                        ItemCharacteristic.objects.filter(item=obj)
                        .filter(characteristic=c)
                        .first()
                    )
                    answer.append(
                        {
                            "title": c.title,
                            "value": connection.body,
                        }
                    )
                return_list.append(
                    {
                        "title": category.title,
                        "id": category.id,
                        "characteristics": answer,
                    }
                )
        return return_list

    def get_rate(self, obj):
        return Comment.objects.filter(item=obj).aggregate(Avg("rate"), Count("rate"))


class SimplifiedGoodItemSerializer(serializers.ModelSerializer):
    media = ItemMediaSerializer(many=True)

    class Meta:
        model = GoodItem
        fields = (
            "media",
            "id",
            "name",
            "description",
            "price",
            "discount",
            "category",
            "warehouse_count",
        )
        # exclude = ('visible', 'apply', 'characteristics')


class GoodItemSerializer(serializers.ModelSerializer):
    # category = GoodCategorySerializer()
    characteristics = serializers.SerializerMethodField(
        "get_characteristics", read_only=True
    )
    rate = serializers.SerializerMethodField("get_rate", read_only=True)
    in_wishlist = serializers.SerializerMethodField("get_in_wishlist", read_only=True)
    media = ItemMediaSerializer(many=True)

    class Meta:
        model = GoodItem
        fields = (
            "category",
            "name",
            "description",
            "price",
            "discount",
            "visible",
            "apply",
            "characteristics",
            "user",
            "rate",
            "in_wishlist",
            "id",
            "media",
            "warehouse_count",
        )

    def get_characteristics(self, obj):
        return_list = []
        if obj.category == None:
            return return_list
        obj_characteristic_categories = unwrap_categories(obj.category)
        for category in obj_characteristic_categories:
            characteristics = category.characteristics.filter(
                itemcharacteristic__item=obj
            ).all()
            if len(characteristics) > 0:
                answer = []
                for c in characteristics:
                    connection = (
                        ItemCharacteristic.objects.filter(item=obj)
                        .filter(characteristic=c)
                        .first()
                    )
                    answer.append(
                        {
                            "title": c.title,
                            "value": connection.body,
                        }
                    )
                return_list.append(
                    {
                        "title": category.title,
                        "id": category.id,
                        "characteristics": answer,
                    }
                )
        return return_list

    def get_rate(self, obj):
        return Comment.objects.filter(item=obj).aggregate(Avg("rate"), Count("rate"))

    def get_in_wishlist(self, obj):
        user = self.context["request"].user
        if user.is_anonymous or user is None:
            return False

        wishlist = Like.objects.filter(user=user).values_list("item_id", flat=True)
        return obj.id in wishlist


class GoodItemRetrieveSerializer(serializers.ModelSerializer):
    able_to_comment = serializers.SerializerMethodField(
        "get_able_to_comment", read_only=True
    )
    characteristics = serializers.SerializerMethodField(
        "get_characteristics", read_only=True
    )
    rate = serializers.SerializerMethodField("get_rate", read_only=True)
    in_wishlist = serializers.SerializerMethodField("get_in_wishlist", read_only=True)
    basket_count = serializers.SerializerMethodField("get_basket_count", read_only=True)
    basket_id = serializers.SerializerMethodField("get_basket_id", read_only=True)
    media = ItemMediaSerializer(many=True)

    class Meta:
        model = GoodItem
        fields = (
            "category",
            "name",
            "description",
            "price",
            "discount",
            "visible",
            "apply",
            "characteristics",
            "user",
            "rate",
            "able_to_comment",
            "in_wishlist",
            "id",
            "basket_count",
            "basket_id",
            "media",
            "warehouse_count",
        )

    def get_characteristics(self, obj):
        return_list = []
        if obj.category == None:
            return return_list
        obj_characteristic_categories = unwrap_categories(obj.category)
        for category in obj_characteristic_categories:
            characteristics = category.characteristics.filter(
                itemcharacteristic__item=obj
            ).all()
            if len(characteristics) > 0:
                answer = []
                for c in characteristics:
                    connection = (
                        ItemCharacteristic.objects.filter(item=obj)
                        .filter(characteristic=c)
                        .first()
                    )
                    answer.append(
                        {
                            "title": c.title,
                            "value": connection.body,
                        }
                    )
                return_list.append(
                    {
                        "title": category.title,
                        "id": category.id,
                        "characteristics": answer,
                    }
                )
        return return_list

    def get_rate(self, obj):
        return Comment.objects.filter(item=obj).aggregate(Avg("rate"), Count("rate"))

    def get_able_to_comment(self, obj):
        user = self.context["request"].user
        if user.is_anonymous:
            return False
        basket_ids = (
            BasketItem.objects.filter(
                basket__in=Basket.objects.filter(user=user).filter(visible=False)
            )
            .values_list("good_item_id", flat=True)
            .distinct()
        )
        comment = Comment.objects.filter(item=obj).filter(user=user).first()
        return obj.id in basket_ids and comment is None

    def get_in_wishlist(self, obj):
        user = self.context["request"].user
        if user.is_anonymous:
            return False

        wishlist = Like.objects.filter(user=user).values_list("item_id", flat=True)
        return obj.id in wishlist

    def get_basket_count(self, obj):
        user = self.context["request"].user
        if user.is_anonymous:
            return 0

        basket_item = (
            BasketItem.objects.filter(
                basket__in=Basket.objects.filter(user=user).filter(visible=True)
            )
            .filter(good_item=obj)
            .first()
        )
        if basket_item is None:
            return 0
        return basket_item.count

    def get_basket_id(self, obj):
        user = self.context["request"].user
        if user.is_anonymous:
            return None

        basket_item = (
            BasketItem.objects.filter(good_item=obj)
            .filter(
                basket=Basket.objects.filter(user=user).filter(visible=True).first()
            )
            .first()
        )

        if basket_item is None:
            return None
        return basket_item.id


class PaymentMethodSerializer(serializers.ModelSerializer):
    pay_system = serializers.SerializerMethodField("get_pay_system", read_only=True)

    class Meta:
        model = PaymentMethod
        fields = ("id", "card_body", "card_expire_date", "pay_system")

    def get_pay_system(self, obj):
        if obj.card_body.startswith("22"):
            return "МИР"
        elif obj.card_body.startswith("5"):
            return "Mastercard"
        elif obj.card_body.startswith("4"):
            return "Visa"
        elif obj.card_body.startswith("6"):
            return "UnionPay"
        return "Unknown"


class PaymentMethodCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = ("card_body", "card_expire_date", "card_cvv_code")


class DeliveryMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryMethod
        fields = "__all__"


class BasketItemSerializer(serializers.ModelSerializer):
    chosen_for_order = serializers.SerializerMethodField("get_chosen_for_order")
    # good_item = GoodItemSerializer()

    class Meta:
        model = BasketItem
        fields = ("good_item", "count", "id", "chosen_for_order")
        read_only_fields = ("basket", "chosen_for_order")

    def get_chosen_for_order(self, obj):
        user = self.context["request"].user
        if user.is_anonymous or user is None:
            return False

        basket = Basket.objects.filter(visible=True).filter(user=user).first()
        return obj.basket != basket


class SimplifiedBasketItemSerializer(serializers.ModelSerializer):
    good_item = SimplifiedGoodItemSerializer()

    class Meta:
        model = BasketItem
        fields = ("good_item", "count")
        read_only_fields = ("basket",)


class BasketItemCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BasketItem
        fields = "__all__"
        read_only_fields = ("basket",)


class BasketSerializer(serializers.ModelSerializer):
    summary = serializers.SerializerMethodField()
    # items = BasketItemSerializer(many=True)

    class Meta:
        model = Basket
        exclude = ("visible", "currently_for_order")
        # read_only_fields = ("items",)


class OrderStatusChangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ("status",)


class OrderCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ("address", "payment_method", "delivery_method")
        read_only_fields = ("user", "payment_total")
        extra_kwargs = {
            "payment_method": {"required": True},
            "delivery_method": {"required": True},
        }


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = "__all__"


class OrderToBuyerSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField("get_items")
    payment_method = PaymentMethodSerializer()
    delivery_method = DeliveryMethodSerializer()
    # transaction = TransactionSerializer()

    class Meta:
        model = Order
        fields = (
            "items",
            "payment_method",
            "delivery_method",
            "address",
            "status",
            "payment_total",
            "id",
            "created_at",
        )
        read_only_fields = ("items", "payment_method", "delivery_method")

    def get_items(self, obj):
        basket = obj.basket
        basket_items = BasketItem.objects.filter(basket=basket).all()
        basket_items = SimplifiedBasketItemSerializer(data=basket_items, many=True)
        basket_items.is_valid()
        return basket_items.data


class UserNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("first_name", "last_name")


class OrderToSellerSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField("get_items")
    payment_method = PaymentMethodSerializer()
    delivery_method = DeliveryMethodSerializer()
    # transaction = TransactionSerializer()
    user = UserNameSerializer()

    class Meta:
        model = Order
        fields = (
            "items",
            "payment_method",
            "delivery_method",
            "address",
            "status",
            "payment_total",
            "id",
            "user",
            "created_at",
        )
        read_only_fields = ("items", "payment_method", "delivery_method", "user")

    def get_items(self, obj):
        basket = obj.basket
        request = self.context["request"]
        basket_items = (
            BasketItem.objects.filter(basket=basket)
            .filter(good_item__user=request.user)
            .all()
        )
        basket_items = SimplifiedBasketItemSerializer(data=basket_items, many=True)
        basket_items.is_valid()
        return basket_items.data


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("email", "sex", "first_name", "last_name")
        required = ("emai", "first_name")


class UserLoginOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField()


class CharacteristicCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CharacteristicsCategory
        fields = "__all__"


# class CharacteristicsCategoryCreateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CharacteristicsCategory
#         fields = ()


class CharacteristicCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Characteristics
        fields = "__all__"


class ItemApplyCharacteristic(serializers.ModelSerializer):
    class Meta:
        model = ItemCharacteristic
        fields = ("characteristic", "body")


class ListApply(serializers.Serializer):
    characteristics = ItemApplyCharacteristic(many=True)


class CommentMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentMedia
        fields = "__all__"


class CommentSerializer(serializers.ModelSerializer):
    media = CommentMediaSerializer(many=True)
    reply = serializers.SerializerMethodField("get_reply")

    class Meta:
        model = Comment
        fields = ("user", "item", "body", "rate", "media", "id", "reply", "created_at")
        read_only_fields = ("user", "reply", "media")

    def get_reply(self, obj):
        reply = CommentReply.objects.filter(comment=obj).first()
        serializer = CommentReplySerializer(instance=reply)
        return serializer.data


class CommentCreateSerializer(serializers.ModelSerializer):
    media = CommentMediaSerializer(many=True, required=False)

    class Meta:
        model = Comment
        fields = ("item", "body", "rate", "media")

    def update(self, instance, validated_data):
        if "media" in self.initial_data:
            medias = self.initial_data.pop("media")
            for media in medias:
                new_media = CommentMedia.objects.create(comment=instance)
                new_media.source.save(media.name, media)
        return super().update(instance, validated_data)

    def create(self, validated_data):
        comment = Comment.objects.create(**validated_data)
        if "media" not in self.initial_data:
            return comment
        comment.save()
        medias = self.initial_data.pop("media")
        for media in medias:
            new_media = CommentMedia.objects.create(comment=comment)
            new_media.source.save(media.name, media)
        return comment


class CommentReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentReply
        fields = "__all__"
        read_only_fields = ("user",)


class CommentToSellerSerialzier(serializers.ModelSerializer):
    reply = serializers.SerializerMethodField("get_reply")
    media = CommentMediaSerializer(many=True)

    class Meta:
        model = Comment
        fields = ("user", "item", "body", "rate", "reply", "id", "media", "created_at")

    def get_reply(self, obj):
        reply = CommentReply.objects.filter(comment=obj).first()
        serializer = CommentReplySerializer(instance=reply)
        return serializer.data


class CharacteristicsCategoryResponseSerializer(serializers.ModelSerializer):
    characteristics = CharacteristicSerializer(many=True)

    class Meta:
        model = CharacteristicsCategory
        fields = ("characteristics", "title", "id")


class SwitchSerializer(serializers.Serializer):
    enable = serializers.BooleanField()


class RefundCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Refund
        fields = ("item", "order", "body")


class RefundResponseSerializer(serializers.ModelSerializer):
    item = SimplifiedGoodItemSerializer()
    order = OrderToBuyerSerializer()

    class Meta:
        model = Refund
        fields = "__all__"


class GoodItemWithSellsCountSerializer(serializers.ModelSerializer):
    sell_count = serializers.IntegerField()
    status = serializers.SerializerMethodField("get_status")

    class Meta:
        model = GoodItem
        fields = (
            "media",
            "id",
            "name",
            "description",
            "price",
            "discount",
            "category",
            "warehouse_count",
            "sell_count",
            "status",
        )

    def get_status(self, obj):
        status = "В наличии"
        if obj.sell_count <= 50:
            status = "Мало"
        elif obj.sell_cunt <= 10:
            status = "Очень мало"
        else:
            status = "Нет в наличии"
        return status


# class CountSerializer(serializers.Serializer):
#     total=serializers.IntegerField()
#     newest=serializers.IntegerField()

# class RateSerializer(serializers.Serializer):
#         rate=serializers.FloatField()
#         count=serializers.IntegerField()

# class AnalyticsSerializer(serializers.Serializer):
#     total_payed = serializers.IntegerField()
#     total_freezed = serializers.IntegerField()
#     orders_per_this_month = CountSerializer()
#     refunds_per_this_month = CountSerializer()
#     average_rating = RateSerializer()


class AnalyticsSimplifiedBasketItemSerializer(serializers.ModelSerializer):
    good_item = serializers.StringRelatedField()

    class Meta:
        model = BasketItem
        fields = ("good_item", "count")


class OrderToSellerAnalyticsSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField("get_items")

    class Meta:
        model = Order
        fields = ("items", "id", "created_at")
        read_only_fields = ("items",)

    def get_items(self, obj):
        basket = obj.basket
        request = self.context["request"]
        basket_items = (
            BasketItem.objects.filter(basket=basket)
            .filter(good_item__user=request.user)
            .all()
        )
        basket_items = AnalyticsSimplifiedBasketItemSerializer(
            data=basket_items, many=True
        )
        basket_items.is_valid()
        return basket_items.data


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ("source", "id", "created_at", "type")
        # read_only_fields = ("id", "created_at")
