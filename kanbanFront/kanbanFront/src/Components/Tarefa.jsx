export function Tarefa({ tarefa }) {
  return (
    <article>
      <h3 id={tarefa.idTarefa}>{tarefa.descricao}</h3>
      <dl>
        <dt>Setor:</dt>
        <dd>{tarefa.setor}</dd>

        <dt>Prioridade:</dt>
        <dd>{tarefa.prioridade}</dd>
      </dl>
      <button type="submit">Editar</button>
      <button type="submit">Excluir</button>

      <form>
        <label>Status:</label>
        <select id={tarefa.idTarefa} name="status">
          <option value="">Selecione o status</option>
          <option value="Fazer">A fazer</option>
          <option value="Progredindo">Fazendo</option>
          <option value="Concluído">Concluído</option>
        </select>
        <button type="submit">Alterar Status</button>
      </form>
    </article>
  );
}

export default Tarefa;
