from django.urls import path
from . import views

urlpatterns = [
    path('usuario/', views.listaUsuario.as_view(), name="Lista de Usuário"),
    path('usuario/CRUD/', views.usuarioAPI.as_view(), name="CRUD Usuário"),
    path('tarefa/', views.listaTarefa.as_view(), name='Lista de Tarefas'),
    path('tarefa/CRUD/', views.tarefaAPI.as_view(), name="CRUD Tarefa"),
]