import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Paginas/Home";
import Quadro from "../Components/Quadro";
import Tarefa from "../Components/Tarefa";
import CadUsuário from "../Paginas/CadUsuário";
import CadTarefas from "../Paginas/CadTarefas";

export function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<CadUsuário />} />
      <Route path="/home/" element={<Home />} />
      <Route path="/home/cadastrarTarefa/" element={<CadTarefas />} />
    </Routes>
  );
}
