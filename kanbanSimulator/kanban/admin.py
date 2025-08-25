from django.contrib import admin
from .models import *

# Register your models here.

@admin.register(Usuario)
class usuarioAdmin(admin.ModelAdmin):
    fields = ['idUsuario', 'nome', 'email']

@admin.register(Tarefa)
class tarefaAdmin(admin.ModelAdmin):
    fields = ['idTarefa', 'descricao', 'setor', 'dataCriacao', 'idUsuario']

