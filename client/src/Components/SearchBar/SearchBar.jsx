import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogameByName } from "../../Redux/Actions";
import style from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleOnChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(getVideogameByName(name));
    setName("");
  }

  return (
    <div className={style.searchBar}>
      <input
        className={style.input}
        type="text"
        placeholder="Search Videogame"
        onChange={(e) => {
          handleOnChange(e);
        }}
      />
      <button
        className={style.button}
        type="submit"
        onClick={(e) => {
          handleOnSubmit(e);
        }}
      >
        Search
      </button>
    </div>
  );
}
