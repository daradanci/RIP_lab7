# Generated by Django 4.1.2 on 2022-11-02 19:13

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bag',
            fields=[
                ('bagid', models.AutoField(primary_key=True, serialize=False, verbose_name='bagId')),
                ('sum', models.IntegerField(blank=True, default=0, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Client',
            fields=[
                ('clientid', models.AutoField(primary_key=True, serialize=False, verbose_name='clientId')),
                ('clientname', models.CharField(max_length=60, verbose_name='clientName')),
                ('login', models.CharField(max_length=10, unique=True)),
                ('password', models.CharField(max_length=10, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Models',
            fields=[
                ('modelid', models.AutoField(primary_key=True, serialize=False, verbose_name='modelId')),
                ('modelname', models.CharField(max_length=30, unique=True, verbose_name='modelName')),
                ('price', models.IntegerField(blank=True, default=0, null=True)),
                ('image', models.CharField(blank=True, max_length=30, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Producer',
            fields=[
                ('producerid', models.AutoField(primary_key=True, serialize=False, verbose_name='producerId')),
                ('producername', models.CharField(max_length=30, unique=True, verbose_name='producerName')),
            ],
        ),
        migrations.CreateModel(
            name='Range',
            fields=[
                ('rangeid', models.AutoField(primary_key=True, serialize=False, verbose_name='rangeId')),
                ('rangename', models.CharField(max_length=30, unique=True, verbose_name='rangeName')),
            ],
        ),
        migrations.CreateModel(
            name='State',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('statename', models.CharField(max_length=60, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Stock',
            fields=[
                ('itemid', models.AutoField(primary_key=True, serialize=False, verbose_name='itemId')),
                ('size', models.CharField(choices=[('S', 'Small'), ('M', 'Medium'), ('L', 'Large'), ('XL', 'Extra large'), ('XXL', 'Extra extra large')], default='M', max_length=4)),
                ('amount', models.IntegerField(blank=True, default=0, null=True)),
                ('idmodel', models.ForeignKey(default=1, on_delete=django.db.models.deletion.DO_NOTHING, related_name='stock_of_model', to='l5.models', verbose_name='idModel')),
            ],
            options={
                'unique_together': {('idmodel', 'size')},
            },
        ),
        migrations.CreateModel(
            name='Purchase',
            fields=[
                ('purchaseid', models.AutoField(primary_key=True, serialize=False)),
                ('quantity', models.IntegerField(blank=True, default=0, null=True)),
                ('bought', models.BooleanField(blank=True, default=False, null=True)),
                ('date', models.DateField(default=datetime.date.today, verbose_name='Date')),
                ('idbag', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='purchase_bag', to='l5.bag')),
                ('idstock', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='purchase_stock', to='l5.stock')),
            ],
        ),
        migrations.AddField(
            model_name='models',
            name='idproducer',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.DO_NOTHING, related_name='model_of_producer', to='l5.producer', verbose_name='idProducer'),
        ),
        migrations.AddField(
            model_name='models',
            name='idrange',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.DO_NOTHING, related_name='models_of_range', to='l5.range', verbose_name='idRange'),
        ),
        migrations.AddField(
            model_name='bag',
            name='bagstate',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.DO_NOTHING, to='l5.state'),
        ),
        migrations.AddField(
            model_name='bag',
            name='idclient',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.DO_NOTHING, to='l5.client', verbose_name='idClient'),
        ),
    ]