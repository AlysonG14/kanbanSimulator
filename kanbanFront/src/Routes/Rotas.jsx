import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Paginas/Home";
import Quadro from "../Components/Quadro";
import Tarefa from "../Components/Tarefa";
import CadUsuário from "../Paginas/CadUsuário";
import CadTarefas from "../Paginas/CadTarefas";
import { AtualizarTarefas } from "../Components/AtualizarTarefas";

export function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<CadUsuário />} />
      <Route path="/home/" element={<Home />} />
      <Route path="/home/cadastrar/" element={<CadTarefas />} />
      <Route path="/home/atualizar/" element={<AtualizarTarefas />}/>
    </Routes>
  );
}
