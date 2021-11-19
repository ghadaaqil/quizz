import axios from "axios";

export const getAllAnimes = () =>
  axios.get("https://ghibliapi.herokuapp.com/films/");
