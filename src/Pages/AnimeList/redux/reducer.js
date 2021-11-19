import { ANIME_OPENING, ANIMES_SAVING, NAME } from "./constants";

const initialAnimeListState = {
  anime: {},
  animes: [],
};

const AnimeListReducer = (state = initialAnimeListState, action) => {
  switch (action.type) {
    case ANIME_OPENING:
      return { ...state, anime: { ...action.payload } };
    case ANIMES_SAVING:
      return { ...state, animes: [...action.payload] };
    default:
      return { ...state };
  }
};
const reducerWrapper = {
  [NAME]: AnimeListReducer,
};
export { initialAnimeListState, AnimeListReducer };

export default reducerWrapper;
