import { ANIME_OPENING, ANIMES_SAVING } from "./constants";

export const openAnime = (anime) => ({
  type: ANIME_OPENING,
  payload: anime,
});
export const saveAnimes = ({ data }) => ({
  type: ANIMES_SAVING,
  payload: data,
});
