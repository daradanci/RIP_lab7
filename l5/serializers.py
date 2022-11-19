

from .models import *
from rest_framework import serializers
from django.db.models import Max, Min, Sum
from rest_framework.serializers import Serializer, ModelSerializer, CharField
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

class RangeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Range
        fields = ["rangeid", "rangename"]



class ModelsSerializer(serializers.ModelSerializer):
    # @classmethod
    # def setup_eager_loading(cls, queryset):
    #     queryset = queryset.only(*cls.Meta.fields)
    #     return queryset
    class Meta:
        model=Models
        fields = ["modelid", "idrange", "modelname", "idproducer", "price", "image"]



class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model=Stock
        # fields=["itemid", "idmodel", "size", "amount"]
        fields='__all__'


class ProducerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Producer
        fields = ["producerid", "producername"]

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        # fields = ["clientid", "clientname", "login", "password"]
        fields='__all__'

# class BagSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=Bag
#         fields = ["bagid", "idclient", "bought", "sum"]

class PurchaseSerializer(serializers.ModelSerializer):
    # purchase_stock=StockSerializer(read_only=True,many=True)
    # purchase_stock=serializers.SerializerMethodField()
    class Meta:
        model=Purchase
        # fields = ["purchaseid", "idbag", "idstock", "quantity"]
        # exclude=['stock']
        fields='__all__'
class PurchaseSumSerializer(serializers.ModelSerializer):
    class Meta:
        model=Models
        fields=['price']

    def to_representation(self, instance):
        print(self.context)
        # original_representation = super().to_representation(instance)
        representation = self.get_sum(instance,self.context['ID'])
        return representation

    def get_sum(self, obj, ID):
        print(ID)
        # sum=Models.objects.aggregate(Sum('price'))
        sum=Models.objects.filter(stock_of_model__purchase_stock__idbag_id=ID).aggregate(Sum('price'))

        return sum

class MinMaxSerializer(serializers.ModelSerializer):
    class Meta:
        model=Models
        fields=['price']

    def to_representation(self, instance):
        print(self.context)
        # original_representation = super().to_representation(instance)

        representation = {
            'max': self.get_max(instance,self.context['ID']),
            'min': self.get_min(instance,self.context['ID']),
        }

        return representation
    def get_max(self, obj, ID):
        print(ID)
        max=Models.objects.filter(idrange_id=ID).aggregate(Max('price'))
        return max
    def get_min(self, obj, ID):
        print(ID)
        min=Models.objects.filter(idrange_id=ID).aggregate(Min('price'))
        return min


class BagSerializer(serializers.ModelSerializer):
    class Meta:
        model=Bag
        fields='__all__'


class ExtSerializer(serializers.ModelSerializer):
    class Meta:
        model=Purchase
        # fields = ["purchaseid", "idclient", "idstock", "quantity"]
        fields = '__all__'
        depth=2


class ModelSerializerWithExtraSausage(serializers.ModelSerializer):
    class Meta:
        model = Models
        fields = '__all__'


class StockSerializerWithExtraCheese(serializers.ModelSerializer):
    idmodel = ModelSerializerWithExtraSausage(read_only = True)

    class Meta:
        model = Stock
        fields = ['itemid', 'size', 'amount', 'idmodel']



class ExtSerializerExtra(serializers.ModelSerializer):
    idstock = StockSerializerWithExtraCheese(read_only = True)

    class Meta:
        model = Purchase
        fields = ['purchaseid', 'quantity', 'idbag', 'idstock']


class CountModelsSerializer(serializers.ModelSerializer):
    class Meta:
        model=Bag
        fields='__all__'

    def to_representation(self, instance):
        print(self.context)
        # original_representation = super().to_representation(instance)

        representation = {
            'count': self.get_count(instance,self.context['ID']),
        }

        return representation
    def get_count(self, obj, ID):
        print(ID)
        # date=datetime.datetime.strptime(ID,'%Y-%m-%d')
        count=Bag.objects.filter(date=ID).count()
        return count

from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User

class UserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ['id','username', 'first_name', 'last_name', 'email', 'date_joined']

class LoginRequestSerializer(Serializer):
    model = User
    username = CharField(required=True)
    password = CharField(required=True)


# class TokenSeriazliser(ModelSerializer):
#     class Meta:
#         model = Token
#         fields = ['key']

