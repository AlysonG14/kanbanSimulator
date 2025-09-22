import React from "react";
import { Routes, Route } from "react-router-dom";
import Inicial from "../Paginas/Inicial";
import Quadro from "../Components/Quadro";
import Tarefa from "../Components/Tarefa";
import CadUsuário from "../Paginas/CadUsuário";

export function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<CadUsuário />} />
      <Route path="/home/" element={<Inicial />} />
      <Route path="/home/tarefa/" element={<Tarefa />} />
      <Route path="/home/quadro/" element={<Quadro />}></Route>
    </Routes>
  );
}
