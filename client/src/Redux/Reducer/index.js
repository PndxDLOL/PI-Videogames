const initialstate = {
  videogames: [],
};

function rootReducer(state = initialstate, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;