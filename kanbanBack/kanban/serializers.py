from rest_framework import serializers
from .models import (Usuario, criarTarefa)

class usuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class tarefaSerializer(serializers.ModelSerializer):
    class Meta:
        model = criarTarefa
        fields = ['descricao', 'prioridade', 'setor', 'status', 'idUsuario', 'dataCriacao', 'idTarefa']