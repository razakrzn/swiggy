from rest_framework import serializers
from restaurants.models import Restaurant, FoodItem, Collection, Category
from accounts.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role']

class CollectionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Collection
        fields = '__all__'


class FoodItemSerializer(serializers.ModelSerializer):
    categories = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), many=True
    )
    restaurant = serializers.PrimaryKeyRelatedField(
        queryset=Restaurant.objects.all()
    )

    class Meta:
        model = FoodItem
        fields = '__all__'

    def validate_restaurant(self, value):
        """Ensure the restaurant ID is valid."""
        if isinstance(value, Restaurant):
            value = value.id  # Extract the ID if it's a Restaurant instance
        if not Restaurant.objects.filter(id=value).exists():
            raise serializers.ValidationError("Invalid restaurant ID.")
        return value
    
    def validate_categories(self, value):
        """Ensure all category IDs are valid."""
        category_ids = [category.id for category in value]
        if not Category.objects.filter(id__in=category_ids).exists():
            raise serializers.ValidationError("One or more categories are invalid.")
        return value
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['categories'] = [
            category.name for category in instance.categories.all()
        ]  # Add category names for easier frontend use
        return representation


    def create(self, validated_data):
        categories_data = validated_data.pop('categories', [])
        restaurant_data = validated_data.pop('restaurant')

        # No need to manually fetch the restaurant if restaurant_data is the primary key.
        restaurant = Restaurant.objects.get(id=restaurant_data)

        # Create the FoodItem instance and associate it with the restaurant
        food_item = FoodItem.objects.create(restaurant=restaurant, **validated_data)

        # Associate the categories with the FoodItem
        food_item.categories.set(categories_data)

        return food_item


class RestaurantSerializer(serializers.ModelSerializer):
    # owner_name = UserSerializer()
    categories = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), many=True)
    food_menu = FoodItemSerializer(many=True, source='food_items', read_only=True)
    featured_image = serializers.ImageField(required=False)

    class Meta:
        model = Restaurant
        fields = '__all__'

    def validate_owner_name(self, value):
        if value.role != 'restaurant_owner':
            raise serializers.ValidationError("The user must have the role 'restaurant_owner'.")
        return value

    def validate_categories(self, value):
        """Ensure all category IDs are valid."""
        category_ids = [category.id for category in value]
        if not Category.objects.filter(id__in=category_ids).exists():
            raise serializers.ValidationError("One or more categories are invalid.")
        return value

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['categories'] = [
            category.name for category in instance.categories.all()
        ]  # Add category names for easier frontend use
        return representation

    def create(self, validated_data):
        # Extract categories from validated data
        categories = validated_data.pop('categories', [])

        # Create the restaurant instance
        restaurant = Restaurant.objects.create(**validated_data)

        # Associate categories
        restaurant.categories.set(categories)  # Categories are already validated as objects

        return restaurant

    def update(self, instance, validated_data):
        # Extract categories from validated data
        categories = validated_data.pop('categories', None)

        # Update categories if provided
        if categories is not None:
            instance.categories.set(categories)  # Categories are already validated as objects

        # Update other fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance