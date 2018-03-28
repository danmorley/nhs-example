from django.contrib.auth.models import User


def create_test_user():
    user = User()
    user.save()
    return user