//hooks são palavras reservadas que nos ajudam a desenvolver nossas aplicações
//começou com "use" 98% de chance de ser um hook do react
//useState -> Grava o estado atual de uma variável
//useEffect -> é o estado que quer contar o que usuário precisa saber

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Coluna } from "./Coluna";

export function Quadro(){
    const [tarefas, setTarefas] = useState([]);

    //() recepção de parâmeros, {} scripts, [] dependências
    useEffect(() => {
        const apiURL = 'http:127.0.0.1:8000/tarefa/';
        // axios faz uma requisição HTTP
        axios.get(apiURL)
        // se der bom, eu armazeno o setTarefas usando a resposta do axios
            .then(response => { setTarefas(response.data)})
        // se der ruim, eu vou conseguir visualizar o problema no console
            .catch(error => { console.error(`Erro: ${error}`) })
    }, [])

        // tenho 3 arrays de choices, para visualizar o status de tarefa que esteja dentro do Kanban
    const tarefasAFazer = tarefas.filter(tarefa=>tarefa.status === "Fazer")
    const tarefasFazendo = tarefas.filter(tarefa=>tarefa.status === "Progredindo")
    const tarefasConcluido = tarefas.filter(tarefa=>tarefa.status === "Concluído")
    

    return(
        <main>
            <h1>Quadro</h1>
            <Coluna titulo="Fazer" tarefas={tarefasAFazer} />
            <Coluna titulo="Progredindo" tarefas={tarefasFazendo} />
            <Coluna titulo="Concluído" tarefas={tarefasConcluido} /> 
        </main>
    )

}

export default Quadro;