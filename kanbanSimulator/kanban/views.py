from rest_framework import generics
from .serializers import tarefaSerializer, usuarioSerializer
from .models import (Tarefa, Usuario)

# Create your views here.

class listaUsuario(generics.ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = usuarioSerializer
    
class usuarioAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = usuarioSerializer

class listaTarefa(generics.ListCreateAPIView):
    queryset = Tarefa.objects.all()
    serializer_class = tarefaSerializer
    
class tarefaAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tarefa.objects.all()
    serializer_class = tarefaSerializer
