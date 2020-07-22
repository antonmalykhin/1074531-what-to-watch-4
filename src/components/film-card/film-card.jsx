import React from 'react';
import PropTypes from 'prop-types';

const FilmCard = (props) => {
  const {
    children,
    promoFilm,
    onPlayClick
  } = props;


  return (
    <section className="movie-card">
      <div className="movie-card__bg">
        <img
          src={promoFilm.background}
          alt={promoFilm.title}
        />
      </div>

      {children}

      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img
              src={promoFilm.poster}
              alt={promoFilm.title}
              width="218"
              height="327"
            />
          </div>

          <div className="movie-card__desc">
            <h2 className="movie-card__title">{promoFilm.title}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{promoFilm.genre}</span>
              <span className="movie-card__year">{promoFilm.release}</span>
            </p>

            <div className="movie-card__buttons">
              <button className="btn btn--play movie-card__button" type="button" onClick={() => onPlayClick(promoFilm)}>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list movie-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
                <span>My list</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

FilmCard.propTypes = {
  children: PropTypes.node.isRequired,
  promoFilm: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.shape({
      background: PropTypes.string,
      title: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      release: PropTypes.number.isRequired,
      runtime: PropTypes.number.isRequired,
      poster: PropTypes.string,
      rating: PropTypes.shape({
        score: PropTypes.number,
        level: PropTypes.string,
        count: PropTypes.number
      })
    })
  ]),
  onPlayClick: PropTypes.func.isRequired
};

export default FilmCard;
