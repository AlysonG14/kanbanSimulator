import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Header } from "../Components/Header";
import { describe, expect } from "vitest";

describe("Componente Cabecalho", () => {
  it("Renderize o título", () => {
    render(<Header />);
    expect(screen.getByText("Gerenciamento de Tarefas")).toBeInTheDocument();
  });

  it("usa a classe correta", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass();
  });
});
