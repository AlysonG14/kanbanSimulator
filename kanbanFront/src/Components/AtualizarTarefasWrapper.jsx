import React from "react";
import { useParams } from "react-router-dom";
import { AtualizarTarefas } from "../Paginas/AtualizarTarefas";
import { CardTarefa } from "../Components/CardTarefa";
import { useLocation } from "react-router-dom";

export function AtualizarTarefasWrapper() {
  const { tarefaID } = useParams();
  const location = useLocation();
  console.log(location.state);

  const { tarefa } = location.state;

  return (
    <>
      <AtualizarTarefas tarefaID={parseInt(tarefaID)} />
      <CardTarefa tarefa={tarefa} tarefaID={parseInt(tarefaID)} />
    </>
  );
}

export default AtualizarTarefasWrapper;
