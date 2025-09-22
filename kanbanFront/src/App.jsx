import React from "react";
import { Header } from "./Components/Header";
import { CadUsuário } from "./Paginas/CadUsuário";
import { Quadro } from "./Components/Quadro";
import { BrowserRouter } from "react-router-dom";
import { Rotas } from "./Routes/Rotas";

// Permite a navegação na aplicação, mexendo até o endereçamento
function App() {
  return (
    <BrowserRouter>
      <Rotas />
    </BrowserRouter>
  );
}

export default App;
