from django.contrib import admin
from restaurants.models import Restaurant, FoodItem, Category, Collection


admin.site.register(Collection)


class FoodItemAdmin(admin.TabularInline):
    list_display = ('name')
    model = FoodItem

class RestaurantAdmin(admin.ModelAdmin):

    inlines = [FoodItemAdmin]

admin.site.register(Restaurant, RestaurantAdmin)

admin.site.register(Category)