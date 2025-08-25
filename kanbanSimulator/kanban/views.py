from .serializers import tarefaSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import * 

# Create your views here.

@api_view([ 'GET' ])
def listar_tarefa(request):
    try:
        tarefas = Tarefa.objects.all()
        serializer = tarefaSerializer(tarefas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Tarefa.DoesNotExist:
        return Response("Tarefa não existe", status=status.HTTP_404_NOT_FOUND)
    
@api_view([ 'GET' ])
def listar_tarefa_id(request, pk):
    try:
        tarefas = Tarefa.objects.get(pk=pk)
        serializer = tarefaSerializer(tarefas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except tarefas.DoesNotExist:
        return Response({'error': 'Tarefa não encontrada'}, status=status.HTTP_404_NOT_FOUND)

@api_view([ 'POST' ])
def criar_tarefa(request):
    serializer = tarefaSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

@api_view([ 'PATCH' ])
def atualizar_tarefa(request, pk):
    try:
        tarefa = Tarefa.objects.get(pk=pk)
    except Tarefa.DoesNotExist:
        return Response({'error': 'Tarefa não encontrada'}, status=status.HTTP_404_NOT_FOUND)
    serializer = tarefaSerializer(tarefa, tarefa=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

@api_view([ 'DELETE' ])
def deletar_tarefa(request, pk):
    try:
        tarefa = Tarefa.objects.get(request, pk=pk)
        tarefa.delete()
        return Response({'message': 'Tarefa deletado com Sucesso'}, status=status.HTTP_204_NO_CONTENT)
    except Tarefa.DoesNotExist:
        return Response({'error': 'Tarefa não encontrado'}, status=status.HTTP_404_NOT_FOUND)
        
