# Generated by Django 3.0.3 on 2020-02-05 15:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Recipes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('ingredients', models.CharField(max_length=100)),
                ('instructions', models.TextField(blank=True, default='')),
                ('picture_url', models.TextField(blank=True, default='')),
                ('time', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='ShoppingList',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('picture_url', models.TextField(blank=True, default='')),
                ('price', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Reviews',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('tastiness', models.CharField(max_length=100)),
                ('difficulty', models.CharField(max_length=100)),
                ('recipe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to='I_nita_baker_app.Recipes')),
            ],
        ),
    ]
