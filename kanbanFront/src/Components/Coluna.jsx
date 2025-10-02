import { Tarefa } from "./Tarefa";
import { useDroppable } from "@dnd-kit/core";

export function Coluna({ id, titulo, tarefas = [] }) {
  const { setNodeRef } = useDroppable({ id });

  if (tarefas.length === 0) return <p>Nenhum quadro encontrado.</p>;
  return (
    <section ref={setNodeRef}>
      <h2>{titulo}</h2>
      {/* Manipulação de array para fazer a exibição, eu posso usar o MAP */}
      {/* Aqui percorremos todas as tarefas recebidas */}
    </section>
  );
}
