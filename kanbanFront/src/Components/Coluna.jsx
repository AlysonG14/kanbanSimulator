import { Tarefa } from "./Tarefa";
import { useDroppable } from "@dnd-kit/core";
import { CardTarefa } from "../Components/CardTarefa";

export function Coluna({ id, titulo, tarefas = [] }) {
  const { setNodeRef } = useDroppable({ id: id });
  
  return (
    <section className="card_coluna" ref={setNodeRef} drop="true">
      <h2 className="titulo_coluna">{titulo}</h2>
      {/* Manipulação de array para fazer a exibição, eu posso usar o MAP */}
      {/* Aqui percorremos todas as tarefas recebidas */}
      {tarefas.map((tarefa) => {
        return <CardTarefa tarefaID={tarefa.idTarefa} key={tarefa.idTarefa} tarefa={tarefa} />;
      })}
    </section>
  );
}

export default Coluna;
