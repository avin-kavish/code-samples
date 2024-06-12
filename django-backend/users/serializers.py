from rest_framework import serializers

from users.models import User


# class UserSerializer(serializers.Serializer):
#     id = serializers.IntegerField(read_only=True)
#     username = serializers.CharField(max_length=100)
#     email = serializers.EmailField()
#     password = serializers.CharField(max_length=50)
#
#     def create(self, validated_data):
#         """
#         Create and return a new `User` instance, given the validated data.
#         """
#         return User.objects.create(**validated_data)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email',
                  'is_staff']
        extra_kwargs = {
            'first_name': {'required': True},
            'email': {'required': True}
        }
