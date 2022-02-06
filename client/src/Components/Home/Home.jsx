import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVideogames } from "../../Redux/Actions";
import Videogame from "../Videogame/Videogame";
import Paginado from "../Paginado/Paginado";

export default function Home() {
  const dispatch = useDispatch();

  const allVideogames = useSelector((state) => state.videogames);
  /* const [order, setOrder] = useState(""); */
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage, setVideogamesPerPage] = useState(15);
  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogames = allVideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  function handleOnClick(e) {
    e.preventDefault();
    dispatch(getVideogames());
  }

  return (
    <div>
      <Link to="/recipe">Create a Videogame</Link>
      <button
        onClick={(e) => {
          handleOnClick(e);
        }}
      >
        Cargar Videojuegos
      </button>
      <div>
        <select>
          <option>A-Z</option>
          <option>Z-A</option>
        </select>
        <select>
          <option>Más puntuada</option>
          <option>Menos puntuada</option>
        </select>
        <select>
          <option>All</option>
        </select>
      </div>
      <Paginado
        videogamesPerPage={videogamesPerPage}
        allVideogames={allVideogames.length}
        paginado={paginado}
      />
      <div>
        {currentVideogames?.map((videogame) => {
          return (
            <Videogame
              key={videogame.id}
              id={videogame.id}
              name={videogame.name}
              image={videogame.image}
              genres={videogame.genres}
            />
          );
        })}
      </div>
    </div>
  );
}
