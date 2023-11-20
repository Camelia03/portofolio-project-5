from django.db import models
from django.contrib.auth.models import User
from books.models import Book


class Review(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    content = models.TextField()
    stars = models.IntegerField()  # TODO: add validation
    book = models.ForeignKey(Book, on_delete=models.CASCADE)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.owner}'s review for book: ${str(self.book)}"


class Like(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    review = models.ForeignKey(
        Review, on_delete=models.CASCADE, related_name='likes'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        unique_together = ['owner', 'review']

    def __str__(self) -> str:
        return f"{self.owner} likes review: {self.review}"
