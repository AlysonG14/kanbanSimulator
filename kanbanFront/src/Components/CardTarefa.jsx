import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { useNavigate } from "react-router-dom";

// Para fazer o uso do Draggable, eu preciso usar o HOOK respectivo
// Ele precisa de 4 características
// setNodeRef -> É o que permite o reconhecimento do que vamos fazer com o DOM
// atributes -> Permite a seleção dele pelos perifericos (mouse, teclado e dedo)
// listeners -> Ouvintes aquele que estão sempre ouvindo se há algum evento
// transform -> É quem me da à sensação de movimento
export function CardTarefa({ tarefa, handleStatusChange, tarefaID}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: tarefa.idTarefa,
  });
  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;
    
    const handleClick = () => {
      navigate(`/home/atualizar/${tarefaID}/`);
    };
    const navigate = useNavigate();
    
  return (
    <main>
      <article
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className="card-tarefas"
      >
        <header>
          <h3>{tarefa.descricao}</h3>
          <h3>{tarefa.idTarefa}</h3>
        </header>
        <dl>
          <dt>Setor:</dt>
          <dd>{tarefa.setor}</dd>

          <dt>Prioridade:</dt>
          <dd>{tarefa.prioridade}</dd>
        </dl>
        <button onClick={handleClick} type="button">
          Editar
        </button>
        <button type="button">Excluir</button>

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
            <option value="">Selecione o status</option>
            <option value="Fazer">Fazer</option>
            <option value="Progredindo">Progredindo</option>
            <option value="Concluído">Concluído</option>
          </select>
          <button type="submit">Alterar Status</button>
        </form>
      </article>
    </main>
  );
}

export default CardTarefa;
