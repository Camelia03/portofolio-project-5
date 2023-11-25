from django.urls import path
from .views import BookReviews, CommentDetails, LikeDetail, ReviewComments, ReviewDetails, UserReviews, CreateLike, CommentsList

urlpatterns = [
    path('books/<int:book_id>/reviews', BookReviews.as_view()),
    path('reviews/<int:pk>', ReviewDetails.as_view()),
    path('reviews/<int:pk>/like', CreateLike.as_view()),
    path('users/<int:user_id>/reviews', UserReviews.as_view()),

    path('likes', CreateLike.as_view()),
    path('likes/<int:pk>', LikeDetail.as_view()),

    path('comments', CommentsList.as_view()),
    path('comments/<int:pk>', CommentDetails.as_view()),
    path('reviews/<int:review_id>/comments', ReviewComments.as_view())
]
