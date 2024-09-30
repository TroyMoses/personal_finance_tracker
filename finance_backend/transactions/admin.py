from django.contrib import admin
from .models import Transaction, Category

# Register the Transaction model
@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'amount', 'transaction_type', 'category', 'date')
    search_fields = ('user__username', 'category__name', 'transaction_type')

# Register the Category model
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)
