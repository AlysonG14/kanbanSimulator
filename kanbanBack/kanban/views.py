from rest_framework.response import Response # Importando response para retornar a resposta do usuário pelo servidor
from rest_framework.decorators import api_view # Importando a view para criar APIs Restful CRUD
from rest_framework import status # Importando o status HTTP para que possa hospedar o servidor quando ele responde a uma solicitação gerada 
from .serializers import tarefaSerializer, usuarioSerializer
from .models import (criarTarefa, Usuario)

# Create your views here

# -------------   VISUALIZAÇÃO DE TODAS  ---------------------

@api_view(['GET'])
def listar_todos(request):
    api_urls = {
        'admin/',
        'usuario/',
        'usuario/<int:pk>/',
        'usuario/criar/',
        'usuario/atualizar/<int:pk>/',
        'usuario/deletar/<int:pk>/',
        'tarefa/',
        'tarefa/<int:pk>/',
        'tarefa/criar/',
        'tarefa/atualizar/<int:pk>/',
        'tarefa/deletar/<int:pk>/',
    }

    return Response(api_urls)



# -------------   USUÁRIO  ---------------------

@api_view([ 'GET' ])
def lista_usuario(request):
        usuario = Usuario.objects.all()
        serializer = usuarioSerializer(usuario, many=True)
        return Response(serializer.data)
    
@api_view([ 'GET' ])
def lista_usuario_id(request, pk):
    try:
        usuario = Usuario.objects.get(pk=pk)
        serializer = usuarioSerializer(usuario, partial=True)
    except Usuario.DoesNotExist:
        return Response({'Erro': 'Usuário não Encontrada'}, status=status.HTTP_404_NOT_FOUND)
    return Response(serializer.data)

@api_view([ 'POST' ])
def criar_usuario(request):
    serializer = usuarioSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view([ 'PATCH' ])
def atualizar_usuario(request, pk):
    try:
        usuario = Usuario.objects.get(IdUsuario=pk)
    except Usuario.DoesNotExist:
        return Response({'Erro': 'Usuário não Existe'}, status=status.HTTP_404_NOT_FOUND)
    serializer = usuarioSerializer(usuario, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

@api_view([ 'DELETE' ])
def deletar_usuario(request, IdUsuario):
    try:
        usuario = Usuario.objects.get(IdUsuario=IdUsuario)
        serializer = usuarioSerializer(usuario, data=request.data)
    except Usuario.DoesNotExist:
        return Response({'Erro': 'Usuário não Existe'}, status=status.HTTP_404_NOT_FOUND)
    if not serializer.is_valid():
        usuario.delete()
        return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 



# -------------   TAREFAS  ---------------------

@api_view([ 'GET' ])
def lista_tarefa(request):
        tarefas = criarTarefa.objects.all()
        serializer = tarefaSerializer(tarefas, many=True)
        return Response(serializer.data)
    
@api_view([ 'GET' ])
def lista_tarefa_id(request, pk):
    try:
        tarefa = criarTarefa.objects.get(pk=pk)
        serializer = tarefaSerializer(tarefa, partial=True)
    except criarTarefa.DoesNotExist:
        return Response({'Erro': 'Tarefa não Encontrada'}, status=status.HTTP_404_NOT_FOUND)
    return Response(serializer.data)

@api_view([ 'POST' ])
def criar_tarefa(request):
    serializer = tarefaSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view([ 'PATCH' ])
def atualizar_tarefa(request, pk):
    try:
        tarefa = criarTarefa.objects.get(pk=pk)
    except criarTarefa.DoesNotExist:
        return Response({'Erro': 'Tarefa não Encontrada'}, status=status.HTTP_404_NOT_FOUND)
    serializer = tarefaSerializer(tarefa, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

@api_view([ 'DELETE' ])
def deletar_tarefa(request, pk):
    try:
        tarefa = criarTarefa.objects.get(pk=pk)
        serializer = tarefaSerializer(tarefa, data=request.data)
    except criarTarefa.DoesNotExist:
        return Response({'Erro': 'Tarefa não Existe'}, status=status.HTTP_404_NOT_FOUND)
    if not serializer.is_valid():
        tarefa.delete()
        return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 