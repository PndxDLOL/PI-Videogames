import React from "react";
//import { Link } from "react-router-dom";

export default function Videogame({ /* id */ name, image, genres }) {
  return (
    <div>
      <h3>{name}</h3>
      {genres.map((e) => {
        return <p>{e}</p>;
      })}
      <img src={image} alt={name} width="200px" height="  250px" />
    </div>
  );
}
