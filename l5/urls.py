from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework_nested import routers
from . import views as shop_views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


router = routers.DefaultRouter()
router.register(r'range', shop_views.RangeViewSet)
router.register(r'models', shop_views.ModelsViewSet, basename='models')
router.register(r'stock', shop_views.StockViewSet)
router.register(r'producer', shop_views.ProducerViewSet)
router.register(r'client', shop_views.ClientViewSet)
router.register(r'purchase', shop_views.PurchaseViewSet, basename='purchase')
router.register(r'state', shop_views.StateViewSet, basename='state')
router.register(r'ext', shop_views.ExtViewSet, basename='ext')
router.register(r'bag', shop_views.BagViewSet, basename='bag')
router.register(r'old_bags', shop_views.OldBagViewSet, basename='old-bag')
router.register(r'count', shop_views.CountModels, basename='count-models')
# router.register(r'add_user', shop_views.getJson.as_view(), basename='add-user')

models_router=routers.NestedDefaultRouter(router, r'range', lookup='range')
models_router.register(r'models', shop_views.ModelsOfTypeViewSet, basename='models-of-type')
# models_router.register(r'max_price', shop_views.GetMaxPrice, basename='max-price')
models_router.register(r'min_max_price', shop_views.GetMinMaxPrice, basename='min-price')
models_router.register(r'testmodels', shop_views.TestModelsViewSet, basename='test-models')
# models_router.register(r'count', shop_views.CountModels, basename='count-models')

stock_router=routers.NestedDefaultRouter(models_router, r'models', lookup='models')
stock_router.register(r'stock', shop_views.StockOfModelViewSet, basename='stock-of-model')

bag_router=routers.NestedDefaultRouter(router, r'client', lookup='client')
bag_router.register(r'bag', shop_views.BagOfClientViewSet, basename='bag-of-client')
bag_router.register(r'bags', shop_views.BagsOfClientViewSet, basename='bag-of-client')
bag_router.register(r'current_bag', shop_views.CurrBagOfClientViewSet, basename='current-bag-of-client')
bag_router.register(r'bagsales', shop_views.BagSalesOfClientViewSet, basename='bagsales')


purchase_router=routers.NestedDefaultRouter(bag_router, r'bag', lookup='bag')
purchase_router.register(r'purchase', shop_views.PurchaseOfBagViewSet, basename='purchase-of-bag')
purchase_router.register(r'sum', shop_views.PurchaseSumViewSet, basename='sum-of-bag-purchases')
purchase_router.register(r'buy', shop_views.BuyBagViewSet, basename='buy-bag')


urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', views.index, name='index'),
    path('', include(router.urls)),
    path('', include(models_router.urls)),
    path('', include(stock_router.urls)),
    path('', include(bag_router.urls)),
    path('', include(purchase_router.urls)),
    path('add_user',shop_views.getJson,name='getJson'),
    path('api/user', shop_views.user, name='user'),
    # path('api/login', shop_views.login, name='login'),
    path('api/token/obtain', TokenObtainPairView.as_view(), name='token_obtain'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('test', shop_views.test_view1, name='123')
]
# urlpatterns+=[re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]

