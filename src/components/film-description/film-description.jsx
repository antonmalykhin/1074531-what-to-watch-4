import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import NavItem from '../nav-item/nav-item.jsx';
import FilmOverview from '../film-overview/film-overview.jsx';
import FilmDetails from '../film-details/film-details.jsx';
import FilmReviews from '../film-reviews/film-reviews.jsx';

class FilmDescription extends PureComponent {
  constructor(props) {
    super(props);

  }

  _renderTab() {
    const {
      tabs,
      activeItem,
      film
    } = this.props;

    switch (activeItem) {
      case tabs[0]:
        return (
          <FilmOverview
            rating={film.rating}
            description={film.description}
            crew={film.crew}
          />
        );
      case tabs[1]:
        return (
          <FilmDetails
            genre={film.genre}
            release={film.release}
            runtime={film.runtime}
            crew={film.crew}
          />
        );
      case tabs[2]:
        return (
          <FilmReviews />
        );
    }

    return null;
  }

  render() {
    const {
      tabs,
      activeItem,
      onActiveItemChange
    } = this.props;

    return (
      <div className="movie-card__desc">
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            {tabs.map((tab, index) => {
              return (
                <NavItem
                  key={`${tab}-${index}`}
                  title={tab}
                  onNavItemClick={() => {
                    onActiveItemChange(tab);
                  }}
                  isActive={activeItem === tab}
                />
              );
            })}
          </ul>
        </nav>

        {this._renderTab()}

      </div>
    );
  }
}

FilmDescription.propTypes = {
  tabs: PropTypes.array.isRequired,
  film: PropTypes.shape({
    background: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    release: PropTypes.number.isRequired,
    runtime: PropTypes.number.isRequired,
    poster: PropTypes.string.isRequired,
    rating: PropTypes.shape({
      score: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired
    }).isRequired,
    description: PropTypes.string.isRequired,
    crew: PropTypes.shape({
      director: PropTypes.string.isRequired,
      starring: PropTypes.array.isRequired
    }).isRequired
  }).isRequired,
  activeItem: PropTypes.string.isRequired,
  onActiveItemChange: PropTypes.func.isRequired
};

export default FilmDescription;
