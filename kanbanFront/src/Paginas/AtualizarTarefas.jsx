import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { id } from "zod/v4/locales";

export function AtualizarTarefas({ tarefaID }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);


  // Validação usando Zod, mesma do cadastro
  const atualizarSchema = z.object({
    descricao: z
      .string()
      .min(2)
      .max(255)
      .nonempty("O campo da descrição é obrigatório"),
    setor: z.enum(["Administração", "Desenvolvimento Sistemas", "Tecnologia da Informação", "Indústria 4.0"]),
    prioridade: z.enum(["Alta", "Média", "Baixa"]),
    status: z.enum(["Fazer", "Progredindo", "Concluído"]),
    usuario: z.union([z.string(), z.number()]),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(atualizarSchema),
  });

  useEffect(() => {
    const fetchTarefa = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/tarefa/${tarefaID}/`
        );
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
        const res = await axios.get(`http://127.0.0.1:8000/usuario/`);
        setUsuarios(res.data);
      } catch (error) {
        console.error("Erro ao buscar usuários", error);
      }
    };

    fetchUsuarios();
    fetchTarefa();
  }, [tarefaID, setValue]);

const onSubmit = async (data) => {
  const { idTarefa, ...payload } = data;

  const payloadFinal = {
    ...payload,
    usuario: Number(payload.usuario),
  };

  console.log("Payload enviado:", payloadFinal); // 👀 debug

  try {
    await axios.patch(
      `http://127.0.0.1:8000/tarefa/atualizar/${tarefaID}/`,
      payloadFinal
    );
    alert("Tarefa atualizada com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar a tarefa:", error.response?.data || error);
    alert("Erro ao atualizar a tarefa");
  }
};


  if (loading) return <p>Carregando dados da tarefa...</p>;

  return (
    <>
      <Header />
      <div className="container-atualizarTarefas">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-atualizarTarefas"
        >
          <h1>Atualizar Tarefa</h1>

          <label htmlFor="descricao">Descrição:</label>
          <input type="text" {...register("descricao")} />
          {errors.descricao && <span>{errors.descricao.message}</span>}

          <label htmlFor="setor">Setor:</label>
          <select {...register("setor")}>
            <option value="Administração">Administração</option>
            <option value="Desenvolvimento Sistemas">Desenvolvimento Sistemas</option>
            <option value="Tecnologia da Informação">Tecnologia da Informação</option>
            <option value="Indústria 4.0">Indústria 4.0</option>
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
                {usuario.idUsuario}- {usuario.name}
              </option>
            ))}
          </select>
          <button className="card_button" type="submit">Atualizar Tarefa</button>
        </form>
      </div>
    </>
  );
}

export default AtualizarTarefas;
