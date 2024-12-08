from django.urls import path
from .views import RestaurantList, FoodItemList, RestaurantDetails, OrderDetail, FoodItems, Collections

urlpatterns = [
    path('', RestaurantList.as_view(), name='restaurant-list'),
    path('collections/', Collections.as_view(), name='collections'),
    path('<int:pk>/', RestaurantDetails.as_view(), name='restaurantDetails-list'),
    path('fooditem/', FoodItems.as_view(), name='food_item'),
    path('fooditem/<int:pk>/', FoodItemList.as_view(), name='fooditem-detail'),
    path('orderdetail/<int:pk>/', OrderDetail.as_view(), name='Order-detail'),
]
 