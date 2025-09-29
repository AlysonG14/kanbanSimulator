import { id } from "zod/v4/locales";
import { Tarefa } from "./Tarefa";
import { useDroppable } from "@dnd-kit/core";

export function Coluna({ id, titulo, tarefas = [] }) {
  const { setNodeRef } = useDroppable({ id });

  if (tarefas.length === 0) return null;
  return (
    <section ref={setNodeRef}>
      <h2>{titulo}</h2>
      {/* Manipulação de array para fazer a exibição, eu posso usar o MAP */}
      {/* Aqui percorremos todas as tarefas recebidas */}
      {tarefas.map((tarefa) => {
        <Tarefa key={tarefa.idTarefa} tarefa={tarefa} />;
      })}
    </section>
  );
}
