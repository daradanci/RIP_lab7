from django.db import models
from django.utils.translation import gettext_lazy as _
import datetime

class Producer(models.Model):
    producerid=models.AutoField(verbose_name='producerId', primary_key=True)
    producername=models.CharField(verbose_name='producerName', unique=True, max_length=30)
    def __str__(self):
        return self.producername

class Range(models.Model):
    rangeid = models.AutoField(verbose_name='rangeId', primary_key=True)
    rangename = models.CharField(verbose_name='rangeName', unique=True, max_length=30)
    def __str__(self):
        return self.rangename

class Models(models.Model):
    modelid = models.AutoField(verbose_name='modelId', primary_key=True)
    idrange = models.ForeignKey(Range, models.DO_NOTHING, verbose_name='idRange', default=1, related_name='models_of_range')
    modelname = models.CharField(verbose_name='modelName', unique=True, max_length=30)
    # producer = models.CharField(max_length=30, blank=True, null=True)
    idproducer=models.ForeignKey(Producer, models.DO_NOTHING, verbose_name='idProducer', default=1, related_name='model_of_producer')
    price = models.IntegerField(blank=True, null=True, default=0)
    image = models.CharField(max_length=30, blank=True, null=True)

    def __int__(self):
        return self.price
    def __str__(self):
        return self.modelname

class Stock(models.Model):
    class ItemSize(models.TextChoices):
        SMALL='S', _('Small')
        MEDIUM='M', _('Medium')
        LARGE='L', _('Large')
        EXTRALARGE='XL', _('Extra large'),
        EXTRAEXTRALARGE='XXL', _('Extra extra large')
    itemid = models.AutoField(verbose_name='itemId', primary_key=True)
    idmodel = models.ForeignKey(Models, models.DO_NOTHING, verbose_name='idModel', default=1,related_name='stock_of_model')
    size = models.CharField(max_length=4, choices=ItemSize.choices, default=ItemSize.MEDIUM)
    amount = models.IntegerField(blank=True, null=True, default=0)
    class Meta:
        unique_together = (('idmodel', 'size'),)
    def __str__(self):
        return f'{self.idmodel.modelname} {self.size}'

class Client(models.Model):
    clientid=models.AutoField(primary_key=True)
    clientname=models.CharField(max_length=150)
    login=models.CharField(unique=True, max_length=20)
    password = models.CharField(unique=True, max_length=10)
    # current_bag=models.IntegerField(default=0)
    def __str__(self):
        return self.clientname

class State(models.Model):
    stateid=models.AutoField(primary_key=True),
    statename = models.CharField(max_length=60, unique=True)
    def __str__(self):
        return self.statename

class Bag(models.Model):
    bagid=models.AutoField(verbose_name='bagId', primary_key=True)
    idclient = models.ForeignKey(Client, models.DO_NOTHING, verbose_name='idClient', default=1, related_name='bag_client')
    # bought=models.BooleanField(blank=True, null=True, default=False)
    sum = models.IntegerField(default=0, null=False)
    bagstate=models.ForeignKey(State, models.DO_NOTHING, default=1)
    date = models.DateField(_("Date"), default=datetime.date.today)
    def __str__(self):
        return f'{self.bagid}--{self.idclient.clientname}--{self.bagstate.statename}--{self.date}'


class Purchase(models.Model):
    purchaseid=models.AutoField(primary_key=True)
    idbag = models.ForeignKey(Bag, on_delete=models.CASCADE, related_name='purchase_bag', default=1)
    idstock = models.ForeignKey(Stock,  on_delete=models.CASCADE,related_name='purchase_stock')
    quantity=models.IntegerField(blank=True, null=True, default=0)
    # bought = models.BooleanField(blank=True, null=True, default=False)
    def __str__(self):
        return f'Покупка {self.purchaseid}: {self.idstock.idmodel.modelname} {self.idstock.size} -- {self.idbag.idclient.clientname}==>{self.idbag_id}'


