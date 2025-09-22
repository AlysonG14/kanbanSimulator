import { Header } from "../Components/Header";
import { Outlet } from "react-router-dom";

export function Inicial() {
  return (
    <>
      <Header />
      <Outlet /> {/* Uma single page que exibirá um componente */}
    </>
  );
}

export default Inicial;
