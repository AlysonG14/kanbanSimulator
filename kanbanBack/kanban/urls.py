from django.urls import path
from . import views

urlpatterns = [
    path('', views.listar_todos, name="API Overview"),
    path('usuario/', views.lista_usuario, name="Lista de Usuário"),
    path('usuario/<int:idUsuario>/', views.lista_usuario_id, name="Usuário"),
    path('usuario/criar/', views.criar_usuario, name="Criar Usuário"),
    path('usuario/atualizar/<int:idUsuario>/', views.atualizar_usuario, name="Atualizar Usuário"),
    path('usuario/deletar/<int:idUsuario>/', views.deletar_usuario, name="Deletar Usuário"),
    
    path('tarefa/', views.lista_tarefa, name="Lista de Tarefas"),
    path('tarefa/<int:idTarefa>/', views.lista_tarefa_id, name="Tarefa"),
    path('tarefa/criar/', views.criar_tarefa, name="Criar Tarefa"),
    path('tarefa/atualizar/<int:idTarefa>/', views.atualizar_tarefa, name="Atualizar Tarefa"),
    path('tarefa/deletar/<int:idTarefa>/', views.deletar_tarefa, name="Deletar Tarefa")
]