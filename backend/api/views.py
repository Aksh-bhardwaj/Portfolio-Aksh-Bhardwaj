from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .models import BlogPost, ContactMessage, Comment
from .serializers import BlogPostSerializer, ContactMessageSerializer, CommentSerializer

class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogPost.objects.all().order_by('-created_at')
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'

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
        
        # Send Email Logic
        try:
            name = serializer.validated_data.get('name')
            email = serializer.validated_data.get('email')
            message = serializer.validated_data.get('message')
            
            send_mail(
                f'New Portfolio Message from {name}',
                f'From: {name} <{email}>\n\nMessage:\n{message}',
                'noreply@portfolio.com',
                ['akshkumarlalla@gmail.com'],
                fail_silently=False,
            )
        except Exception as e:
            print(f"Email failed: {e}")

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
