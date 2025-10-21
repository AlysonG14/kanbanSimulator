import React from "react";
import axios from "axios";

export function ModalDeletar({ abreJanela, fechaJanela, tarefaID, onExcluir }) {
  if (!abreJanela) return null;

  // encontra o id da tarefa

  async function deletarTarefa() {
    if (!tarefaID) {
      alert("ID da tarefa não encontrado");
      return;
    }

    // acessa o url para deletar

    const url = `http://127.0.0.1:8000/tarefa/deletar/${tarefaID}/`;
    console.log("URL para deletar:", url);

    // usando axios para deletar uma tarefa e a sua lógica

    try {
      const response = await axios.delete(url);
      console.log("Tarefa deletada com sucesso", response.data);
      fechaJanela();
      if (onExcluir) onExcluir(tarefaID)
      // Você pode também disparar uma atualização da lista aqui, se quiser
    } catch (error) {
      console.error(
        "Erro ao deletar tarefa:",
        error.response ? error.response.data : error.message
      );
    }
  }

  // parte onde deleta tarefas na MODAL

  return (
    <main className="container_modal">
      <article className="modal_content">
        <h1>Tem certeza que deseja deletar a tarefa {tarefaID}?</h1>
        <section className="card_btn">
          <button aria-labelledby="modal-delete-yes" tabIndex={0}  role="button" onClick={deletarTarefa}>Sim</button>
          <button aria-labelledby="modal-delete-no" tabIndex={0} role="button" onClick={fechaJanela} type="button">
            Não
          </button>
        </section>
      </article>
    </main>
  );
}

export default ModalDeletar;
