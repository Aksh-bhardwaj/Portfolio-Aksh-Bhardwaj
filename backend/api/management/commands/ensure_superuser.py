import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

User = get_user_model()


class Command(BaseCommand):
    help = 'Create a superuser from env if missing (for production deploys).'

    def handle(self, *args, **options):
        username = os.environ.get('ADMIN_USERNAME', '').strip()
        password = os.environ.get('ADMIN_PASSWORD', '').strip()
        email = os.environ.get('ADMIN_EMAIL', 'admin@localhost').strip()

        if not username or not password:
            self.stdout.write(
                'ensure_superuser: skipped (set ADMIN_USERNAME and ADMIN_PASSWORD in environment).'
            )
            return

        if User.objects.filter(username=username).exists():
            self.stdout.write(self.style.WARNING(f'Superuser "{username}" already exists.'))
            return

        User.objects.create_superuser(username=username, email=email or 'admin@localhost', password=password)
        self.stdout.write(self.style.SUCCESS(f'Created superuser "{username}".'))
