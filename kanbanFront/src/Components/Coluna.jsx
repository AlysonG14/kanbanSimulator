import { ta } from "zod/v4/locales";
import { Tarefa } from "./Tarefa";

export function Coluna({ titulo, tarefas = [] }) {
  return (
    <section>
      <h2>{titulo}</h2>

      {/* Manipulação de array para fazer a exibição, eu posso usar o MAP */}
      {tarefas.map((criarTarefa) => {
        console.log("Dados", criarTarefa);
        return <Tarefa key={criarTarefa.idTarefa} tarefa={criarTarefa} />;
      })}
    </section>
  );
}
