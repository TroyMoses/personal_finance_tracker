from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import TransactionViewSet, CategoryViewSet, signup, CustomAuthToken, get_user_info

router = DefaultRouter()
router.register('transactions', TransactionViewSet, basename='transaction')
router.register('categories', CategoryViewSet, basename='category')
router.register('budgets', BudgetViewSet, basename='budget')
router.register('incomes', IncomeViewSet, basename='income')
router.register('expenses', ExpenseViewSet, basename='expense')

urlpatterns = [
    path('', include(router.urls)),
    path('signup/', signup, name='signup'),
    path('login/', CustomAuthToken.as_view(), name='login'),
    path('user-info/', get_user_info, name='get_user_info'),
]
