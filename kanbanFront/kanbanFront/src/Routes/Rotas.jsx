import React from "react";
import { Routes, Route } from "react-router-dom";
import Inicial from "../Paginas/Inicial";
import Quadro from "../Components/Quadro";
import CadUsuário from "../Paginas/CadUsuário";

export function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Inicial />} />
      <Route index element={<Quadro />} />
      <Route path="CadUsuário" element={<CadUsuário />} />
    </Routes>
  );
}
