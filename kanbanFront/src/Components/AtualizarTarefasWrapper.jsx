import React from "react";
import { useParams } from "react-router-dom";
import { AtualizarTarefas } from "../Components/AtualizarTarefas";
import { CardTarefa } from "../Components/CardTarefa";

export function AtualizarTarefasWrapper() {
  const { tarefaID } = useParams();

  return (
    <>
      <AtualizarTarefas tarefaID={parseInt(tarefaID)} />
      <CardTarefa tarefaID={parseInt(tarefaID)} />
    </>
  );
}

export default AtualizarTarefasWrapper;
