from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from enum import Enum

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
    )

    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"


class GoodItem(models.Model):
    name = models.CharField("Название", max_length=100)
    description = models.TextField("Описание", max_length=500)
    price = models.FloatField("Цена", default=0)
    category = models.ForeignKey(GoodCategory, on_delete=models.SET_NULL, null=True)

    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"


class BaseMethod(models.Model):
    title = models.CharField("Название", max_length=100)
    description = models.TextField("Описание", max_length=500)

    def __str__(self) -> str:
        return self.title

    class Meta:
        abstract = True


class PaymentMethod(BaseMethod):  # Надо добавить картинки + интеграция с MinIO
    class Meta:
        verbose_name = "Способ оплаты"
        verbose_name_plural = "Способы оплаты"


class DeliveryMethod(BaseMethod):
    class Meta:
        verbose_name = "Способ доставки"
        verbose_name_plural = "Способы доставки"


class Recipent(models.Model):
    first_name = models.CharField("Имя", max_length=50)
    last_name = models.CharField("Фамилия", max_length=50)
    middle_name = models.CharField("Отчество", max_length=50, null=True)
    address = models.CharField("Адрес", max_length=150)
    zip_code = models.CharField("Код почты", max_length=50)
    phone = models.CharField("Номер телефона", max_length=15)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, verbose_name="Пользователь"
    )

    def __str__(self) -> str:
        return f"{self.first_name} {self.last_name}{' ' + self.middle_name if self.middle_name is not None else ''}"

    class Meta:
        verbose_name = "Получатель"
        verbose_name_plural = "Получатели"


class Basket(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, verbose_name="Пользователь"
    )
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

    def __str__(self) -> str:
        return self.good_item.title

    class Meta:
        verbose_name = "Товар в корзине"
        verbose_name_plural = "Товары в корзине"


class Checkout(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, verbose_name="Пользователь"
    )
    recipent = models.ForeignKey(
        Recipent, verbose_name=("Получатель"), on_delete=models.DO_NOTHING
    )
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
    checkout = models.ForeignKey(
        "api.Checkout",
        verbose_name=("Ответ от платежной системы"),
        on_delete=models.CASCADE,
    )
    # provider_data = models.SomeField

    class Meta:
        verbose_name = "Транзакция"
        verbose_name_plural = "Транзакции"
