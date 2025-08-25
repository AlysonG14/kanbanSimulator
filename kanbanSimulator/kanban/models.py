from django.db import models

# Create your models here.

class Usuario(models.Model):
    idUsuario = models.IntegerField(null=False, blank=False)
    nome = models.CharField(max_length=255, null=False, blank=False)
    email = models.CharField(max_length=255, null=False, blank=False)

    def __str__(self):
        return f"{int(self.idUsuario)} - {self.nome}"

class Meta:
    verbose_name_plural = 'Usuario'


SETOR = (
    ("Ativo", 'Ativo'),
    ("Inativo", 'Inativo'),
)

class Tarefa(models.Model):
    idTarefa = models.IntegerField(null=False, blank=False)
    descricao = models.CharField(max_length=255, null=False, blank=False)
    setor = models.CharField(choices= SETOR, max_length=7, null=False, blank=False)
    dataCriacao = models.DateTimeField(null=False, blank=False)
    idUsuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)

    def __str__(self):
        return f"{int(self.idTarefa)} - {self.setor}"

class Meta:
    verbose_name_plural = 'Tarefa'