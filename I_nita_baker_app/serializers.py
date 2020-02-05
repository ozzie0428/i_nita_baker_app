from rest_framework import serializers
from .models import Recipes, Reviews, ShoppingList

class ShoppingListSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = ShoppingList
        fields = ( 'id','name', 'picture_url', 'price')


class ReviewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reviews
        fields = ('id','name','tastiness','difficulty')
        

class RecipesSerializer(serializers.ModelSerializer):
    reviews = ReviewsSerializer(many=True, read_only=True)

    class Meta:
        model = Recipes
        fields = ('id','name','ingredients','instructions','picture_url', 'time', 'reviews')