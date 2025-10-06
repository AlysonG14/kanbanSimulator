import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function AtualizarTarefas({ idTarefa }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Validação usando Zod, mesma do cadastro
  const atualizarSchema = z.object({
    idTarefa: z.number(),
    descricao: z.string().min(2).max(255).nonempty("O campo da descrição é obrigatório"),
    setor: z.enum(["Setor F", "Setor H", "Setor J", "Setor Y"]),
    prioridade: z.enum(["Alta", "Média", "Baixa"]),
    status: z.enum(["Fazer", "Progredindo", "Concluído"]),
    usuario: z.string(),
    dataCriacao: z.string(),
  });

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(atualizarSchema),
  });

  useEffect(() => {
    const fetchTarefa = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/tarefa/${idTarefa}/`);
        const tarefa = res.data;
        // Preenche os campos do formulário com os dados recebidos
        setValue("idTarefa", tarefa.idTarefa);
        setValue("descricao", tarefa.descricao);
        setValue("setor", tarefa.setor);
        setValue("prioridade", tarefa.prioridade);
        setValue("status", tarefa.status);
        setValue("usuario", tarefa.usuario);
        setValue("dataCriacao", tarefa.dataCriacao);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar a tarefa", error);
      }
    };

    const fetchUsuarios = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/usuario/");
        setUsuarios(res.data);
      } catch (error) {
        console.error("Erro ao buscar usuários", error);
      }
    };

    fetchUsuarios();
    fetchTarefa();
  }, [idTarefa, setValue]);

  const onSubmit = async (data) => {
    try {
      // Supondo que sua API espera um PUT para atualizar
      await axios.put(`http://127.0.0.1:8000/tarefa/atualizar/${idTarefa}/`, data);
      alert("Tarefa atualizada com sucesso!");
    } catch (error) {
      alert("Erro ao atualizar a tarefa");
      console.error(error);
    }
  };

  if (loading) return <p>Carregando dados da tarefa...</p>;

  return (
    <div>
      <Header />
      <div className="container-atualizarTarefas">
        <form onSubmit={handleSubmit(onSubmit)} className="card-atualizarTarefas">
          <h1>Atualizar Tarefa</h1>

          <label htmlFor="idTarefa">ID:</label>
          <input type="number" {...register("idTarefa")} disabled />

          <label htmlFor="descricao">Descrição:</label>
          <input type="text" {...register("descricao")} />
          {errors.descricao && <span>{errors.descricao.message}</span>}

          <label htmlFor="setor">Setor:</label>
          <select {...register("setor")}>
            <option value="Setor Y">Setor Y</option>
            <option value="Setor H">Setor H</option>
            <option value="Setor F">Setor F</option>
            <option value="Setor J">Setor J</option>
          </select>

          <label htmlFor="prioridade">Prioridade:</label>
          <select {...register("prioridade")}>
            <option value="Alta">Alta</option>
            <option value="Média">Média</option>
            <option value="Baixa">Baixa</option>
          </select>

          <label htmlFor="status">Status:</label>
          <select {...register("status")}>
            <option value="Fazer">Fazer</option>
            <option value="Progredindo">Progredindo</option>
            <option value="Concluído">Concluído</option>
          </select>

          <label htmlFor="usuario">Usuário:</label>
          <select {...register("usuario")}>
            <option value="">Selecione o Usuário</option>
            {usuarios.map((usuario) => (
              <option key={usuario.idUsuario} value={usuario.idUsuario}>
                {usuario.idUsuario} - {usuario.name}
              </option>
            ))}
          </select>

          <button type="submit">Atualizar Tarefa</button>
        </form>
      </div>
    </div>
  );
}

export default AtualizarTarefas;
