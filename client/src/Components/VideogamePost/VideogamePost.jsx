import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getPlatforms, postVideogame } from "../../Redux/Actions";

function validatePost(post) {
  let error = {};
  if (!post.name) {
    error.name = "Enter a name";
  }
  if (!post.description) {
    error.description = "Enter a brief description";
  }
  if (!post.rating || post.rating < 0 || post.rating > 5) {
    error.rating = "Rating must between 0 and 5";
  }
  if (!post.genres.length) {
    error.genres = "You must choose at least one Genre";
  }
  if (!post.platforms.length) {
    error.platforms = "You must coohse at least one Platform";
  }
  if (!post.released) {
    error.released = "Enter a valid date (dd/mm/aaaa)";
  }
  return error;
}

export default function VideogamePost() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const [error, setError] = useState({});
  const [post, setPost] = useState({
    name: "",
    description: "",
    released: "",
    rating: 0,
    genres: [],
    platforms: [],
  });

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  function handleOnChange(e) {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
    setError(
      validatePost({
        ...post,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleOnSelectG(e) {
    if (!post.genres.includes(e.target.value)) {
      setPost({
        ...post,
        genres: [...post.genres, e.target.value],
      });
    }
    setError(
      validatePost({
        ...post,
        genres: [...post.genres, e.target.value],
      })
    );
  }

  function handleOnSelectP(e) {
    if (!post.platforms.includes(e.target.value)) {
      setPost({
        ...post,
        platforms: [...post.platforms, e.target.value],
      });
    }
    setError(
      validatePost({
        ...post,
        platforms: [...post.platforms, e.target.value],
      })
    );
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(postVideogame(post));
    alert("¡Created!");
  }

  return (
    <div>
      <form>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={post.name}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
          {error.name && <p>{error.name}</p>}
        </div>
        <div>
          <label>Image: </label>
          <input
            type="text"
            name="image"
            value={post.image}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </div>
        <div>
          <label>Description: </label>
          <input
            type="text"
            name="description"
            value={post.description}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
          {error.description && <p>{error.description}</p>}
        </div>
        <div>
          <label>Released: </label>
          <input
            type="date"
            name="released"
            value={post.released}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
          {error.released && <p>{error.released}</p>}
        </div>
        <div>
          <label>Rating: </label>
          <input
            type="number"
            min="0"
            max="5"
            name="rating"
            value={post.rating}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </div>
        <div>
          <label>Genres: </label>
          <select
            defaultValue="default"
            onChange={(e) => {
              handleOnSelectG(e);
            }}
          >
            <option value="default" disabled>
              Choose Genres:
            </option>
            {genres?.map((genre) => (
              <option value={genre.name} key={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
          {error.genres && <p>{error.genres}</p>}
        </div>
        <div>
          <label>Platforms: </label>
          <select
            defaultValue="default"
            onChange={(e) => {
              handleOnSelectP(e);
            }}
          >
            <option value="default" disabled>
              Choose Platforms:
            </option>
            {platforms?.map((platform) => (
              <option value={platform} key={platform}>
                {platform}
              </option>
            ))}
          </select>
          {error.platforms && <p>{error.platforms}</p>}
        </div>
        <button
          type="submit"
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          ¡Create!
        </button>
      </form>
    </div>
  );
}
