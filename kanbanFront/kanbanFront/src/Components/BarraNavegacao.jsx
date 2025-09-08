import React from "react";
import { Link } from "react-router-dom";

export function BarraNavegacao() {
  return (
    <nav className="barra">
      <ul>
        <li><Link to="/cadUsuário">Cadastro de Usuário </Link> </li>
        <li>Cadastro de Tarefas</li>
        <li> <Link to=""> Gerenciamento de Tarefas </Link> </li>
      </ul>
    </nav>
  );
}
