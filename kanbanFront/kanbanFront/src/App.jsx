import React from "react";
import { Header } from "./Components/Header";
import { BarraNavegacao } from "./Components/BarraNavegacao";
import { CadUsuário } from "./Paginas/CadUsuário";

function App() {
  return (
    <>
      <Header />
      <BarraNavegacao />  
      <CadUsuário />
    </>
  )
}

export default App
