from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BlogPostViewSet, ContactMessageViewSet

router = DefaultRouter()
router.register(r'blogs', BlogPostViewSet)
router.register(r'contact', ContactMessageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
