import os

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.core.mail import send_mail
from .models import BlogPost, ContactMessage, Comment
from .serializers import (
    BlogPostSerializer,
    BlogPostWriteSerializer,
    ContactMessageSerializer,
    CommentSerializer,
)
from .permissions import IsSuperUser


class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all().order_by('-created_at')
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action in ('create', 'update', 'partial_update'):
            return BlogPostWriteSerializer
        return BlogPostSerializer

    def get_permissions(self):
        if self.action in ('create', 'update', 'partial_update', 'destroy'):
            return [IsAuthenticated(), IsSuperUser()]
        return [AllowAny()]

    @action(detail=True, methods=['post'])
    def like(self, request, slug=None):
        post = self.get_object()
        post.likes += 1
        post.save()
        return Response({'likes': post.likes, 'dislikes': post.dislikes})

    @action(detail=True, methods=['post'])
    def undo_like(self, request, slug=None):
        post = self.get_object()
        if post.likes > 0:
            post.likes -= 1
            post.save()
        return Response({'likes': post.likes, 'dislikes': post.dislikes})

    @action(detail=True, methods=['post'])
    def dislike(self, request, slug=None):
        post = self.get_object()
        post.dislikes += 1
        post.save()
        return Response({'likes': post.likes, 'dislikes': post.dislikes})

    @action(detail=True, methods=['post'])
    def undo_dislike(self, request, slug=None):
        post = self.get_object()
        if post.dislikes > 0:
            post.dislikes -= 1
            post.save()
        return Response({'likes': post.likes, 'dislikes': post.dislikes})

    @action(detail=True, methods=['post'])
    def comment(self, request, slug=None):
        post = self.get_object()
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(post=post)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        name = serializer.validated_data.get('name')
        email = serializer.validated_data.get('email')
        message = serializer.validated_data.get('message')
        notify_to = os.environ.get('CONTACT_NOTIFY_EMAIL', '').strip()
        from_addr = os.environ.get('EMAIL_HOST_USER', '').strip() or 'noreply@localhost'

        if notify_to:
            try:
                send_mail(
                    f'Portfolio message from {name}',
                    f'From: {name} <{email}>\n\n{message}',
                    from_addr,
                    [notify_to],
                    fail_silently=True,
                )
            except Exception:
                pass

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
