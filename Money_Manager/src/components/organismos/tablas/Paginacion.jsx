import React, { useState } from "react";
import { v } from "../../../styles/variables";
import styled from "styled-components";
import { useOperaciones } from "../../../index";
export const Paginacion = ({ pagina, setPagina, maximo }) => {
  const { bgCategoria, colorCategoria } = useOperaciones();
  const [input, setInput] = useState(1);

  const nextPage = () => {
    setInput(parseInt(input) + 1);
    setPagina(parseInt(pagina) + 1);
  };

  const previousPage = () => {
    setInput(parseInt(input) - 1);
    setPagina(parseInt(pagina) - 1);
  };
  const inicio = () => {
    setInput(1);
    setPagina(1);
  };

  return (
    <Container $bgCategoria={bgCategoria} $colorCategoria={colorCategoria}>
      <button onClick={inicio}>
        <span>{<v.iconotodos />}</span>
      </button>
      <button disabled={pagina === 1 || pagina < 1} onClick={previousPage}>
        <span className="iconoIzquierda">{<v.iconoflechaderecha />}</span>
      </button>
      <span>{input}</span>
      <p> de {Math.round(maximo)} </p>
      <button
        disabled={pagina === Math.ceil(maximo) || pagina > Math.ceil(maximo)}
        onClick={nextPage}
      >
        <span>{<v.iconoflechaderecha />}</span>
      </button>
    </Container>
  );
};