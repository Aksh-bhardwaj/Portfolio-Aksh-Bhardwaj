from django.utils.text import slugify
from rest_framework import serializers
from .models import BlogPost, ContactMessage, Comment


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'name', 'text', 'created_at']


class BlogPostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = BlogPost
        fields = [
            'id',
            'title',
            'slug',
            'content',
            'excerpt',
            'likes',
            'dislikes',
            'created_at',
            'updated_at',
            'image',
            'comments',
        ]


class BlogPostWriteSerializer(serializers.ModelSerializer):
    """Create/update blog posts (superuser only). Slug optional — auto from title."""

    class Meta:
        model = BlogPost
        fields = ['title', 'slug', 'content', 'excerpt', 'image']
        extra_kwargs = {
            'slug': {'required': False, 'allow_blank': True},
            'image': {'required': False, 'allow_null': True},
        }

    def _unique_slug(self, base_slug, exclude_pk=None):
        slug = base_slug or 'post'
        candidate = slug
        i = 1
        while True:
            qs = BlogPost.objects.filter(slug=candidate)
            if exclude_pk is not None:
                qs = qs.exclude(pk=exclude_pk)
            if not qs.exists():
                return candidate
            candidate = f'{slug}-{i}'
            i += 1

    def create(self, validated_data):
        slug_input = validated_data.pop('slug', None)
        title = validated_data['title']
        if slug_input and str(slug_input).strip():
            slug = self._unique_slug(slugify(str(slug_input).strip()))
        else:
            slug = self._unique_slug(slugify(title))
        validated_data['slug'] = slug
        return BlogPost.objects.create(**validated_data)

    def update(self, instance, validated_data):
        slug_input = validated_data.pop('slug', None)
        if slug_input is not None:
            if str(slug_input).strip():
                validated_data['slug'] = self._unique_slug(
                    slugify(str(slug_input).strip()),
                    exclude_pk=instance.pk,
                )
            elif 'title' in validated_data:
                validated_data['slug'] = self._unique_slug(
                    slugify(validated_data['title']),
                    exclude_pk=instance.pk,
                )
        return super().update(instance, validated_data)


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'
