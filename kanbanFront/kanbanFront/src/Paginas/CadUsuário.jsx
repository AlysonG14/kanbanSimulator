// Forms para fazer a validação de um formulário usando o REACT
// zod, trabalha com mais componentes para fazer sentido na sua validação
// Os triamigos são "zod" "useForm", //resolvers (mãezona)

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

// zod -> campo a campo o que eu valido, e qual é a mensagem que eu exibo
const schemaCadUsuer = z.object({
  // o que eu recebo,
  name: z
    .string()
    .min(1, "Por favor, digite nome correto!")
    .max(30, "O campo necessita 30 linhas"),

  email: z
    .string()
    .min(1, "Por favor, insere um email válido!")
    .max(50, "O campo precisa de 50 linhas")
    .email("Insere apenas o email válido"),
});

// Criação de exportação de Componente CadUsuário,
export function CadUsuário() {
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '' 
    
  })

  const {
    register, // Registra para mim o que foi digitado
    handleSubmit, // No momento do envio
    formState: { errors }, // Se der ruim, guarda no erros
    reset, // Limpa o formulário
  } = useForm({ resolver: zodResolver(schemaCadUsuer) });

  async function obtainData(data) {
    console.log("Valor dos Dados", data);

    // chamada a API

    try {
      await axios.post("http://127.0.0.1:8000", data);
      alert("Cadastro de usuário logado com sucesso");
      reset();
      // Se der erro, mostra a mensagem de problema
    } catch (errors) {
      alert("Erro: O sistema não consegue encontrar algum usuário registrado");
      console.error("Erro:", errors);
    }
  }

  return (
    // no momento da submissão, chamo as funções
    <>
      <form className="form" onSubmit={handleSubmit(obtainData)}>
        <header>Cadastro de Usuário</header>
        <label>Nome: </label>
        <input
          type="text"
          placeholder="Ex: Alyson Pereira"
          required value={formData.nome}
          {...register("name")}
        ></input>
        {errors.name && <p>{errors.name.message}</p>}
        <label>Email: </label>
        <input
          type="email"
          placeholder="Ex: alyson45@outlook.com"
          required value={formData.email}
          {...register("email")}
        ></input>
        {errors.email && <p>{errors.email.message}</p>}
        <button type="submit">Cadastro</button>
      </form>
    </>
  );
}

export default CadUsuário;
