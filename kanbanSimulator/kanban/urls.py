from django.urls import path
from . import views

urlpatterns = [
    path('tarefa', views.listar_tarefa, name='Lista de Tarefas'),
    path('tarefa/<int:pk>', views.listar_tarefa_id, name='Tarefa'),
    path('tarefa/criar', views.criar_tarefa, name='Criar Tarefa'),
    path('tarefa/atualizar/<int:pk>', views.atualizar_tarefa, name='Atualizar Tarefa'),
    path('tarefa/deletar/<int:pk>', views.deletar_tarefa, name='Deletar Tarefa'),
]