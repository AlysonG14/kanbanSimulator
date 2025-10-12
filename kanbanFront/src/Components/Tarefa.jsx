import React, { useEffect, useState } from "react";
import { Quadro } from "../Components/Quadro";
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

  // () recepção de parâmeros, {} scripts, [] dependências
  useEffect(() => {
    const apiURL = "http://127.0.0.1:8000/tarefa/";
    axios
      .get(apiURL)
      // se der bom, eu armazeno para que a resposta seja recebida no axios
      .then((response) => {
        // Aqui vai ser o acesso da resposta do corpo, para puxar todos os itens na tarefa
        setCriarTarefa(response.data);
      })
      .catch((error) => {
        // Caso se der erro, vamos imprimir um console para descobrir qual tipo de erro
        // Eu vou conseguir visualizar o problema no console
        console.error(`Erro: ${error}`);
      });
  }, []);

  if (criarTarefa.length === 0) return <p>Nenhuma tarefa encontrada.</p>;

  return (
    <>
      <Quadro tarefas={criarTarefa} setTarefas={setCriarTarefa} />
    </>
  );
}

<Quadro
  tarefas={criarTarefa}
  setTarefas={setCriarTarefa}
  handleStatusChange={handleStatusChange}
/>;

export default Tarefa;
