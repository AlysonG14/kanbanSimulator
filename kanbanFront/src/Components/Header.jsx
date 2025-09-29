import React from "react";
import { Link } from "react-router-dom";


export function Header() {
  return (
    <header className="container">
      <h1 className="title">Gerenciamento de Tarefas</h1>
          <nav className="barra">
            <ul>
              <li><Link to="/">Cadastro de Usuário </Link> </li>
              <li><Link to="/home/cadastrarTarefa/">Cadastro de Tarefas </Link> </li>
              <li><Link to="/home/"> Gerenciamento de Tarefas </Link> </li>
            </ul>
          </nav>
    </header>
  );
}

export default Header;
