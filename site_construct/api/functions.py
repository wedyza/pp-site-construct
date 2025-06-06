from .filters import GoodItemFilter
from .models import GoodCategory, CharacteristicsCategory, GoodItem
from typing import List, Tuple
import datetime
from users.models import CustomAbstractUser
from .models import MoneyPayout
from django.utils import timezone
import httpx


def unwrap_categories(category: GoodCategory) -> List[CharacteristicsCategory]:
    characteristics_categories = CharacteristicsCategory.objects.filter(
        category=category
    ).all()
    if category.parent != None:
        new_characteristics = unwrap_categories(category.parent)
        characteristics_categories = characteristics_categories.union(
            new_characteristics
        )
    return characteristics_categories


def unwrap_categories_items(data, category: GoodCategory) -> List[GoodItem]:
    category_items = (
        GoodItemFilter(data, queryset=GoodItem.objects.filter(category=category).filter(visible=True).all()).qs
    )
    daughter_list = GoodCategory.objects.filter(parent=category).all()
    for daughter in daughter_list:
        new_items = unwrap_categories_items(data, daughter)
        category_items = category_items.union(new_items)
    return category_items


def define_this_month_period() -> Tuple[datetime.date, datetime.date]: #pragma: no cover
    today = timezone.now().date()
    start_of_month = datetime.date(today.year, today.month, 1)
    end_of_month = datetime.date(today.year, today.month + 1, 1) - datetime.timedelta(
        days=1
    )
    return start_of_month, end_of_month


def define_this_week_period() -> Tuple[datetime.date, datetime.date]: #pragma: no cover
    today = timezone.now().date()
    today_weekday = today.weekday()
    start_of_week = today - datetime.timedelta(days=today_weekday)
    end_of_week = today + datetime.timedelta(days=(6 - today_weekday))
    return start_of_week, end_of_week


def fill_this_week_with_days(week: list, start: datetime.date): #pragma: no cover
    if len(week) == 7:
        return week
    week = list(week)
    week_dates = [start + datetime.timedelta(days=i) for i in range(7)]

    for i in range(7):
        if len(week) == i or week[i]["created_at__date"] != week_dates[i]:
            week.insert(i, {"created_at__date": week_dates[i], "count": 0})

    return week


def get_status(count: int) -> str: #pragma: no cover
    status = "В наличии"
    if count <= 0:
        status = "Нет в наличии"
    elif count <= 10 and count:
        status = "Очень мало"
    elif count <= 50:
        status = "Мало"
    return status
