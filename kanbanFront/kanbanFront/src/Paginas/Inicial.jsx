import { BarraNavegacao } from "../Components/BarraNavegacao";
import { Header } from "../Components/Header";
import { Outlet } from "react-router-dom";

export function Inicial() {
  return (
    <>
      <BarraNavegacao />
      <Header />
      <Outlet /> {/* Uma single page que exibirá um componente */}
    </>
  );
}

export default Inicial;
