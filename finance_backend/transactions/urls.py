from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import TransactionViewSet, CategoryViewSet, signup

router = DefaultRouter()
router.register('transactions', TransactionViewSet, basename='transaction')
router.register('categories', CategoryViewSet, basename='category')

urlpatterns = [
    path('', include(router.urls)),
    path('signup/', signup, name='signup')
]
