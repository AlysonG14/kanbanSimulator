import { BarraNavegacao } from "../Components/BarraNavegacao";
import { Header } from "../Components/Header";

export function Inicial(){
    return(
        <>
            <BarraNavegacao />
            <Header />
            <Outlet /> {/* Uma single page que exibirá um componente */}
        </>
    )
}

export default Inicial;