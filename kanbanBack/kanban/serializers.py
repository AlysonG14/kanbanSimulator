from rest_framework import serializers
from .models import *

class usuarioSerializer(serializers.ModelSerializer):
    class Meta:
        models = Usuario
        fields = '__all__'

class tarefaSerializer(serializers.ModelSerializer):
    class Meta:
        models = Tarefa
        fields = '__all__'