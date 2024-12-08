import requests
import json

from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

class Create(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data['email']
        name = request.data['name']
        password = request.data['password']

        print("email", email)
        print("password", password)
        print("name", name)

        if not User.objects.filter(username=email).exists():
            user = User.objects.create_user(
                username=email,
                first_name=name,
                password=password
            )

            headers = {
                "Content-Type": "application/json",
            }

            data = {
                'username': email,
                'password': password
            }

            protocol = 'http://'
            if request.is_secure():
                protocol = 'https://'

            host = request.get_host()

            # Fix the missing `/` in the URL
            url = protocol + host + '/api/v1/auth/token/'

            # Use requests.post
            response = requests.post(url, headers=headers, data=json.dumps(data))

            if response.status_code == 200:
                response_data = {
                    'status_code': 6000,
                    'message': "Account created successfully.",
                    'data': response.json()
                }
            else:
                response_data = {
                    'status_code': 6002,
                    'message': "Failed to create account. Please try again."
                }
        else:
            response_data = {
                'status_code': 6001,
                'message': "This account already exists."
            }

        return Response(response_data)
