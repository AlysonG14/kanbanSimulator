from django.contrib import admin
from .models import *

# Register your models here.

@admin.register(Usuario)
class usuarioAdmin(admin.ModelAdmin):
    fields = ['name', 'email']

@admin.register(criarTarefa)
class tarefaAdmin(admin.ModelAdmin):
    fields = ['descricao', 'setor', 'prioridade', 'status', 'dataCriacao', 'idUsuario']

