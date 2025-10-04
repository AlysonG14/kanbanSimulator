import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export function AtualizarTarefas({ idTarefa }) {
  const [usuario, setUsuario] = useState([]); // Essa ferramenta vai guardar as tarefas vindas do backend

  const atualizaTarefaSchema = z.object({
    descricao: z
      .string()
      .min(2, "Precisa ser uma descrição bem breve")
      .max(225, "Tarefa máximo alcançado")
      .nonempty("Requer descrição"),
    setor: z.enum(["Setor F", "Setor H", "Setor J", "Setor Y"]), // enum -> Ele vai validar o valor selecionado
    prioridade: z.enum(["Alta", "Média", "Baixa"]),
    status: z.enum(["Fazer", "Progredindo", "Concluído"]),
    usuario: z.string(),
    dataCriacao: z.string().optional() // optional -> passa um campo deifinitamente opcional (sem obrigatório) 
  });

  const {
    register, // register -> Define a representação dos campos válidos para registrar
    handleSubmit, // handleSumit ->
    formState: { errors }, // Erros -> Vai mostrar o erro
    reset,
  } = useForm({ 
    resolver: zodResolver(atualizaTarefaSchema),
    defaultValues: {
    descricao: "",
    setor: "",
    prioridade: "",
    status: "",
    usuario: "",
    dataCriacao: "",
    },
   }); // Ele define uma validação de esquemas do ZOD
  // e bibliotecas de gerenciamento de formulários como React Hook Form

  // Aqui vai ser a parte da model de usuário, para poder selecionar qual usuário tem no backend
  useEffect(() => {
    axios
      // APIs de Usuário
      .get("http://127.0.0.1:8000/usuario/") // Ele vai pegar a requisição de usuário
      .then((response) => {
        setUsuario(response.data);
      })
      .catch((error) => {
        console.error(`Erro: ${error}`);
      });
  }, []);

  // Buscar dados para tarefa de edição

  useEffect(() => {
    if (idTarefa) {
      axios
        .get(`http://127.0.0.1:8000/tarefa/${idTarefa}/`)
        .then((response) => {
          const tarefaData = response.data;
          reset({
            descricao: tarefaData.descricao,
            setor: tarefaData.setor,
            prioridade: tarefaData.prioridade,
            status: tarefaData.status,
            usuario: String(tarefaData.idUsuario),
            dataCriacao: tarefaData.dataCriacao,

          });
        })
        .catch((error) => {
          alert(`Erro ao carregar suas tarefas: ${error}`);
          console.error(`Erro ao carregar suas tarefas: ${error}`);
        });
    }
  }, [idTarefa, reset]);

  // Vamos criar uma variável que chama todos os campos selecionados através do parâmetro

  // para atualizar uma APIs, vamos implementar uma variável que terá uma requisição de PATCH Update

  // Você cria uma estrutura de dados que irá direcionar para consumi-lo e acessar
  const onSubmit = async (data) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/tarefa/atualizar/${idTarefa}/`,
        data,
      ); // atualizar -> Atualiza o APIs
      alert("Tarefa atualizado com sucesso!");
      console.log("Tarefa atualizado", response.data);
    } catch (error) {
      alert(`Erro ao atualizar tarefa`);
      console.error(`Erro ao atualizar tarefa: ${error}`);
    }
  };

  return (
    <div>
      <Header />
      <div className="container-criarTarefas">
        <form onSubmit={handleSubmit(onSubmit)} className="card-criarTarefas">
          <h1>Atualizar Tarefas</h1>

          <label htmlFor="descricao">Descrição: </label>
          <input
            type="text"
            {...register("descricao")} // ... -> props - se refere a "propriedades" ou "objetos de cena"
          ></input>
          {errors.descricao && <span>{errors.descricao.message}</span>}

          <label htmlFor="setor">Setor:</label>
          <select
            {...register("setor")}
          >
            {" "}
            {/* Também é possível validar os campos com select com o register*/}
            <option value="">Selecione o Setor:</option>
            <option value="Setor Y">Setor Y</option>
            <option value="Setor H">Setor H</option>
            <option value="Setor F">Setor F</option>
            <option value="Setor J">Setor J</option>
          </select>

          {errors.setor && <span>{errors.setor.message}</span>}

          <label>Prioridade: </label>

          <select
            {...register("prioridade")}
          >
            <option value="">Selecione a Prioridade:</option>
            <option value="Alta">Alta</option>
            <option value="Média">Média</option>
            <option value="Baixa">Baixa</option>
          </select>

          {errors.prioridade && <span>{errors.prioridade.message}</span>}

          <label>Status: </label>

          <select
            {...register("status")}
          >
            <option value="">Selecione o Status:</option>
            <option value="Progredindo">Progredindo</option>
            <option value="Fazer">Fazer</option>
            <option value="Concluído">Concluído</option>
          </select>

          {errors.status && <span>{errors.status.message}</span>}

          <label>Usuário: </label>

          <select
            {...register("usuario")}
          >
            {usuario.map((u) => (
              <option key={u.idUsuario} value={u.idUsuario}>
                {u.idUsuario}- {u.name}
              </option>
            ))}
          </select>

          {errors.usuario && <span>{errors.usuario.message}</span>}

          <button type="submit">
            Salvar alterações
          </button>
        </form>
      </div>
    </div>
  );
}

export default AtualizarTarefas;
