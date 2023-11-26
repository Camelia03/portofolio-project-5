from django_filters import FilterSet
from .models import Review


class ReviewsFilter(FilterSet):
    class Meta:
        model = Review
        fields = ['owner']
