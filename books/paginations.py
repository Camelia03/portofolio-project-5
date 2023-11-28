from rest_framework.pagination import PageNumberPagination


class ClientPagination(PageNumberPagination):
    """Allow clients to change the size of the page"""

    page_size_query_param = 'page_size'
