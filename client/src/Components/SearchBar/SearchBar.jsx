import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogameByName } from "../../Redux/Actions";

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
    <div>
      <input
        type="text"
        placeholder="Search Videogame"
        onChange={(e) => {
          handleOnChange(e);
        }}
      />
      <button
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
