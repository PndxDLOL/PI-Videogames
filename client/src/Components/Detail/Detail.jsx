import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetails } from "../../Redux/Actions/";
import style from "./Detail.module.css";

export default function VideogameDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch, id]);

  const videogame = useSelector((state) => state.videogameDetail);

  console.log(videogame);

  return (
    <div className={style.fondo}>
      <Link to="/" className={style.landing}>
        Arcade Zone
      </Link>
      <div className={style.container}>
        <h1>{videogame.name}</h1>
        <h5 className={style.rating}>{videogame.rating}</h5>
        <div className={style.visual}>
          <img src={videogame.image} alt={videogame.name} />
          <div>
            <h3>
              Released: <br></br>
              {videogame.released}
            </h3>
            <h3>
              Genres: {videogame.genres?.map((e) => `|${e.name ? e.name : e}|`)}
            </h3>
            <h3>Platforms: {videogame.platforms?.map((e) => `|${e}|`)}</h3>
          </div>
        </div>
        <div className={style.detail}>
          <h3>{videogame.description}</h3>
        </div>
      </div>
      <Link to="/home" className={style.backHome}>
        <h3>Back to home</h3>
      </Link>
    </div>
  );
}
