# type: ignore

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static
from .views import (
    GoodCategoryViewSet,
    GoodItemViewSet,
    PaymentMethodViewSet,
    DeliveryMethodViewSet,
    BasketItemViewSet,
    UsersViewSet,
    RecipentViewSet,
    OrderViewSet,
    CharacteristicViewSet,
    GetMyWishlistView,
    MarketViewSet,
    CommentViewSet,
    CommentReplyViewSet
)

router = routers.DefaultRouter()

router.register("users", UsersViewSet)
router.register("good-categories", GoodCategoryViewSet)
router.register("goods", GoodItemViewSet, basename='goods')
router.register("payment-methods", PaymentMethodViewSet, basename='payment-methods')
router.register("delivery-methods", DeliveryMethodViewSet)
router.register("me/basket-items", BasketItemViewSet, basename="basket-items")
router.register("recipents", RecipentViewSet, basename='recipents')
router.register("orders", OrderViewSet, basename='orders')
router.register("characteristics", CharacteristicViewSet)
router.register("markets", MarketViewSet)
router.register("comments", CommentViewSet, basename="comments")
router.register("comments-replies", CommentReplyViewSet, basename="comments-replies")


urlpatterns = [
    path("", include(router.urls)),
    # path('auth/', include('djoser.urls')),
    # path('auth/', include('djoser.urls.jwt')),
    # path("auth/activation/<uid>/<token>/", ActivationView.as_view({'get': 'activation'}), name='email-activation'),
    path("auth/", include("users.urls")),
    path("me/wishlist/", GetMyWishlistView.as_view(), name='get-my-wishlist')
]

schema_view = get_schema_view(
    openapi.Info(
        title="site construct API",
        default_version="v1",
        description="Документация для приложения site construct",
        # terms_of_service="URL страницы с пользовательским соглашением",
        contact=openapi.Contact(email="wedyza@mail.ru"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


urlpatterns += [
    url(
        r"^swagger(?P<format>\.json|\.yaml)$",
        schema_view.without_ui(cache_timeout=0),
        name="schema-json",
    ),
    url(
        r"^swagger/$",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    url(
        r"^redoc/$", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"
    ),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
