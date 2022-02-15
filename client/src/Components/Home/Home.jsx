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

import style from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();

  const allVideogames = useSelector((state) => state.videogames);
  const allGenres = useSelector((state) => state.genres);
  const allPlatforms = useSelector((state) => state.platforms);
  const [order, setOrder] = useState("");
  const [page, setPage] = useState(1);
  const [videogamesPerPage /* , setVideofamesPerPage */] = useState(15);
  const maxTotal = allVideogames.length / videogamesPerPage;
  const currentVideogames = allVideogames.slice(
    (page - 1) * videogamesPerPage,
    (page - 1) * videogamesPerPage + videogamesPerPage
  );

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
    setPage(1);
  }

  function handleFilterPlatform(e) {
    dispatch(filterByPlatform(e.target.value));
    setPage(1);
  }

  function handleFilterName(e) {
    dispatch(filterByName(e.target.value));
    setPage(1);
    setOrder(`Ordenado ${e.target.value}`);
    return order;
  }

  function handleFilterScore(e) {
    dispatch(filterByScore(e.target.value));
    setPage(1);
    setOrder(`Ordenado ${e.target.value}`);
    return order;
  }

  return (
    <div className={style.home}>
      <Link to="/" className={style.landing}>
        Arcade Zone
      </Link>
      <Link to="/videogame" className={style.toCreate}>
        Create a Videogame
      </Link>
      <button
        className={style.loadGames}
        onClick={(e) => {
          handleOnClick(e);
        }}
      >
        Cargar Videojuegos
      </button>
      <SearchBar />
      <div className={style.filters}>
        <label>Order Name:</label>
        <select defaultValue="default" onClick={(e) => handleFilterName(e)}>
          <option value="default" disabled>
            Order:
          </option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        <label>Order Rating:</label>
        <select defaultValue="default" onClick={(e) => handleFilterScore(e)}>
          <option value="default" disabled>
            Order:
          </option>
          <option value="asc">Más puntuado</option>
          <option value="desc">Menos puntuado</option>
        </select>
        <label>Genres:</label>
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
        <label>Platforms:</label>
        <select defaultValue="default" onClick={(e) => handleFilterPlatform(e)}>
          <option value="default" disabled>
            Platforms:
          </option>
          <option value="all">All</option>
          {allPlatforms?.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
      </div>
      <Paginado page={page} setPage={setPage} maxTotal={maxTotal} />
      <div className={style.cardContainer}>
        {currentVideogames?.map((videogame) => {
          return (
            <div key={videogame.id}>
              <Link
                to={`/videogames/${videogame.id}`}
                style={{ textDecoration: "none" }}
              >
                <Videogame
                  key={videogame.id}
                  name={videogame.name}
                  image={videogame.image}
                  genres={videogame.genres}
                  platforms={videogame.platforms}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
