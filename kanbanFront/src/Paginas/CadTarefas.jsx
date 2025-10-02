import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header";
import axios from "axios";

export function CadTarefas() {
  const [tarefas, setTarefas] = useState([]); // Essa ferramenta vai guardar as tarefas vindas do backend

  useEffect(() => {
    const apiURLTarefa = "http://127.0.0.1:8000/tarefa/"; // Api de Tarefa
    const apiURLUsuario = "http://127.0.0.1:8000/usuario/"; // Api de Usuário

    axios
      .get(apiURLTarefa && apiURLUsuario) // Ele vai pegar a requisição da tarefa e usuário

      .then((response) => {
        setTarefas(response.data);
      })

      .catch((error) => {
        console.error(`Erro: ${error}`);
      });
  }, []);

  // para criar uma APIs, vamos implementar uma variável que terá uma requisição de POST Create

  const criarItem = async (name, descricao) => {
    const novoItem = { name, descricao };
    try {
      const response = await axios.post("http://127.0.0.1:8000/tarefa/criar/"); // post -> Cria uma API
      return response.data;
    } catch (error) {
      console.error(`Erro: ${error}`);
    }
  };

  return (
    <div>
      <Header />
      <div className="container-criarTarefas">
        <section className="card-criarTarefas">
          <h1>Cadastro de Tarefas</h1>

          <label htmlFor="descricao">Descrição: </label>
          <input type="text" name="descricao"></input>

          <label htmlFor="setor">Setor: </label>
          <input type="text" name="setor"></input>

          <label htmlFor="prioridade">Prioridade: </label>

          <select id="prioridade">
            <option value="Alta">Alta</option>
            <option value="Média">Média</option>
            <option value="Baixa">Baixa</option>
          </select>

          <label htmlFor="status">Status: </label>

          <select id="status">
            <option value="Progredindo">Progredindo</option>
            <option value="Fazer">Fazer</option>
            <option value="Concluído">Concluído</option>
          </select>

          <label htmlFor="usuario">Usuário: </label>

          <select id="usuario">
            {tarefas.map((tarefa) => (
              <option key={tarefa.idTarefa} value={tarefa.name}>
                {tarefa.idUsuario}- {tarefa.name}
              </option>
            ))}
          </select>

          <button onClick={criarItem} type="button">
            Cadastrar
          </button>
        </section>
      </div>
    </div>
  );
}

export default CadTarefas;
