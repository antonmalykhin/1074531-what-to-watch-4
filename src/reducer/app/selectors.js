import NameSpace from '../name-space.js';

const NAME_SPACE = NameSpace.APP;

export const getGenre = (state) => {
  return state[NAME_SPACE].genre;
};

export const getShowedFilms = (state) => {
  return state[NAME_SPACE].showedFilms;
};

export const getCurrentFilm = (state) => {
  return state[NAME_SPACE].currentFilm;
};

export const getPlayingFilm = (state) => {
  return state[NAME_SPACE].playingFilm;
};