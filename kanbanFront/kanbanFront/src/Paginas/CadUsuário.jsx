import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schemaCadUsuer = z.object({
  name: z
    .string()
    .min(1, "Please, insert the value name valid!")
    .max(30, "The field needs 30 length"),

  email: z
    .string()
    .min(1, "Please, insert the value email valid!")
    .max(50, "The field needs 50 length")
    .email("Insert only email valid!"),
});

export function CadUsuário() {
  const {
    register, // Registra para mim o que foi digitado
    handleSubmit, // No momento do envio
    formStatus: { errors }, // Se der ruim, guarda no erros
    reset, // Limpa o formulário
  } = useForm({ resolver: zodResolver(schemaCadUsuer) });

  async function obtainData(data) {
    console.log("Data insert", data);

    try {
      await axios.post("http://127.0.0.1:8000", data);
      alert("Register user with success!");
      reset();
    } catch (errors) {
      alert(
        "Error: The system can't find the User Register, please, try again!"
      );
      console.error("Bad error:", errors);
    }
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit(obtainData)}>
        <header>User Register</header>
        <label>Name: </label>
        <input
          type="text"
          placeholder="Ex: Alyson Pereira"
          required
          {...register("name")}
        ></input>
        {errors.name && <p>{errors.name.message}</p>}
        <label>Email: </label>
        <input
          type="email"
          placeholder="Ex: alyson45@outlook.com"
          required
          {...register("email")}
        ></input>
        {errors.email && <p>{errors.email.message}</p>}
        <button type="submit">Register</button>
      </form>
    </>
  );
}

export default CadUsuário;
