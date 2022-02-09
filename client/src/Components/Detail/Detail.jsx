import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetails } from "../../Redux/Actions/";

export default function VideogameDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch, id]);

  const videogame = useSelector((state) => state.videogameDetail);

  return (
    <div>
      <h1>{videogame.name}</h1>
      <h5>{videogame.rating}</h5>
      <img
        src={videogame.image}
        alt={videogame.name}
        width="200px"
        height="250px"
      />
      <h3>{videogame.description}</h3>
      <h3>{videogame.genres?.map((e) => e.name)}</h3>
      <h3>{videogame.platforms?.map((e) => e + " ")}</h3>
      <h3>{videogame.released}</h3>
      <Link to="/home">
        <h3>Regresar</h3>
      </Link>
    </div>
  );
}
