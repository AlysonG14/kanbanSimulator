import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ModalDeletar } from "./ModalDeletar";

// Para fazer o uso do Draggable, eu preciso usar o HOOK respectivo
// Ele precisa de 4 características
// setNodeRef -> É o que permite o reconhecimento do que vamos fazer com o DOM
// atributes -> Permite a seleção dele pelos perifericos (mouse, teclado e dedo)
// listeners -> Ouvintes aquele que estão sempre ouvindo se há algum evento
// transform -> É quem me da à sensação de movimento

export function CardTarefa({ tarefa, tarefaID, handleStatusChange }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: tarefa.idTarefa,
  });
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition: "transform 0.2s ease",
    cursor: "grab",
  };
  // navega para outra página
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/home/atualizar/${tarefaID}/`);
  };

  // alterar o estado para abrir o modal page
  const [isOpen, setIsOpen] = useState(false);
  // selecione a tarefa desejado
  const [IdTarefaSelecionada, setIdTarefaSelecionada] = useState(null);

  const [tarefas, setTarefas] = useState([]);

  // abre o modal da página de delete
  const abreModal = (idTarefa) => {
    setIsOpen(true);
    setIdTarefaSelecionada(idTarefa);
  };
  // fecha a modal da página delete
  const fecharModal = () => {
    setIsOpen(false);
    setIdTarefaSelecionada(null);
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="card-tarefas"
    >
      <h3>{tarefa.descricao}</h3>
      <h3>{tarefa.idTarefa}</h3>
      <dl>
        <dt>Setor:</dt>
        <dd>{tarefa.setor}</dd>

        <dt>Prioridade:</dt>
        <dd>{tarefa.prioridade}</dd>
      </dl>
      <button onClick={handleClick} type="button">
        Editar
      </button>
      <button onClick={() => abreModal(tarefa.idTarefa)} type="button">
        Excluir
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
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

      <ModalDeletar
        abreJanela={isOpen}
        fechaJanela={fecharModal}
        tarefaID={IdTarefaSelecionada}
      />
    </article>
  );
}

export default CardTarefa;
