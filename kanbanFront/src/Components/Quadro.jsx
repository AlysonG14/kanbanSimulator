//hooks são palavras reservadas que nos ajudam a desenvolver nossas aplicações
//começou com "use" 98% de chance de ser um hook do react
//useState -> Grava o estado atual de uma variável
//useEffect -> é o estado que quer contar o que usuário precisa saber

import axios from "axios";
import { Coluna } from "./Coluna";
import { DndContext } from "@dnd-kit/core"; // Biblioteca que me fala qual é area que me permite clicar e arrastar

export function Quadro({ tarefas, setTarefas }) {
  function handleDragEnd(event) {
    const { active, over } = event;

    if (over && active) {
      const tarefaID = active.id;
      const novaColuna = over.id;

      // Atualiza o estado local
      setTarefas((prev) =>
        prev.map((tarefa) =>
          tarefa.idTarefa === parseInt(tarefaID)
            ? { ...tarefa, status: novaColuna }
            : tarefa
        )
      );

      axios
        .patch(`127.0.0.1:8000/tarefa/${tarefaID}`, {
          status: novaColuna,
        })
        .catch((err) => console.error("Houve um erro", err));
    }
  }

  // tenho 3 arrays de choices, para visualizar o status de tarefa que esteja dentro do Kanban
  const tarefasAFazer = tarefas.filter((t) => t.status === "Fazer");
  const tarefasFazendo = tarefas.filter((t) => t.status === "Progredindo");
  const tarefasConcluido = tarefas.filter((t) => t.status === "Concluído");

  if (tarefas.length === 0) return <p>Nenhuma tarefa encontrada!</p>;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <main>
        <section>
          <h1>Tarefas</h1>
          <Coluna id="Fazer" titulo="Fazer" tarefas={tarefasAFazer} />
          <Coluna
            id="Progredindo"
            titulo="Progredindo"
            tarefas={tarefasFazendo}
          />
          <Coluna
            id="Concluído"
            titulo="Concluído"
            tarefas={tarefasConcluido}
          />
        </section>
      </main>
    </DndContext>
  );
}

export default Quadro;
