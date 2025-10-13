import React from "react";
import axios from "axios";

export function ModalDeletar({ abreJanela, fechaJanela, tarefaID }) {
  if (!abreJanela) return null;

  async function deletarTarefa() {
    if (!tarefaID) {
      alert("ID da tarefa não encontrado");
      return;
    }

    const url = `http://127.0.0.1:8000/tarefa/deletar/${tarefaID}/`;
    console.log("URL para deletar:", url);

    try {
      const response = await axios.delete(url);
      console.log("Tarefa deletada com sucesso", response.data);
      fechaJanela();
      // Você pode também disparar uma atualização da lista aqui, se quiser
    } catch (error) {
      console.error(
        "Erro ao deletar tarefa:",
        error.response ? error.response.data : error.message
      );
    }
  }

  return (
    <main className="container_modal">
      <article className="modal_content">
        <h1>Tem certeza que deseja deletar a tarefa {tarefaID}?</h1>
        <section className="card_btn">
          <button onClick={deletarTarefa}>Sim</button>
          <button onClick={fechaJanela} type="button">
            Não
          </button>
        </section>
      </article>
    </main>
  );
}

export default ModalDeletar;
