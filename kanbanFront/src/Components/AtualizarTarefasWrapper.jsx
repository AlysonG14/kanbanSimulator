import React from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AtualizarTarefas } from "../Paginas/AtualizarTarefas";

// useparams -> a função que pega o componente e extraia dentro de url para ser passado para outro url da página dinâmico, usando a url atual
// utilizamos esse componente para que o useparams seja usado
// uselocation -> a função que permite retorna os objetos de um url dinâmico, ou seja, ele acessa os detalhes das rotas no componente

export function AtualizarTarefasWrapper() {
  const { tarefaID } = useParams();
  const location = useLocation();
  console.log(location.state); // usando o state

  // usa o useparams para pegar o id de tarefa onde, a navegação vai localizar esse id pela url correta
  return (
    <>
      <AtualizarTarefas tarefaID={parseInt(tarefaID)} />
    </>
  );
}

export default AtualizarTarefasWrapper;
