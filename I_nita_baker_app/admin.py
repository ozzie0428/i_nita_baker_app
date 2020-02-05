from django.contrib import admin
from .models import Recipes, Reviews, ShoppingList

admin.site.register([Recipes, Reviews, ShoppingList])
