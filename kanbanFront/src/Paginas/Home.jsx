import { Header } from "../Components/Header";
import { Tarefa } from "../Components/Tarefa";
import { Outlet } from "react-router-dom";

export function Inicial() {
  return (
    <>
      <Header />
      <Tarefa />
      <Outlet /> {/* Uma single page que exibirá um componente */}
    </>
  );
}

export default Inicial;
