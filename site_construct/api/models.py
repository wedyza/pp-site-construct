from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from enum import Enum
from django.core.validators import MinValueValidator, MaxValueValidator

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


class Characteristics(models.Model):
    category = models.ForeignKey(
        GoodCategory,
        verbose_name='Категория',
        on_delete=models.CASCADE,
        related_name='characteristics'
    )
    title = models.CharField('Название свойства', max_length=50)

    def __str__(self):
        return self.title


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
        verbose_name='Характеристики',
        through='ItemCharacteristic',
        related_name='characteristics'
    )

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"


class ItemCharacteristic(models.Model):
    item = models.ForeignKey(GoodItem, on_delete=models.CASCADE)
    characteristic = models.ForeignKey(Characteristics, on_delete=models.CASCADE)
    body = models.TextField('Содержимое свойства', max_length=500)

    class Meta:
        unique_together = ('item', 'characteristic')

class BaseMethod(models.Model):
    title = models.CharField("Название", max_length=100)
    description = models.TextField("Описание", max_length=500)

    def __str__(self) -> str:
        return self.title

    class Meta:
        abstract = True


class PaymentMethod(models.Model):  # Надо добавить картинки + интеграция с MinIO
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=False,
        verbose_name='Пользователь',
        related_name='cards'
    )
    card_body = models.CharField('Номер карты', max_length=16)
    card_expire_date = models.DateField('Дата окончания действия карты')
    card_cvc_code = models.CharField('CVC код', max_length=3)


    def __str__(self) -> str:
        return self.title
    
    
    class Meta:
        verbose_name = "Способ оплаты"
        verbose_name_plural = "Способы оплаты"


class DeliveryMethod(models.Model):
    title = models.CharField("Название", max_length=100)
    description = models.TextField("Описание", max_length=500)

    def __str__(self) -> str:
        return self.title
    
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
        return self.good_item.name

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
    status = models.TextField(
        "Статус",
        choices=[(status.name, status.value) for status in OrderStatusChoices],
        default="В обработке",
    )

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
        related_name='transaction'
    )
    # provider_data = models.SomeField

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
    order = models.ForeignKey(
        Order, null=False, on_delete=models.CASCADE, verbose_name="Заказ"
    )
    body = models.TextField("Тело", max_length=500)
    rate = models.IntegerField(
        "Рейтинг", default=0, validators=[MinValueValidator(0), MaxValueValidator(10)]
    )


class CommentReply(models.Model):
    user = models.ForeignKey(
        User, null=False, on_delete=models.CASCADE, verbose_name="Пользователь"
    )
    comment = models.ForeignKey(
        Comment, null=False, on_delete=models.CASCADE, verbose_name="Комментарий"
    )
    body = models.TextField("тело", max_length=500)


class ItemMedia(models.Model):
    item = models.ForeignKey(
        GoodItem, null=False, on_delete=models.CASCADE, verbose_name="Товар"
    )
    # source = models.ImageField()


class Message(models.Model):
    user_from = models.ForeignKey(
        User,
        null=False,
        on_delete=models.CASCADE,
        verbose_name="Отправитель",
        related_name="sended_messages",
    )
    user_to = models.ForeignKey(
        User,
        null=False,
        on_delete=models.CASCADE,
        verbose_name="Получатель",
        related_name="received_messagess",
    )
    body = models.TextField("тело сообщения", max_length=500)
    created_at = models.DateTimeField("Время сообщения", auto_now_add=True)


class Notification(models.Model):
    class NotificationType(Enum):
        COMMENT = "Отзыв"
        REFUND = "Возврат"
        CHAT = "Чат"
        NEW_ORDER = "Новый заказ"
        ITEM_APPLIED = "Товар одобрен"
        ORDER_STATUS_CHANGED = "Изменился статус заказа"
        COMMENT_REPLIED = "Получен ответ на комментарий"
        # discount

    body = models.TextField("Тело", max_length=300)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, verbose_name="Пользователь"
    )
    notification_type = models.TextField(
        "Тип уведомления",
        choices=[
            (notification.name, notification.value) for notification in NotificationType
        ],
    )
    readed = models.BooleanField("Прочитано", default=False)

class Like(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, verbose_name="Пользователь"
    )
    item = models.ForeignKey(
        GoodItem, null=False, on_delete=models.CASCADE, verbose_name="Товар"
    )
    created_at = models.DateTimeField(auto_now_add=True)