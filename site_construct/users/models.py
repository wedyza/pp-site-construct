from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.validators import RegexValidator, MaxValueValidator, MinValueValidator
from django.utils import timezone
from enum import Enum


class UserManager(BaseUserManager): #pragma: no cover
    """Define a model manager for User model with no username field."""

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("Должна быть почта")

        self.email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_user(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(email, password, **extra_fields)


# class UserType(models.Model):
#     name = models.CharField('Название', max_length=100)

#     def __str__(self):
#         return self.name

#     class Meta:
#         verbose_name = 'Тип пользователя'
#         verbose_name_plural = 'Типы пользователей'


class CustomAbstractUser(AbstractUser):
    class UserType(Enum):
        BUYER = "Покупатель"
        SELLER = "Продавец"
        ADMIN = "Администратор"
        DELIVERY = "Доставщик"
        SUPPORT = "Поддержка"
        MODERATOR = "Модератор"

    class SexType(Enum):
        MALE = "Мужчина"
        FEMALE = "Женщина"

    username = None
    USERNAME_FIELD = "email"
    objects = UserManager()
    user_type = models.TextField(
        "Тип пользователя",
        choices=[(utype.name, utype.value) for utype in UserType],
        default="Покупатель",
    )
    email = models.EmailField(unique=True)
    password = None
    last_login = None
    otp = models.CharField(max_length=6, null=True, blank=True)
    sex = models.TextField(
        "Пол пользователя",
        choices=[(sex.name, sex.value) for sex in SexType],
        null=True,
    )
    avatar = models.ImageField("Аватар", upload_to="avatars", null=True)
    REQUIRED_FIELDS = []
    # name = models.CharField('Имя', null=True, max_length=50)
    otp_expires = models.DateTimeField("Время жизни otp", null=True, blank=True)
    is_superuser = None
    is_staff = None
    date_joined = None

    def __str__(self):
        return self.email
