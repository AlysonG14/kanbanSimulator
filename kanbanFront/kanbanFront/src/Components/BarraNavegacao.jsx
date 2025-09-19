import React from "react";
import { Link } from "react-router-dom";

export function BarraNavegacao() {
  return (
    <nav className="barra">
      <ul>
        <li><Link to="/">Cadastro de Usuário </Link> </li>
        <li><Link to="/home/tarefa/"></Link> Cadastro de Tarefas</li>
        <li><Link to="/home/"> Gerenciamento de Tarefas </Link> </li>
      </ul>
    </nav>
  );
}
