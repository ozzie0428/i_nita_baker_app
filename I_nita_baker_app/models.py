from django.db import models

class Recipes(models.Model):
    name = models.CharField(max_length=100)
    ingredients  = models.TextField(default='', blank=True)
    instructions = models.TextField(default='', blank=True)
    picture_url = models.TextField(default='', blank=True)
    time = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class Reviews(models.Model):
    name = models.CharField(max_length=100)
    tastiness = models.CharField(max_length=100)
    difficulty = models.CharField(max_length=100)
    recipe = models.ForeignKey(Recipes, on_delete=models.CASCADE, related_name='reviews')

    def __str__(self):
        return self.name


class ShoppingList(models.Model):
    name = models.CharField(max_length=100)
    picture_url = models.TextField(default='', blank=True)
    price = models.CharField(max_length=100)
