from django.shortcuts import render
from django.db.models import Max, Min, Sum
from rest_framework import viewsets, serializers, status, generics
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .models import *
from .serializers import *
from drf_multiple_model.views import ObjectMultipleModelAPIView
from django.contrib.auth import authenticate, login
from django.http import HttpResponse
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings
import uuid
# Connect to our Redis instance
# session_storage = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT)

def index(request):
    return render(request, 'index.html')


class RangeViewSet(viewsets.ModelViewSet):
    queryset = Range.objects.all().order_by('rangename')
    serializer_class = RangeSerializer

class ModelsViewSet(viewsets.ModelViewSet):
    queryset = Models.objects.all().order_by('idrange', 'modelname')
    serializer_class = ModelsSerializer

class StockViewSet(viewsets.ModelViewSet):
    queryset = Stock.objects.all().order_by('idmodel')
    serializer_class = StockSerializer

class ModelsOfTypeViewSet(viewsets.ModelViewSet):
    serializer_class = ModelsSerializer

    def get_queryset(self):
        queryset = Models.objects.filter(idrange=self.kwargs['range_pk'])
        if self.request.method=='GET':

            params=self.request.query_params.dict()
            print(params)
            # print(params['max_price'])
            if 'min_price' in params and 'max_price' in params:
                queryset = Models.objects.filter(idrange=self.kwargs['range_pk'],
                                             price__gte=params['min_price'],price__lte=params['max_price'])
            elif 'search_input' in params:
                queryset = Models.objects.filter(idrange=self.kwargs['range_pk'],
                                                 modelname__icontains=params['search_input'])
        # print(self.kwargs)
        return queryset


class TestModelsViewSet(viewsets.ModelViewSet):
    parser_classes = ModelsSerializer
    def get_queryset(self):
        queryset = Models.objects.filter(idrange=self.kwargs['range_pk'])

        return queryset


class StockOfModelViewSet(viewsets.ModelViewSet):
    serializer_class = StockSerializer
    def get_queryset(self):
        queryset = Stock.objects.filter(idmodel=self.kwargs['models_pk'], amount__gt=0)
        return queryset

class ProducerViewSet(viewsets.ModelViewSet):
    serializer_class = ProducerSerializer
    queryset = Producer.objects.all()

class ClientViewSet(viewsets.ModelViewSet):
    serializer_class = ClientSerializer
    queryset = Client.objects.all()



class PurchaseViewSet(viewsets.ModelViewSet):
    serializer_class = PurchaseSerializer
    queryset = Purchase.objects.all()


class GetMaxPrice(viewsets.ModelViewSet):
    serializer_class=ModelsSerializer
    def get_queryset(self):
        queryset=Models.objects.filter(idrange=self.kwargs['range_pk']).order_by('-price')
        # print(Models.objects.values_list('price', flat=True).filter(idrange=self.kwargs['range_pk']).order_by('-price')[0])
        # print(queryset.values()[0])
        max_price=Models.objects.values_list('price', flat=True).filter(idrange=self.kwargs['range_pk']).order_by('-price').first()
        print(max_price)
        # return Models(queryset.values()[0])
        return queryset


class GetMinMaxPrice(viewsets.ModelViewSet):

    def get_queryset(self):
        queryset=Models.objects.filter(idrange_id=self.kwargs['range_pk'])

        print(queryset)
        return queryset

    def get_serializer(self, *args, **kwargs):
        serializer_class = MinMaxSerializer
        kwargs['context'] = self.get_serializer_context()
        return serializer_class(*args, **kwargs)

    def get_serializer_context(self):
        return {
            'request': self.request,
            'format': self.format_kwarg,
            'view': self,
            'ID':self.kwargs['range_pk']
        }

class ExtViewSet(viewsets.ModelViewSet):
    serializer_class = ExtSerializer
    queryset = Purchase.objects.all()

class BagViewSet(viewsets.ModelViewSet):
    serializer_class = BagSerializer
    queryset = Bag.objects.all()


# class PurchaseOfBagViewSet(viewsets.ModelViewSet):
#     serializer_class = ExtSerializer
#     def get_queryset(self):
#         queryset = Purchase.objects.filter(idbag=self.kwargs['bag_pk'])
#         return queryset

class BagOfClientViewSet(viewsets.ModelViewSet):
    serializer_class = BagSerializer
    def get_queryset(self):
        queryset = Bag.objects.filter(idclient=self.kwargs['client_pk'], bagstate=1)
        if(len(queryset)==0):
            new_bag=Bag(sum=0, idclient_id=self.kwargs['client_pk'], bagstate_id=1)
            new_bag.save()

            client=Client.objects.get(clientid=self.kwargs['client_pk'])
            client.current_bag=new_bag.bagid
            client.save()

        else:
            for bag in queryset:
                newsum=Models.objects.filter(stock_of_model__purchase_stock__idbag_id=bag.bagid).aggregate(Sum('price'))['price__sum']
                if(len(Models.objects.filter(stock_of_model__purchase_stock__idbag_id=bag.bagid))==0):
                    newsum=0
                bag.sum=newsum
                bag.save()
        return queryset

class BagsOfClientViewSet(viewsets.ModelViewSet):
    serializer_class = BagSerializer
    def get_queryset(self):
        queryset = Bag.objects.filter(idclient=self.kwargs['client_pk']).order_by('bagstate','-date')
        return queryset


# Serializer was changed to new nested serializer
class CurrBagOfClientViewSet(viewsets.ModelViewSet):
    # serializer_class = ExtSerializer
    serializer_class = ExtSerializerExtra

    def get_queryset(self):
        queryset = Purchase.objects.filter(idbag__idclient_id=self.kwargs['client_pk'], idbag__bagstate=1)
        print(type(queryset))
        return queryset
        

class PurchaseOfBagViewSet(viewsets.ModelViewSet):
    # serializer_class = PurchaseSerializer
    serializer_class = ExtSerializer
    def get_queryset(self):
        queryset = Purchase.objects.filter(idbag__idclient_id=self.kwargs['bag_pk'])

        return queryset

class PurchaseSumViewSet(viewsets.ModelViewSet):
    # serializer_class =PurchaseSumSerializer
    def get_queryset(self):
        queryset=Models.objects.filter(modelid=1)
        print(queryset)
        return queryset

    def get_serializer(self, *args, **kwargs):
        serializer_class = PurchaseSumSerializer
        kwargs['context'] = self.get_serializer_context()
        return serializer_class(*args, **kwargs)

    def get_serializer_context(self):
        return {
            'request': self.request,
            'format': self.format_kwarg,
            'view': self,
            'ID':self.kwargs['bag_pk']
        }

class BuyBagViewSet(viewsets.ModelViewSet):
    serializer_class = BagSerializer
    def get_queryset(self):
        queryset = Bag.objects.filter(idclient=self.kwargs['client_pk'], bagstate=1)
        for bag in queryset:
            bag.bagstate_id=2
            bag.save()
        return queryset


class CountModels(viewsets.ModelViewSet):

    def get_queryset(self):
        queryset=Bag.objects.filter(bagid=1)
        print(self.kwargs)
        return queryset

    def get_serializer(self, *args, **kwargs):
        serializer_class = CountModelsSerializer
        # serializer_class=BagSerializer

        kwargs['context'] = self.get_serializer_context()
        return serializer_class(*args, **kwargs)
        # return serializer_class

    def get_serializer_context(self):
        print(123)
        print(self.kwargs)
        return {
            'request': self.request,
            'format': self.format_kwarg,
            'view': self,
            # 'ID': datetime.datetime.strptime(self.kwargs['pk'],'%Y-%m-%d')
            'ID':"2022-11-09"
            # 'ID':self.kwargs['pk']
        }


from django.contrib.auth.models import User

@api_view(['GET', 'POST'])
def getJson(request):
        if request.method == 'POST':
            # user = User.objects.create_user(request.data['username'], request.data['email'], request.data['password'])
            # user.last_name = 'Lennon'
            # user.save()
            print(request.data)
            return HttpResponse("{'status': 'ok'}")
        else:
            return HttpResponse("{'status': 'neok'}")


