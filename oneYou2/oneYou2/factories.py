from django.contrib.auth.models import User


def create_test_user():
    user = User()
    user.save()
    return user


def create_test_admin_user():
    return User.objects.create_superuser('testadmin', 'test@test.com', 'superPassword')