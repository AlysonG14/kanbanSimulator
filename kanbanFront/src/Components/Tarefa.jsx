import React, { useEffect, useState } from "react";
import { Quadro } from "../Components/Quadro";
import { useDraggable } from "@dnd-kit/core";
import axios from "axios";

export function Tarefa() {
  const [criarTarefa, setCriarTarefa] = useState([]);

  const handleStatusChange = (idTarefa, novoStatus) => {
    setCriarTarefa((prevTarefas) =>
      prevTarefas.map((tarefa) =>
        tarefa.idTarefa === idTarefa
          ? { ...tarefa, status: novoStatus }
          : tarefa
      )
    );
  };

  //() recepção de parâmeros, {} scripts, [] dependências
  useEffect(() => {
    const apiURL = "http://127.0.0.1:8000/tarefa/";
    axios
      .get(apiURL)
      // se der bom, eu armazeno para que a resposta seja recebida no axios
      .then((response) => {
        // Aqui vai ser o acesso da resposta do corpo, para puxar todos os itens na tarefa
        setCriarTarefa(response.data);
      })
      .catch((error) => {
        // Caso se der erro, vamos imprimir um console para descobrir qual tipo de erro
        // Eu vou conseguir visualizar o problema no console
        console.error(`Erro: ${error}`);
      });
  }, []);

  if (criarTarefa.length === 0) return <p>Nenhuma tarefa encontrada.</p>;

  // Para fazer o uso do Draggable, eu preciso usar o HOOK respectivo
  // Ele precisa de 4 características
  // setNodeRef -> É o que permite o reconhecimento do que vamos fazer com o DOM
  // atributes -> Permite a seleção dele pelos perifericos (mouse, teclado e dedo)
  // listeners -> Ouvintes aquele que estão sempre ouvindo se há algum evento
  // transform -> É quem me da à sensação de movimento
  function CardTarefa({ tarefa }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: tarefa.idTarefa.toString(),
    });
    const style = transform
      ? { transform: `translate ${transform.x}px ${transform.y}px` }
      : undefined;

    return (
      <article
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className="card-tarefas"
      >
        <header>
          <h3>{tarefa.descricao}</h3>
        </header>
        <dl>
          <dt>Setor:</dt>
          <dd>{tarefa.setor}</dd>

          <dt>Prioridade:</dt>
          <dd>{tarefa.prioridade}</dd>
        </dl>
        <button type="button">Editar</button>
        <button type="button">Excluir</button>

        <form className="card-form">
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
    );
  }

  return (
    <>
      <Quadro tarefas={criarTarefa} setTarefas={setCriarTarefa} />
      <div className="container-tarefas">
        {criarTarefa.map((tarefa) => (
          <CardTarefa key={tarefa.idTarefa} tarefa={tarefa} />
        ))}
      </div>
    </>
  );
}

export default Tarefa;
