from rest_framework import serializers
from .models import Comment, Like, Review
from django.db import IntegrityError


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    book_id = serializers.ReadOnlyField(source='book.id')
    book_title = serializers.ReadOnlyField(source='book.title')

    like_id = serializers.SerializerMethodField()
    likes_count = serializers.ReadOnlyField()

    is_owner = serializers.SerializerMethodField()

    def get_user(self, obj):
        return {
            'id': obj.owner.id,
            'username': obj.owner.username,
            'profile_id': obj.owner.profile.id,
            'profile_image': obj.owner.profile.avatar.url
        }

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    def get_like_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            like = Like.objects.filter(
                owner=user, review=obj
            ).first()
            return like.id if like else None

    class Meta:
        model = Review
        fields = ('id', 'user', 'is_owner', 'updated_at', 'like_id', 'likes_count',
                  'created_at', 'stars', 'book_id', 'book_title', 'content')


class LikeSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='owner.username')

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError({
                'detail': 'possible duplicate'
            })

    class Meta:
        model = Like
        fields = ('id', 'username', 'review')


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    is_owner = serializers.SerializerMethodField()

    def get_user(self, obj):
        return {
            'id': obj.owner.id,
            'username': obj.owner.username,
            'profile_id': obj.owner.profile.id,
            'profile_image': obj.owner.profile.avatar.url
        }

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Comment
        fields = ('id', 'user', 'review', 'text', 'is_owner', 'created_at')
