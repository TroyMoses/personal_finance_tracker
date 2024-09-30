from rest_framework import serializers
from .models import Transaction, Category, Budget, Income, Expense

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class TransactionSerializer(serializers.ModelSerializer):
    # Use PrimaryKeyRelatedField to handle ForeignKey via ID
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())

    class Meta:
        model = Transaction
        fields = ['id', 'amount', 'transaction_type', 'category']

class BudgetSerializer(serializers.ModelSerializer):

    class Meta:
        model = Budget
        fields = ['id', 'name', 'amount', 'icon']

class IncomeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Income
        fields = ['id', 'name', 'amount']
      
class ExpenseSerializer(serializers.ModelSerializer):
    # Use PrimaryKeyRelatedField to handle ForeignKey via ID
    budget = serializers.PrimaryKeyRelatedField(queryset=Budget.objects.all())

    class Meta:
        model = Expense
        fields = ['id', 'name', 'amount', 'budget']