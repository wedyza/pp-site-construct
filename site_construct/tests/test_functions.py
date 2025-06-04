from django.test import TestCase
from django.contrib.auth import get_user_model
from api.models import GoodCategory, CharacteristicsCategory, GoodItem
from api.functions import unwrap_categories, unwrap_categories_items
from .functions import user_create_closure

User = get_user_model()

create_user = user_create_closure()
class UnwrapCategoriesTest(TestCase):
    def setUp(self):
        self.category = GoodCategory.objects.create(title='', description='')
        self.category_characteristics = [CharacteristicsCategory.objects.create(title='', category=self.category) for _ in range(2)]
        self.category_daughter = GoodCategory.objects.create(title='', description='', parent=self.category)
        self.category_daughter_characteristics = [CharacteristicsCategory.objects.create(title='', category=self.category_daughter) for _ in range(3)]
    
    def test_unwrapping_daughter_category(self):
        result = unwrap_categories(self.category_daughter)
        # asserting_result = [*self.category_characteristics, *self.category_daughter_characteristics]
        self.assertEqual(len(result), 5)
        # self.assertListEqual(list(result), asserting_result)
    
    def test_unwrapping_parent_category(self):
        result = unwrap_categories(self.category)
        self.assertEqual(list(result), self.category_characteristics)


class UnwrapCategoriesItemsTest(TestCase):
    def setUp(self):
        self.user = create_user('Продавец')
        self.category = GoodCategory.objects.create(title='', description='')
        self.category_goods = [GoodItem.objects.create(name='', description='', user=self.user, visible=True, category=self.category) for _ in range(2)]
        self.category_daughter = GoodCategory.objects.create(title='', description='', parent=self.category)
        self.category_daughter_goods = [GoodItem.objects.create(name='', description='', user=self.user, visible=True, category=self.category_daughter) for _ in range(4)]

    def test_unwrapping_daughter_category(self):
        result = list(unwrap_categories_items({}, self.category_daughter))
        self.assertListEqual(result, self.category_daughter_goods)

    def test_unwrapping_parent_category(self):
        result = list(unwrap_categories_items({}, self.category))
        asserted_result = [*self.category_goods, *self.category_daughter_goods]
        self.assertListEqual(result, asserted_result)
