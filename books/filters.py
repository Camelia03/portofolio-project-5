from django_filters import FilterSet, CharFilter
from django.db.models import Q
from .models import Book


class BookFilter(FilterSet):
    search = CharFilter(method='get_search')

    def get_search(self, queryset, name, value):
        return queryset.filter(
            Q(title__icontains=value) | Q(description__icontains=value) | Q(
                authors__full_name__icontains=value)
        )

    class Meta:
        model = Book
        fields = {'title': ['icontains'], 'genres__name': ['exact']}
