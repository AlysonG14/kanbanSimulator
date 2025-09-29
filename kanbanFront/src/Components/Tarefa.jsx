import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header";
import axios from "axios";

export function Tarefa() {
  const [criarTarefa, setCriarTarefa] = useState([]);

  const handleStatusChange = (idTarefa, novoStatus) => {
    setCriarTarefa((prevTarefas) =>
      prevTarefas.map((tarefa) =>
        tarefa.idTarefa === idTarefa
          ? { ...tarefa, status: novoStatus }
          : tarefa
      )
    );
  };

  useEffect(() => {
    const apiURL = "http://127.0.0.1:8000/tarefa/";
    axios
      .get(apiURL)
      .then((response) => {
        // Aqui vai ser o acesso da resposta do corpo, para puxar todos os itens na tarefa
        setCriarTarefa(response.data);
      })
      .catch((error) => {
        // Caso se der erro, vamos imprimir um console para descobrir qual tipo de erro
        console.error(`Erro: ${error}`);
      });
  }, []);

  if (criarTarefa.length === 0) return null;
  return (
    <>
      <Header />
      <div className="container-tarefas">
        {criarTarefa.map((tarefa) => (
          <article key={tarefa.idTarefa} className="card-tarefas">
            <h3>{tarefa.descricao}</h3>
            <dl>
              <dt>Setor:</dt>
              <dd>{tarefa.setor}</dd>

              <dt>Prioridade:</dt>
              <dd>{tarefa.prioridade}</dd>
            </dl>
            <button type="button">Editar</button>
            <button type="button">Excluir</button>

            <form className="card-form">
              <label>Status:</label>
              <select
                id={tarefa.idTarefa}
                name="status"
                value={tarefa.status}
                onChange={(e) => {
                  handleStatusChange(tarefa.idTarefa, e.target.value);
                }}
              >
                <option value="">Selecione o status</option>
                <option value="Fazer">Fazer</option>
                <option value="Progredindo">Progredindo</option>
                <option value="Concluído">Concluído</option>
              </select>
              <button type="submit">Alterar Status</button>
            </form>
          </article>
        ))}
      </div>
    </>
  );
}

export default Tarefa;
