import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class SmallFilmCard extends PureComponent {
  constructor(props) {
    super(props);

  }

  render() {
    const {film, onFilmTitleClick, onFilmMouseOver} = this.props;
    const {title, image} = film;

    return (
      <article className="small-movie-card catalog__movies-card" onMouseOver={() => onFilmMouseOver(film)}>
        <div className="small-movie-card__image">
          <img src={image} alt={title} width="280" height="175" />
        </div>
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" href="movie-page.html" onClick={onFilmTitleClick}>{title}</a>
        </h3>
      </article>
    );
  }
}

SmallFilmCard.propTypes = {
  film: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired,
  onFilmMouseOver: PropTypes.func.isRequired,
  onFilmTitleClick: PropTypes.func.isRequired
};

export default SmallFilmCard;
