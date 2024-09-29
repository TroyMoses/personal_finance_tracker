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
        fields = ['id', 'amount', 'transaction_type', 'category', 'date']

class BudgetSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transaction
        fields = ['id', 'name', 'amount', 'icon', 'date']

class IncomeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transaction
        fields = ['id', 'name', 'amount', 'date']
      
class ExpenseSerializer(serializers.ModelSerializer):
    # Use PrimaryKeyRelatedField to handle ForeignKey via ID
    budget = serializers.PrimaryKeyRelatedField(queryset=Budget.objects.all())

    class Meta:
        model = Transaction
        fields = ['id', 'name', 'amount', 'budget', 'date']