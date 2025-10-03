import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { data } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

export function AtualizarTarefas({ idTarefa }) {
  const [usuario, setUsuario] = useState([]); // Essa ferramenta vai guardar as tarefas vindas do backend
  const [form, setForm] = useState({
    descricao: "",
    setor: "",
    prioridade: "",
    status: "",
    usuario: "",
    dataCriacao: "",
  });

  // Atualiza o form local
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const atualizaTarefaSchema = z.object({
    descricao: z.string(),
    setor: z.enum(['Setor F', 'Setor H', 'Setor J', 'Setor Y']), // enum -> Ele vai validar o valor selecionado 
    prioridade: z.enum(['Alta', 'Média', 'Baixa']),
    status: z.enum(['Fazer', 'Progredindo', 'Concluído']),
    usuario: z.enum(),
    dataCriacao: z.iso.datetime()
  })

  const {register, 
    handleSubmit, 
    watch, 
    formState: { errors } 
    } = useForm<FormData>({
      resolver: zodResolver
    });

    const onSubmit = (data) => {
      console.log(data);
    }

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
          setForm({
            descricao: tarefaData.descricao,
            setor: tarefaData.setor,
            prioridade: tarefaData.prioridade,
            status: tarefaData.status,
            usuario: tarefaData.idUsuario,
            dataCriacao: tarefaData.dataCriacao,
          });
        })
        .catch((error) => {
          alert(`Erro ao carregar suas tarefas: ${error}`);
          console.error(`Erro ao carregar suas tarefas: ${error}`);
        });
    }
  }, [idTarefa]);

  // para atualizar uma APIs, vamos implementar uma variável que terá uma requisição de PATCH Update

  const atualizarTarefa = async (data) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/tarefa/atualizar/${idTarefa}/`,data,
        form
      ); // atualizar -> Atualiza o APIs
      alert("Tarefa atualizado com sucesso!");
      console.log("Tarefa atualizado", response.data);
      return response.data;
    } catch (error) {
      alert(`Erro ao atualizar tarefa: ${error}`);
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
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            {...register("descricao")}
          ></input>

          <label htmlFor="setor">Setor:</label>
          <select name="setor" value={form.setor} onChange={handleChange} {...register("setor")}> {/* Também é possível validar os campos com select com o register*/}
            <option value="">Selecione o Setor:</option>
            <option value="Setor Y">Setor Y</option>
            <option value="Setor H">Setor H</option>
            <option value="Setor F">Setor F</option>
            <option value="Setor J">Setor J</option>
          </select>

          <label>Prioridade: </label>

          <select
            name="prioridade"
            value={form.prioridade}
            onChange={handleChange}
            {...register("")}
          >
            <option value="">Selecione a Prioridade:</option>
            <option value="Alta">Alta</option>
            <option value="Média">Média</option>
            <option value="Baixa">Baixa</option>
          </select>

          <label>Status: </label>

          <select name="status" value={form.status} onChange={handleChange}>
            <option value="">Selecione o Status:</option>
            <option value="Progredindo">Progredindo</option>
            <option value="Fazer">Fazer</option>
            <option value="Concluído">Concluído</option>
          </select>

          <label>Usuário: </label>

          <select name="usuario" value={form.usuario} onChange={handleChange}>
            {usuario.map((u) => (
              <option key={u.idUsuario} value={u.idUsuario}>
                {u.idUsuario}- {u.name}
              </option>
            ))}
          </select>

          <button onClick={atualizarTarefa} type="button">
            Salvar alterações
          </button>
        </form>
      </div>
    </div>
  );
}

export default AtualizarTarefas;
