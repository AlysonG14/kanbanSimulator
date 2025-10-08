import { React, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export function ModalDeletar({ abreJanela, fechaJanela, tarefaID }) {

    const [exclui, setExclui] = useState([]);

    useEffect(() => {
        const APIURL = `http://127.0.0.1:8000tarefa/deletar/${tarefaID}`
        axios
            .get(APIURL)
            .then
        setExclui((response) => { response.data })
        alert("Tarefa excluido com sucesso")
        console.log(`Tarefa excluído com sucesso: ${response.data}`)
            .catch((error) => console.error(`Erro: ${error}`))
    }, [])


    if (abreJanela) {
        return (
            <main className="z-0 left-0 right-0 top-0 bottom-0 font-semibold absolute bg-black-500/50">
                <article className="border rounded-sm items-center">
                    <h1>Tem certeza que deseja deletar?</h1>
                    <section className="flex flex-row justify-between gap-2">
                        <button onClick={exclui} className="cursor-pointer transition ease-in-out hover:scale-105 p-2 bg-purple text-white" type="submit">Sim</button>
                        <button onClick={fechaJanela} className="cursor-pointer transition ease-in-out hover:scale-105 p-2 bg-purple text-white" type="submit">Não</button>
                    </section>
                </article>
            </main>
        )
    }
}

export default ModalDeletar;