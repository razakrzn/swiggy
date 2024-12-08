from django.db import models


class Collection(models.Model):
    name = models.CharField(max_length=50, unique=True)
    collection_image = models.ImageField(upload_to="collections/images/")
    is_deleted = models.BooleanField(default=False)

    class Meta:
        db_table = 'food_collection'

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)

    class Meta:
        db_table = 'restaurants_food_category'
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name


class Restaurant(models.Model):
    owner_name = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    featured_image = models.ImageField(upload_to="restaurants/images/")
    rating = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True)
    outlet = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(max_length=255)
    address = models.TextField()
    phone_number = models.CharField(max_length=15)
    working_days = models.JSONField(blank=True, null=True)
    categories = models.ManyToManyField(Category, related_name='restaurants')
    opening_time = models.TimeField()
    closing_time = models.TimeField()
    offer_text = models.CharField(max_length=50, blank=True, null=True)
    delivery_time = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        db_table = 'restaurants_restaurant'

    def __str__(self):
        return self.name


class FoodItem(models.Model):
    VEGETARIAN_CHOICES = [
        ('veg', 'Vegetarian'),
        ('non-veg', 'Non-Vegetarian'),
    ]

    restaurant = models.ForeignKey(
        Restaurant,
        on_delete=models.CASCADE,
        related_name='food_items'
    )
    images = models.ImageField(upload_to="food_items/images/")
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    food_type = models.CharField(
        max_length=10,
        choices=VEGETARIAN_CHOICES,
        default='non-veg'
    )
    rating = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True)
    categories = models.ManyToManyField(Category, related_name='food_items')
    is_deleted = models.BooleanField(default=False)

    class Meta:
        db_table = 'restaurants_food_items'

    def __str__(self):
        return self.name


class Order(models.Model):
    customer_name = models.CharField(max_length=255)
    customer_phone = models.CharField(max_length=15)
    food_items = models.ManyToManyField(FoodItem)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=50,
        choices=[
            ('pending', 'Pending'),
            ('in_progress', 'In Progress'),
            ('completed', 'Completed'),
            ('cancelled', 'Cancelled'),
        ],
        default='pending'
    )

    class Meta:
        db_table = 'restaurants_order'

    def __str__(self):
        return f"Order {self.id} - {self.customer_name}"
