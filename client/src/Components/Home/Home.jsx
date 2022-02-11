import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getVideogames,
  getGenres,
  getPlatforms,
  filterByGenre,
  filterByPlatform,
  filterByName,
  filterByScore,
} from "../../Redux/Actions";
import Videogame from "../Videogame/Videogame";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";

export default function Home() {
  const dispatch = useDispatch();

  const allVideogames = useSelector((state) => state.videogames);
  const allGenres = useSelector((state) => state.genres);
  const allPlatforms = useSelector((state) => state.platforms);
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage] = useState(15);
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
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  function handleOnClick(e) {
    e.preventDefault();
    dispatch(getVideogames());
  }

  function handleFilterGenre(e) {
    dispatch(filterByGenre(e.target.value));
  }

  function handleFilterPlatform(e) {
    dispatch(filterByPlatform(e.target.value));
  }

  function handleFilterName(e) {
    dispatch(filterByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
    return order;
  }

  function handleFilterScore(e) {
    dispatch(filterByScore(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
    return order;
  }

  return (
    <div>
      <Link to="/videogame">Create a Videogame</Link>
      <button
        onClick={(e) => {
          handleOnClick(e);
        }}
      >
        Cargar Videojuegos
      </button>
      <SearchBar />
      <div>
        <select defaultValue="default" onClick={(e) => handleFilterName(e)}>
          <option value="default" disabled>
            Order Name:
          </option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        <select defaultValue="default" onClick={(e) => handleFilterScore(e)}>
          <option value="default" disabled>
            Order Rating:
          </option>
          <option value="asc">Más puntuado</option>
          <option value="desc">Menos puntuado</option>
        </select>
        <select defaultValue="default" onClick={(e) => handleFilterGenre(e)}>
          <option value="default" disabled>
            Genres:
          </option>
          <option value="all">All</option>
          {allGenres?.map((genre) => (
            <option key={genre.name} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
        <select defaultValue="default" onClick={(e) => handleFilterPlatform(e)}>
          <option value="default" disabled>
            Platforms
          </option>
          <option value="all">All</option>
          {allPlatforms?.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
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
