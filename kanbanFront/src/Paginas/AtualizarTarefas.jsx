import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// usando o usestate para atulizar o usuário e a página de carregamento, para quando o usuário vai perceber que o browser irá demorar para carregar todas as tarefas

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
    setor: z.enum([
      "Administração",
      "Desenvolvimento Sistemas",
      "Tecnologia da Informação",
      "Indústria 4.0",
    ]),
    prioridade: z.enum(["Alta", "Média", "Baixa"]),
    status: z.enum(["Fazer", "Progredindo", "Concluído"]),
    usuario: z.union([z.string(), z.number()]),
  });


  // usando a validação do hook-form-react usando o zodresolver para formulário
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(atualizarSchema),
  });

  // usando o useeffect para quando o usuário atualizar consistêntemente o quanto ele quiser, pegando todo dict para armazenar e atualizar os dados entre tarefaid e mudar o setvalue


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

    // puxando o usuário dentro do backend para frontend, para buscar o usuário e atualizar

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

  // usando o payload com idtarefa para buscar dados e enviar payload final

  // obter dados

  const onSubmit = async (data) => {
    const { idTarefa, ...payload } = data;

    // payload

    const payloadFinal = {
      ...payload,
      usuario: Number(payload.usuario),
    };

    console.log("Payload enviado:", payloadFinal); // 👀 debug do payload

    // vamos usar o axios para atualizar as tarefas juntamento com o payload para alterar e atualizar os dados obtidos dentro do frontend para enviar pelo backend

    try {
      await axios.patch(
        `http://127.0.0.1:8000/tarefa/atualizar/${tarefaID}/`,
        payloadFinal
      );
      alert("Tarefa atualizada com sucesso!");
    } catch (error) {
      console.error(
        "Erro ao atualizar a tarefa:",
        error.response?.data || error
      );
      alert("Erro ao atualizar a tarefa");
    }
  };

  // usando o loading, caso se o browser estiver um tempo estimativo dependendo da qualidade cpu do usuário pelo monitor

  if (loading) return <p>Carregando dados da tarefa...</p>;
  
  // aqui, vai ser uma página de atualização de tarefas, implementando todo o contexto de validação dentro do formulário
  
  return (
    <>
      <Header />
      <div className="container-atualizarTarefas">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-atualizarTarefas"
        >
          <h1>Atualizar Tarefa</h1>

          <section className="card_campos">
            <label htmlFor="idTarefa">ID:</label>
            <input
            aria-label="id"
            aria-disabled={true}
            className="input_descricao"
            type="int"
            disabled={true}
            {...register("idTarefa")}>
            </input>

            <label htmlFor="descricao">Descrição:</label>
            <input
              aria-label="descricao"
              className="input_descricao"
              type="text"
              {...register("descricao")}
            />
            {errors.descricao && <span>{errors.descricao.message}</span>}

            <label htmlFor="setor">Setor:</label>
            <select aria-label="setor" {...register("setor")}>
              <option value="Administração">Administração</option>
              <option value="Desenvolvimento Sistemas">
                Desenvolvimento Sistemas
              </option>
              <option value="Tecnologia da Informação">
                Tecnologia da Informação
              </option>
              <option value="Indústria 4.0">Indústria 4.0</option>
            </select>

            <label htmlFor="prioridade">Prioridade:</label>
            <select aria-label="prioridade" {...register("prioridade")}>
              <option value="Alta">Alta</option>
              <option value="Média">Média</option>
              <option value="Baixa">Baixa</option>
            </select>

            <label htmlFor="status">Status:</label>
            <select aria-label="status" {...register("status")}>
              <option value="Fazer">Fazer</option>
              <option value="Progredindo">Progredindo</option>
              <option value="Concluído">Concluído</option>
            </select>

            <label htmlFor="usuario">Usuário:</label>
            <select aria-label="usuario" {...register("usuario")}>
              <option value="">Selecione o Usuário:</option>
              {usuarios.map((usuario) => (
                <option key={usuario.idUsuario} value={usuario.idUsuario}>
                  {usuario.idUsuario}- {usuario.name}
                </option>
              ))}
            </select>
          </section>
          <button className="card_button_atualiza" type="submit">
            Atualizar Tarefa
          </button>
        </form>
      </div>
    </>
  );
}

export default AtualizarTarefas;
