from rest_framework import serializers

from users.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'first_name',
            'last_name',
            'username',
            'email',
            'is_staff',
        ]
        read_only_fields = ['is_staff']
        extra_kwargs = {
            'first_name': {'required': True},
            'email': {'required': True}
        }


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'first_name',
            'last_name',
            'username',
            'email',
            'password'
        ]
        extra_kwargs = {
            'first_name': {'required': True},
            'email': {'required': True},
            'password': {'required': True, 'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
