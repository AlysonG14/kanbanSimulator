import React from "react";
import { Link } from "react-router-dom";

// componente header

export function Header() {
  return (
    <header className="container">
      <h1 className="title">Gerenciamento de Tarefas</h1>
          <nav className="barra">
            <ul>
              <li><a href="/">Cadastro de Usuário </a> </li>
              <li><a href="/home/cadastrar/">Cadastro de Tarefas </a> </li>
              <li><a href="/home/"> Gerenciamento de Tarefas </a> </li>
            </ul>
          </nav>
    </header>
  );
}

export default Header;
