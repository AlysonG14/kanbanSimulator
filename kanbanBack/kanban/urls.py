from django.urls import path
from . import views

urlpatterns = [
    path('', views.listar_todos, name="API Overview"),
    path('usuario/', views.lista_usuario, name="Lista de Usuário"),
    path('usuario/<int:pk>/', views.lista_usuario_id, name="Usuário"),
    path('usuario/criar/', views.criar_usuario, name="Criar Usuário"),
    path('usuario/atualizar/<int:pk>/', views.atualizar_usuario, name="Atualizar Usuário"),
    path('usuario/deletar/<int:pk>/', views.deletar_usuario, name="Deletar Usuário"),
    
    path('tarefa/', views.lista_tarefa, name="Lista de Tarefas"),
    path('tarefa/<int:pk>/', views.lista_tarefa_id, name="Tarefa"),
    path('tarefa/criar/', views.criar_tarefa, name="Criar Tarefa"),
    path('tarefa/atualizar/<int:pk>/', views.atualizar_tarefa, name="Atualizar Tarefa"),
    path('tarefa/deletar/<int:pk>/', views.deletar_tarefa, name="Deletar Tarefa")
]