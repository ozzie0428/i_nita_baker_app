from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router = register('recipes', views.RecipesView)
router = register('reviews', views.ReviewsView)
router = register('shoppinglist', views.ShoppingListView)

urlpatterns = [
    path('', include(router.urls))
]
