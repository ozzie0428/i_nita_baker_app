from rest_framework import viewsets

from .models import Recipes,Reviews, ShoppingList
from .serializers import RecipesSerializer, ReviewsSerializer, ShoppingListSerializer


class RecipesView(viewsets.ModelViewSet):
    queryset = Recipes.objects.all()
    serializer_class = RecipesSerializer

class ReviewsView(viewsets.ModelViewSet):
    queryset = Reviews.objects.all()
    serializer_class = ReviewsSerializer

class ShoppingListView(viewsets.ModelViewSet):
    queryset = ShoppingList.objects.all()
    serializer_class = ShoppingListSerializer