from django_filters import FilterSet
from .models import List


class ListsFilter(FilterSet):
    class Meta:
        model = List
        fields = {'books__id': ['exact']}
