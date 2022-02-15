import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getPlatforms, postVideogame } from "../../Redux/Actions";
import { Link } from "react-router-dom";
import style from "./VideogamePost.module.css";

function validatePost(post) {
  let error = {};
  if (!post.name) {
    error.name = "Enter a name";
  }
  if (!post.description) {
    error.description = "Enter a brief description";
  }
  if (
    !post.image.includes("https://" || "http://") &&
    !post.image.includes(".jpg" || ".jpeg" || ".png")
  ) {
    error.image = "Enter a valid URL (.jpg, .jpeg, .png)";
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
    image: "",
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

  function handleDeleteG(g) {
    setPost({
      ...post,
      genres: post.genres.filter((e) => e !== g),
    });
    setError(
      validatePost({
        ...post,
        genres: [...post.genres],
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

  function handleDeleteP(p) {
    setPost({
      ...post,
      platforms: post.platforms.filter((e) => e !== p),
    });
    setError(
      validatePost({
        ...post,
        platforms: [...post.platforms],
      })
    );
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(postVideogame(post));
    setPost({
      name: "",
      description: "",
      released: "",
      image: "",
      rating: 0,
      genres: [],
      platforms: [],
    });
    alert("¡Created!");
  }

  return (
    <div className={style.fondo}>
      <Link to="/" className={style.landing}>
        <h3>Arcade Zone</h3>
      </Link>
      <div className={style.form}>
        <form>
          <div className={style.name}>
            <label>Name: </label>
            <input
              type="text"
              name="name"
              value={post.name}
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
          </div>
          <div className={style.image}>
            <label>Image: </label>
            <input
              type="url"
              name="image"
              value={post.image}
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
          </div>
          <div className={style.description}>
            <label>Description: </label>
            <textarea
              name="description"
              value={post.description}
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
          </div>
          <div className={style.released}>
            <label>Released: </label>
            <input
              type="date"
              name="released"
              value={post.released}
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
          </div>
          <div className={style.rating}>
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
          <div className={style.genres}>
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
          </div>
          <div className={style.platforms}>
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
          </div>
          <button
            className={style.submit}
            disabled={Object.keys(error).length || !post.name}
            type="submit"
            onClick={(e) => {
              handleOnSubmit(e);
            }}
          >
            ¡Create!
          </button>
        </form>
        <div>
          {error.name && <p className={style.errorName}>{error.name}</p>}
          {error.image && <p className={style.errorImage}>{error.image}</p>}
          {error.description && (
            <p className={style.errorDescription}>{error.description}</p>
          )}
          {error.released && (
            <p className={style.errorReleased}>{error.released}</p>
          )}
          {error.rating && <p className={style.errorRating}>{error.rating}</p>}
        </div>
        <div className={style.selected}>
          <p className={style.titleSelect}>Genres:</p>
          <div className={style.containerSelect}>
            {post.genres?.map((g) => (
              <div className={style.added} key={g}>
                <p>{g}</p>
                <button onClick={() => handleDeleteG(g)}>X</button>
              </div>
            ))}
          </div>
          <p className={style.titleSelect}>Platforms:</p>
          <div className={style.containerSelect}>
            {post.platforms?.map((p) => (
              <div className={style.added} key={p}>
                <p>{p}</p>
                <button onClick={() => handleDeleteP(p)}>X</button>
              </div>
            ))}
          </div>
          {error.genres && <p className={style.errorGenres}>{error.genres}</p>}
          {error.platforms && (
            <p className={style.errorPlatforms}>{error.platforms}</p>
          )}
        </div>
      </div>
      <Link to="/home" className={style.backHome}>
        <h3>Back to home</h3>
      </Link>
    </div>
  );
}
