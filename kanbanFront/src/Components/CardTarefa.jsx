import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { useNavigate } from "react-router-dom";
import { ModalDeletar } from "./ModalDeletar";

// Para fazer o uso do Draggable, eu preciso usar o HOOK respectivo
// Ele precisa de 4 características
// setNodeRef -> É o que permite o reconhecimento do que vamos fazer com o DOM
// attributes -> Permite a seleção dele pelos perifericos (mouse, teclado e dedo)
// listeners -> Ouvintes aquele que estão sempre ouvindo se há algum evento
// transform -> É quem me da à sensação de movimento

export function CardTarefa({ tarefa, tarefaID, onExcluir }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: tarefaID,
  });
  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    cursor: "grab",
  };
  // navega para outra página
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/home/atualizar/${tarefaID}/`, { state: { tarefa: tarefa } });
  };

  // Alterar o estado do status

  // Criar uma arrow function onde permite que crie novos identificadores: idTarefa e status
  //Recebe o idTarefa (identificador da tarefa) e o novo status.

  // Usa setAtualizarStatus para atualizar o estado com base no valor anterior (prevTarefas).//

  // Faz um .map() em prevTarefas (que deveria ser um array).//

  // Dentro do map, ele encontra a tarefa com o mesmo idTarefa e cria uma nova cópia dessa tarefa com o novo status.

  // alterar o estado para abrir o modal page
  const [isOpen, setIsOpen] = useState(false);
  // selecione a tarefa desejado
  const [IdTarefaSelecionada, setIdTarefaSelecionada] = useState(null);

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

  // parte da Tarefa e todas as suas informações

  return (
    <article ref={setNodeRef} style={style} className="card_tarefas">
      <h3>{tarefa.descricao}</h3>
      <h4>ID: {tarefa.idTarefa}</h4>
      <section
        aria-label="Informações da tarefa"
        className="card_campoTarefa"
        {...attributes}
        {...listeners}
      >
        <dl className="card_descricao">
          <dt>Setor:</dt>
          <dd>{tarefa.setor}</dd>
        </dl>
        <dl className="card_descricao">
          <dt>Prioridade:</dt>
          <dd>{tarefa.prioridade}</dd>
        </dl>
        <dl className="card_descricao">
          <dt>Status:</dt>
          <dd>{tarefa.status}</dd>
        </dl>
      </section>
      <button
        aria-label="Editar tarefa"
        className="card_button"
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleClick();
        }}
      >
        Editar
      </button>
      <button
        aria-label={`Excluir tarefa ${tarefa.descricao}`}
        className="card_button"
        onClick={() => abreModal(tarefa.idTarefa)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") abreModal(tarefa.idTarefa);
        }}
      >
        {" "}
        {/* tabindex -> permite que a div recebe o foco do teclado */}
        Excluir
      </button>

      <ModalDeletar
        abreJanela={isOpen}
        fechaJanela={fecharModal}
        tarefaID={IdTarefaSelecionada}
        onExcluir={onExcluir}
      />
    </article>
  );
}

export default CardTarefa;
