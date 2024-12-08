from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from restaurants.models import Restaurant, FoodItem, Order, Collection
from .serializers import RestaurantSerializer, FoodItemSerializer, OrderSerializer, CollectionSerializer
from .pagination import StandardResultSetPagination


class Collections(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        
        collections = Collection.objects.filter(is_deleted=False)
        serializer = CollectionSerializer(collections, many=True, context={'request': request})

        response_data = {
            "status_code": 6000,
            'data': serializer.data,
        }
        
        return Response(response_data)


class RestaurantList(APIView):

    def get(self, request):
        restaurants = Restaurant.objects.all()

        query = request.GET.get("q")
        if query:
            restaurants = restaurants.filter(name__icontains=query)

        pagination = StandardResultSetPagination()
        paginated_restaurants = pagination.paginate_queryset(restaurants, request)

        serializer = RestaurantSerializer(
            paginated_restaurants, many=True, context={'request': request}
        )

        response_data = {
            "status_code": 6000,
            'count': pagination.page.paginator.count,
            'next': pagination.get_next_link(),
            'previous': pagination.get_previous_link(),
            'data': serializer.data,
        }

        return Response(response_data)


class RestaurantDetails(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        try:
            
            restaurant = Restaurant.objects.get(pk=pk)
            
            serializer = RestaurantSerializer(restaurant, context={'request': request})
            restaurant_data = serializer.data

            food_menu = [
                item for item in restaurant_data.get('food_menu', [])
                if not item.get('is_deleted', False)
            ]
            
            restaurant_data['food_menu'] = food_menu

            return Response(
                {
                    'status_code': 6000,
                    'data': restaurant_data,
                },
                status=status.HTTP_200_OK,
            )

        except Restaurant.DoesNotExist:
            return Response(
                {
                    'status_code': 6001,
                    'message': 'Restaurant not found',
                },
                status=status.HTTP_404_NOT_FOUND,
            )



class FoodItemList(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk: int) -> Response:
        try:
            food_item = FoodItem.objects.get(pk=pk, is_deleted=False)
            serializer = FoodItemSerializer(food_item, context={'request': request})
            return Response(
                {
                    'status_code': 6000,
                    'data': serializer.data,
                },
                status=status.HTTP_200_OK,
            )
        except FoodItem.DoesNotExist:
            return Response(
                {
                    'status_code': 6001,
                    'message': 'Food item not found',
                },
                status=status.HTTP_404_NOT_FOUND,
            )



class FoodItems(APIView):
    
    permission_classes = [AllowAny]

    def get(self, request):
        food_items = FoodItem.objects.filter(is_deleted=False)

        serializer = FoodItemSerializer(
            food_items, many=True, context={'request': request}
        )

        response_data = {
            "status_code": 6000,
            'data': serializer.data,
        }

        return Response(response_data)

    


class OrderDetail(APIView):
    
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            order = Order.objects.get(pk=pk)
            serializer = OrderSerializer(order, context={'request': request})

            return Response(
                {
                    'status_code': 6000,
                    'data': serializer.data,
                },
                status=status.HTTP_200_OK,
            )

        except Order.DoesNotExist:
            return Response(
                {
                    'status_code': 6001,
                    'message': 'Order not found',
                },
                status=status.HTTP_404_NOT_FOUND,
            )