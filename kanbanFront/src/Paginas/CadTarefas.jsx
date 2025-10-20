import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function CadTarefas() {
  const [tarefas, setTarefas] = useState([]); // Essa ferramenta vai guardar as tarefas vindas do backend pelo tarefas
  const [usuarios, setUsuario] = useState([]); // Essa ferramenta vai guardar as tarefas vindas do backend pelo usuário

  // utilizar o zod para validação após criar

  const criarSchema = z.object({
    descricao: z
      .string()
      .min(2)
      .max(255)
      .nonempty("O campo da descrição é obrigatório"),
    setor: z.enum(["Administração", "Desenvolvimento Sistemas", "Tecnologia da Informação", "Indústria 4.0"]),
    prioridade: z.enum(["Alta", "Média", "Baixa"]),
    status: z.enum(["Fazer", "Progredindo", "Concluído"]),
    usuario: z.string(),
    dataCriacao: z.string(),
  });

  // validação usando o zodresolver

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(criarSchema),
  });

  // pegando os dados dos objetos pelo onsubmit

  const onSubmit = async (data) => {
    console.log(data);
  };

  useEffect(() => {
    const apiURLTarefa = "http://127.0.0.1:8000/tarefa/"; // Api de Tarefa
    const apiURLUsuario = "http://127.0.0.1:8000/usuario/"; // Api de Usuário

    // puxando os itens para criar, juntamento com axios

    const fetchTarefas = async () => {
      try {
        const respostaTarefa = await axios.get(apiURLTarefa);
        setTarefas(respostaTarefa.data);
        console.log(respostaTarefa.data);
      } catch (error) {
        console.error(`Erro ao buscar tarefas ${error}`);
      }
    }; 

    // vamos buscar o usuário, para colocar dentro do cadastramento de tarefas

    const fetchUsuario = async () => {
      try {
        const respostaUsuario = await axios.get(apiURLUsuario);
        setUsuario(respostaUsuario.data);
      } catch (error) {
        console.error(`Erro ao buscar usuário ${error}`);
      }
    };

    fetchTarefas();
    fetchUsuario();
  }, []);

  // para criar uma APIs, vamos implementar uma variável que terá uma requisição de POST Create

  // aqui, essa arrow functions vai pegar todos os elementos campos necessários para que possa criar as tarefas 
  const criarItem = async () => {
    const descricao = document.querySelector('input[name="descricao"]').value;
    const setor = document.getElementById("setor").value;
    const prioridade = document.getElementById("prioridade").value;
    const status = document.getElementById("status").value;
    const idUsuario = document.getElementById("usuario").value;
    const dataCriacao = new Date().toISOString();

    // depois disso, vamos criar outra variável de objetos, onde vai ser armazenado dentro do frontend e fazer uma requisição e ser enviado pelo backend

    const novoItem = {
      descricao,
      prioridade,
      setor,
      dataCriacao,
      status,
      idUsuario,
    };
    
    // criando modelos do backend através do post, que vem dentro do frontend

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/tarefa/criar/",
        novoItem
      ); // post -> Cria uma API
      alert("Tarefa criada com sucesso");
      console.log("Tarefa criada:", response.data);
      setTarefas((prevTarefas) => [...prevTarefas, response.data]); // Atualiza a lista de tarefas
    } catch (error) {
      alert("Erro ao criar uma tarefa");
      console.error(`Erro: ${error}`);
    }
  };

  // aqui, vai ser uma página de cadastramento de tarefas, implementando todo o contexto de validação dentro do formulário e os erros, quando o usuário digita algo errado

  return (
    <div>
      <Header />
      <div className="container-criarTarefas">
        <form onSubmit={handleSubmit(onSubmit)} className="card-criarTarefas">
          <h1>Cadastro de Tarefas</h1>
          
          <label htmlFor="descricao">Descrição: </label>
          <input
            type="text"
            name="descricao"
            {...register("descricao")}
          ></input>
          {errors.descricao && <span>{errors.descricao.message}</span>}

          <label htmlFor="setor">Setor:</label>
          <select id="setor" {...register("setor")}>
            <option value="Administração">Administração</option>
            <option value="Desenvolvimento Sistemas">Desenvolvimento Sistemas</option>
            <option value="Tecnologia da Informação">Tecnologia da Informação</option>
            <option value="Indústria 4.0">Indústria 4.0</option>
          </select>

          {errors.setor && <span>{errors.setor.message}</span>}

          <label htmlFor="prioridade">Prioridade: </label>
          <select id="prioridade" {...register("prioridade")}>
            <option value="Alta">Alta</option>
            <option value="Média">Média</option>
            <option value="Baixa">Baixa</option>
          </select>

          {errors.prioridade && <span>{errors.prioridade.message}</span>}

          <label htmlFor="status">Status: </label>
          <select id="status" {...register("status")}>
            <option value="Progredindo">Progredindo</option>
            <option value="Fazer">Fazer</option>
            <option value="Concluído">Concluído</option>
          </select>

          {errors.status && <span>{errors.status.message}</span>}

          <label htmlFor="usuario">Usuário: </label>
          <select 
          id="usuario" 
          {...register("usuario")}>
            <option value="">Selecione o Usuário: </option>
            {usuarios.map((usuario) => (
              <option key={usuario.idUsuario} value={usuario.idUsuario}>
                {usuario.idUsuario}- {usuario.name}
              </option>
            ))}
          </select>

          {errors.usuario && <span>{errors.usuario.message}</span>}

          <button onClick={criarItem} type="button">
            Cadastrar Tarefa
          </button>
        </form>
      </div>
    </div>
  );
}

export default CadTarefas;
