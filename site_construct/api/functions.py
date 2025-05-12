from .models import GoodCategory, CharacteristicsCategory
from typing import List


def unwrap_categories(category: GoodCategory)->List[GoodCategory]:
    characteristics_categories = CharacteristicsCategory.objects.filter(category=category).all()
    if category.parent != None:
        new_characteristics = unwrap_categories(category.parent)
        characteristics_categories = characteristics_categories.union(new_characteristics)
    return characteristics_categories