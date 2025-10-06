import React from "react";
import { useParams } from "react-router-dom";
import { AtualizarTarefas } from "../Components/AtualizarTarefas";

export function AtualizarTarefasWrapper() {
  const { tarefaID } = useParams();

  return (
    <>
      <AtualizarTarefas tarefaID={parseInt(tarefaID)} />
    </>
  );
}

export default AtualizarTarefasWrapper;
