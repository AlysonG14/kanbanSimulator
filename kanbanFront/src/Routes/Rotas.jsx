import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Paginas/Home";
import Quadro from "../Components/Quadro";
import Tarefa from "../Components/Tarefa";
import CadUsuário from "../Paginas/CadUsuário";
import CadTarefas from "../Paginas/CadTarefas";
import  AtualizarTarefasWrapper  from "../Components/AtualizarTarefasWrapper";

export function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<CadUsuário />} />
      <Route path="/home/" element={<Home />} />
      <Route path="/home/cadastrar/" element={<CadTarefas />} />
      <Route path="/home/atualizar/:tarefaID/" element={<AtualizarTarefasWrapper />}/>
    </Routes>
  );
}
