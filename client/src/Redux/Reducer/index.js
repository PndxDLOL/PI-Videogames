const initialstate = {
  videogames: [],
  allVideogames: [],
  videogameDetail: {},
  genres: [],
  platforms: [],
};

function rootReducer(state = initialstate, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };
    case "GET_VIDEOGAMES_NAME":
      return {
        ...state,
        videogames: action.payload,
      };
    case "GET_DETAILS":
      return {
        ...state,
        videogameDetail: action.payload,
      };
    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };
    case "GET_PLATFORMS":
      return {
        ...state,
        platforms: action.payload,
      };
    case "FILTER_BY_GENRE":
      const genreFiltered =
        action.payload === "all"
          ? state.allVideogames
          : state.allVideogames.filter((videogame) =>
              videogame.genres.includes(action.payload)
            );
      return {
        ...state,
        videogames: genreFiltered,
      };

    case "FILTER_BY_PLATFORM":
      const platformFiltered =
        action.payload === "all"
          ? state.allVideogames
          : state.allVideogames.filter((videogame) =>
              videogame.platforms.includes(action.payload)
            );
      return {
        ...state,
        videogames: platformFiltered,
      };

    case "FILTER_BY_NAME":
      const videogamesSortedN =
        action.payload === "asc"
          ? state.videogames.sort((a, b) => a.name.localeCompare(b.name))
          : state.videogames.sort((a, b) => b.name.localeCompare(a.name));
      return {
        ...state,
        videogames: videogamesSortedN,
      };

    case "FILTER_BY_SCORE":
      const videogamesSortedS =
        action.payload === "asc"
          ? state.videogames.sort((a, b) => b.rating - a.rating)
          : state.videogames.sort((a, b) => a.rating - b.rating);
      return {
        ...state,
        videogames: videogamesSortedS,
      };
    case "POST_VIDEOGAME":
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default rootReducer;
