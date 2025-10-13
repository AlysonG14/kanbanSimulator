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

export function CardTarefa({ tarefa, tarefaID, handleStatusChange }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: tarefaID,
  });
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    cursor: "grab",
  };
  // navega para outra página
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/home/atualizar/${tarefaID}/`, { state: { tarefa: tarefa } });
  };

  const [setCriarTarefa] = useState([]);

  handleStatusChange = (idTarefa, novoStatus) => {
    setCriarTarefa((prevTarefas) =>
      prevTarefas.map((tarefa) =>
        tarefa.idTarefa === idTarefa
          ? { ...tarefa, status: novoStatus }
          : tarefa
      )
    );
  };

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

  return (
    <article ref={setNodeRef} style={style} className="card-tarefas">
      <h3>{tarefa.descricao}</h3>
      <h3>ID: {tarefa.idTarefa}</h3>
      <dl {...attributes} {...listeners}>
        <dt>Setor:</dt>
        <dd>{tarefa.setor}</dd>

        <dt>Prioridade:</dt>
        <dd>{tarefa.prioridade}</dd>
      </dl>
      <button
        onClick={handleClick}
        tabIndex={0}
        type="button"
        role="button"
        onKeyDown={(e) => {
          if (e.key === "Editar" || e.key === " ") {
            alert("Clicando no Botão: Editar");
          }
        }}
      >
        Editar
      </button>
      <button
        role="dialog"
        tabIndex={0}
        onClick={() => abreModal(tarefa.idTarefa)}
        type="button"
        onKeyDown={(e) => {
          if (e.key == "Excluir" || e.key === " ") {
            alert("Clicando no botão: Excluir");
          }
        }}
      >
        {" "}
        {/* tabindex -> permite que a div recebe o foco do teclado */}
        Excluir
      </button>
      <form>
        <label>Status:</label>
        <select
          id={tarefa.idTarefa}
          name="status"
          value={tarefa.status}
          onChange={(e) => {
            handleStatusChange(tarefa.idTarefa, e.target.value);
          }}
        >
          <option value="Fazer">Fazer</option>
          <option value="Progredindo">Progredindo</option>
          <option value="Concluído">Concluído</option>
        </select>
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
