import axios from "axios";

export function getVideogames() {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/videogames/`);

      return dispatch({
        type: "GET_VIDEOGAMES",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDetails(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/videogames/${id}`);

      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getGenres() {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/genres`);

      return dispatch({
        type: "GET_GENRES",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getPlatforms() {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/platforms`);

      return dispatch({
        type: "GET_PLATFORMS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterByGenre(payload) {
  return {
    type: "FILTER_BY_GENRE",
    payload,
  };
}

export function filterByPlatform(payload) {
  return {
    type: "FILTER_BY_PLATFORM",
    payload,
  };
}

export function filterByScore(payload) {
  return {
    type: "FILTER_BY_SCORE",
    payload,
  };
}

export function filterByName(payload) {
  return {
    type: "FILTER_BY_NAME",
    payload,
  };
}
