from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from enum import Enum
from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator

User = get_user_model()


class GoodCategory(models.Model):
    title = models.CharField("Название", max_length=100)
    description = models.TextField("Описание", max_length=500)
    parent = models.ForeignKey(
        "self",
        null=True,
        default=None,
        verbose_name="Родительская категория",
        on_delete=models.SET_NULL,
        related_name="daughter",
    )

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"


class CharacteristicsCategory(models.Model):
    category = models.ForeignKey(
        GoodCategory,
        verbose_name="Категория",
        on_delete=models.CASCADE,
        related_name="characteristics_categories",
    )
    title = models.CharField("Название категории", max_length=50)

class Characteristics(models.Model):
    category = models.ForeignKey(
        CharacteristicsCategory,
        verbose_name="Категория характеристик",
        on_delete=models.CASCADE,
        related_name="characteristics",
    )
    title = models.CharField("Название свойства", max_length=50)


class GoodItem(models.Model):
    name = models.CharField("Название", max_length=100)
    description = models.TextField("Описание", max_length=500)
    price = models.FloatField("Цена", default=0)
    category = models.ForeignKey(GoodCategory, on_delete=models.SET_NULL, null=True)
    discount = models.FloatField("Скидка", default=0)
    visible = models.BooleanField("Видимость", default=False)
    apply = models.BooleanField("Одобрено", default=False)
    characteristics = models.ManyToManyField(
        Characteristics,
        verbose_name="Характеристики",
        through="ItemCharacteristic",
        related_name="characteristics",
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Продавец")
    warehouse_count = models.IntegerField("Количество на складе", default=0)

    def __str__(self): #pragma: no cover
        return self.name

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"


class ItemCharacteristic(models.Model):
    item = models.ForeignKey(GoodItem, on_delete=models.CASCADE)
    characteristic = models.ForeignKey(Characteristics, on_delete=models.CASCADE)
    body = models.TextField("Содержимое свойства", max_length=500)

    class Meta:
        unique_together = ("item", "characteristic")


class PaymentMethod(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=False,
        verbose_name="Пользователь",
        related_name="cards",
    )
    card_body = models.CharField("Номер карты", max_length=16, null=False)
    card_expire_date = models.DateField("Дата окончания действия карты", null=False)
    card_cvv_code = models.IntegerField("CVC код", null=False)
    # bank_name = models.CharField("Название банка", max_length=50, null=True)

    class Meta:
        verbose_name = "Способ оплаты"
        verbose_name_plural = "Способы оплаты"


class DeliveryMethod(models.Model):
    title = models.CharField("Название", max_length=100)
    description = models.TextField("Описание", max_length=500)

    class Meta:
        verbose_name = "Способ доставки"
        verbose_name_plural = "Способы доставки"


class Basket(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, verbose_name="Пользователь"
    )
    currently_for_order = models.BooleanField("Используется для заказов", default=False)
    visible = models.BooleanField("Видимая", default=True)

    class Meta:
        verbose_name = "Корзина"
        verbose_name_plural = "Корзины"


class BasketItem(models.Model):
    good_item = models.ForeignKey(
        GoodItem, on_delete=models.CASCADE, verbose_name="Товар"
    )
    basket = models.ForeignKey(Basket, on_delete=models.CASCADE, verbose_name="Корзина")
    count = models.IntegerField("Количество", default=1)

    class Meta:
        unique_together = ("good_item", "basket")
        verbose_name = "Товар в корзине"
        verbose_name_plural = "Товары в корзине"


class Order(models.Model):
    class OrderStatusChoices(Enum):
        PAYED = "Оплачен"
        PROCESSING = "В обработке"
        ON_THE_WAY = "В пути"
        DELIVERED = "Доставлен"
        RECEIVED = "Получен"
        REFUND = "Возврат"
        DECLINED = "Отклонен"

    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, verbose_name="Пользователь"
    )
    address = models.CharField("Адрес", null=False, max_length=100)
    basket = models.ForeignKey(
        Basket, null=True, on_delete=models.SET_NULL, verbose_name="Корзина"
    )
    payment_method = models.ForeignKey(
        PaymentMethod,
        null=True,
        on_delete=models.SET_NULL,
        verbose_name="Способ оплаты",
    )
    delivery_method = models.ForeignKey(
        DeliveryMethod,
        null=True,
        on_delete=models.SET_NULL,
        verbose_name="Способ доставки",
    )
    payment_total = models.FloatField(("Сумма"))
    status = models.TextField(
        "Статус",
        choices=[(status.name, status.value) for status in OrderStatusChoices],
        default="PROCESSING",
    )
    created_at = models.DateTimeField("Дата создания", auto_now_add=True)

    class Meta:
        verbose_name = "Счет"
        verbose_name_plural = "Счета"


class Transaction(models.Model):
    class StatusChoices(Enum):
        PENDING = "PENDING"
        SUCCESS = "SUCCESS"
        ERROR = "ERROR"

    status = models.TextField(
        "Статус",
        choices=[(status.name, status.value) for status in StatusChoices],
        default=StatusChoices.PENDING,
    )
    amount = models.FloatField("Сумма платежа")
    order = models.OneToOneField(
        Order,
        verbose_name=("Ответ от платежной системы"),
        on_delete=models.CASCADE,
        related_name="transaction",
    )
    created_at = models.DateTimeField("Дата создания", auto_now_add=True)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="transactions",
        verbose_name="Транзакция",
    )
    checkout_id = models.CharField("Айди чекаута YoMoney", max_length=40)

    class Meta:
        verbose_name = "Транзакция"
        verbose_name_plural = "Транзакции"


class Comment(models.Model):
    user = models.ForeignKey(
        User, null=False, on_delete=models.CASCADE, verbose_name="Пользователь"
    )
    item = models.ForeignKey(
        GoodItem, null=False, on_delete=models.CASCADE, verbose_name="Товар"
    )
    # order = models.ForeignKey(
    #     Order, null=False, on_delete=models.CASCADE, verbose_name="Заказ"
    # )
    body = models.TextField("Тело", max_length=500)
    rate = models.IntegerField(
        "Рейтинг", default=0, validators=[MinValueValidator(0), MaxValueValidator(10)]
    )
    created_at = models.DateTimeField("Дата создания", auto_now_add=True)


class CommentReply(models.Model):
    user = models.ForeignKey(
        User, null=False, on_delete=models.CASCADE, verbose_name="Пользователь"
    )
    comment = models.ForeignKey(
        Comment, null=False, on_delete=models.CASCADE, verbose_name="Комментарий"
    )
    body = models.TextField("тело", max_length=500)
    created_at = models.DateTimeField("Дата создания", auto_now_add=True)


class ItemMedia(models.Model):
    item = models.ForeignKey(
        GoodItem,
        null=False,
        on_delete=models.CASCADE,
        verbose_name="Товар",
        related_name="media",
    )
    source = models.ImageField("Картинка", upload_to="media")

class Like(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, verbose_name="Пользователь"
    )
    item = models.ForeignKey(
        GoodItem, null=False, on_delete=models.CASCADE, verbose_name="Товар"
    )
    created_at = models.DateTimeField(auto_now_add=True)


class Refund(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, verbose_name="Пользователь"
    )
    item = models.ForeignKey(
        GoodItem, null=False, on_delete=models.CASCADE, verbose_name="Товар"
    )
    order = models.ForeignKey(
        Order, null=False, on_delete=models.CASCADE, verbose_name="Заказ"
    )
    created_at = models.DateTimeField("создан", auto_now_add=True)
    body = models.TextField("Тело", max_length=250)
    applied = models.BooleanField("Одобрен", default=False)


class CommentMedia(models.Model):
    comment = models.ForeignKey(
        Comment, on_delete=models.CASCADE, verbose_name="отзыв", related_name="media"
    )
    source = models.ImageField("Картинка", upload_to="comments")


class MoneyPayout(models.Model):
    class States(Enum):
        REFUND = "Возврат"
        PAYOUT = "Выплата"
        FREEZED = "Заморожен"

    user_to = models.ForeignKey(
        User, on_delete=models.CASCADE, verbose_name="Кому", related_name="receiver"
    )
    user_from = models.ForeignKey(
        User, on_delete=models.CASCADE, verbose_name="От кого", related_name="sender"
    )
    amount = models.FloatField("Сумма", null=False)
    state = models.TextField(
        "Статус",
        choices=[(status.name, status.value) for status in States],
        default="FREEZED",
    )
    good_item = models.ForeignKey(
        GoodItem, on_delete=models.CASCADE, verbose_name="Товар"
    )
    order = models.ForeignKey(Order, on_delete=models.Case, verbose_name="Заказ")
    created_at = models.DateTimeField("Создано", auto_now_add=True)


class Document(models.Model):
    class Type(Enum):
        REFUND_POLICY = "Политика возвратов"
        OTHER = "Другие"
        OFFER = "Оферта"
        PLATFORM_RULES = 'Правила платформы'
        USER_REGLAMENT = 'Пользовательское соглашение'
        PLATFORM_POLICY = 'Политика платформы'

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, verbose_name="Пользователь"
    )
    source = models.FileField("Документ", upload_to="documents")
    created_at = models.DateTimeField("Создано", auto_now_add=True)
    type = models.TextField(
        "Тип",
        choices=[(status.name, status.value) for status in Type],
        default="OTHER",
    )
