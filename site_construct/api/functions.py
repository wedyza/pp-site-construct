from .models import GoodCategory, CharacteristicsCategory
from typing import List
import datetime

def unwrap_categories(category: GoodCategory) -> List[GoodCategory]:
    characteristics_categories = CharacteristicsCategory.objects.filter(
        category=category
    ).all()
    if category.parent != None:
        new_characteristics = unwrap_categories(category.parent)
        characteristics_categories = characteristics_categories.union(
            new_characteristics
        )
    return characteristics_categories


def define_this_month_period():
    today = datetime.date.today()
    start_of_month = datetime.date(today.year, today.month, 1)
    end_of_month = datetime.date(today.year, today.month+1, 1) - datetime.timedelta(days=1)
    return start_of_month, end_of_month