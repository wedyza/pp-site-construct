# filters.py
import django_filters
from .models import GoodItem

class GoodItemFilter(django_filters.FilterSet):
    # price = django_filters.NumberFilter()
    # price_gt = django_filters.NumberFilter(field_name='price', lookup_expr='gt', label='Min Price')
    # price_lt = django_filters.NumberFilter(field_name='price', lookup_expr='lt', label='Max Price')
    
    class Meta:
        model = GoodItem
        # fields = ['price']
        fields = {
            'price': ['lt', 'gt']
        }