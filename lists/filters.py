from django_filters import FilterSet
from .models import List


class ListsFilter(FilterSet):
    """Allow filtering lists by a book"""

    class Meta:
        model = List
        fields = {'books__id': ['exact']}
