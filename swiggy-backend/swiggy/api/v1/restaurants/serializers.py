from rest_framework import serializers
from restaurants.models import Restaurant, FoodItem, Order, Collection


class CollectionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Collection
        fields = '__all__'


class FoodItemSerializer(serializers.ModelSerializer):
    categories = serializers.SerializerMethodField()
    restaurant = serializers.CharField(source='restaurant.name', read_only=True)  

    class Meta:
        model = FoodItem
        fields = '__all__'

    def get_categories(self, instance):
        return [category.name for category in instance.categories.all()]


class RestaurantSerializer(serializers.ModelSerializer):
    categories = serializers.SerializerMethodField()
    food_menu = FoodItemSerializer(many=True, source='food_items') 

    class Meta:
        model = Restaurant
        fields = '__all__'

    def get_categories(self, instance):
        return [category.name for category in instance.categories.all()]


class OrderSerializer(serializers.ModelSerializer):
    food_items = FoodItemSerializer(many=True)

    class Meta:
        model = Order
        fields = [
            'id',
            'customer_name',
            'customer_phone',
            'food_items',
            'total_price',
            'created_at',
            'status'
        ]

    def create(self, validated_data):
        food_items_data = validated_data.pop('food_items')
        order = Order.objects.create(**validated_data)
        order.food_items.set(FoodItem.objects.filter(id__in=[item['id'] for item in food_items_data]))
        return order

    def update(self, instance, validated_data):
        food_items_data = validated_data.pop('food_items', None)
        if food_items_data:
            instance.food_items.set(FoodItem.objects.filter(id__in=[item['id'] for item in food_items_data]))
        return super().update(instance, validated_data)
