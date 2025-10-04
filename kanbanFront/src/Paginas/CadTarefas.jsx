import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header";
import axios from "axios";

export function CadTarefas() {
  const [tarefas, setTarefas] = useState([]); // Essa ferramenta vai guardar as tarefas vindas do backend pelo tarefas
  const [usuarios, setUsuario] = useState([]); // Essa ferramenta vai guardar as tarefas vindas do backend pelo usuário

  useEffect(() => {
    const apiURLTarefa = "http://127.0.0.1:8000/tarefa/"; // Api de Tarefa
    const apiURLUsuario = "http://127.0.0.1:8000/usuario/"; // Api de Usuário

    const fetchTarefas = async () => {
      try {
        const respostaTarefa = await axios.get(apiURLTarefa);
        setTarefas(respostaTarefa.data);
      } catch (error) {
        console.error(`Erro ao buscar tarefas ${error}`);
      }
    };

    const fetchUsuario = async () => {
      try {
        const respostaUsuario = await axios.get(apiURLUsuario);
        setUsuario(respostaUsuario.data);
      } catch (error) {
        console.error(`Erro ao buscar usuário ${error}`);
      }
    };

    fetchTarefas();
    fetchUsuario();
  }, []);

  // para criar uma APIs, vamos implementar uma variável que terá uma requisição de POST Create

  const criarItem = async () => {
    const descricao = document.querySelector('input[name="descricao"]').value;
    const setor = document.getElementById('setor').value;
    const prioridade = document.getElementById("prioridade").value;
    const status = document.getElementById("status").value;
    const idUsuario = document.getElementById("usuario").value;
    const dataCriacao = new Date().toISOString()
    
    const novoItem = { descricao, setor, prioridade, status, idUsuario, dataCriacao };
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/tarefa/criar/",
        novoItem
      ); // post -> Cria uma API
      alert("Tarefa criada com sucesso");
      console.log("Tarefa criada:", response.data);
      setTarefas((prevTarefas) => [...prevTarefas, response.data]); // Atualiza a lista de tarefas
    } catch (error) {
      alert("Erro ao criar uma tarefa");
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

          <label htmlFor="setor">Setor:</label>
          <select id="setor">
            <option value="Setor Y">Setor Y</option>
            <option value="Setor H">Setor H</option>
            <option value="Setor F">Setor F</option>
            <option value="Setor J">Setor J</option>
          </select>

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
            {usuarios.map((usuario) => (
              <option key={usuario.idUsuario} value={usuario.idUsuario}>
                {usuario.idUsuario}- {usuario.name}
              </option>
            ))}
          </select>

          <button onClick={criarItem} type="button">
            Cadastrar Tarefa
          </button>
        </section>
      </div>
    </div>
  );
}

export default CadTarefas;
