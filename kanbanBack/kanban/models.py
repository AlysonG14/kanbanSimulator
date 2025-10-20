from django.db import models

# Create your models here.

class Usuario(models.Model):
    idUsuario = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, null=False, blank=False)
    email = models.EmailField(unique=True)

    def __str__(self):
        return f"{int(self.idUsuario)} - {self.name}"

class Meta:
    verbose_name_plural = 'Usuario'


SETOR = (
    ("Administração", 'Administração'),
    ("Desenvolvimento Sistemas", 'Desenvolvimento Sistemas'),
    ("Tecnologia da Informação", 'Tecnologia da Informação'),
    ("Indústria 4.0", 'Indústria 4.0'),
)

STATUS = (
    ("Progredindo", "Progredindo"),
    ("Fazer", "Fazer"),
    ("Concluído", "Concluído"),
    
)

PRIORIDADE = (
    ("Alta", "Alta"),
    ("Média", "Média"),
    ("Baixa", "Baixa"),
)

class criarTarefa(models.Model):
    idTarefa = models.AutoField(primary_key=True, blank=False, null=False)
    descricao = models.CharField(max_length=255, null=False, blank=False)
    prioridade = models.CharField(choices=PRIORIDADE, max_length=6, null=False, blank=False)
    setor = models.CharField(choices= SETOR, max_length=24, null=False, blank=False)
    dataCriacao = models.DateTimeField(null=False, blank=False)
    status = models.CharField(choices=STATUS, max_length=11, null=False, blank=False)
    idUsuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)

    def __str__(self):
        return f"{int(self.idTarefa)} - {self.setor}"

class Meta:
    verbose_name_plural = 'Tarefa'