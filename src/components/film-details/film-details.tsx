import * as React from 'react';
import {formatTimeToDisplay} from '../../utils';

interface Props {
  genre: string;
  release: number;
  runtime: number;
  crew: {
    director: string;
    starring: string[];
  };
}

const FilmDetails: React.FunctionComponent<Props> = (props: Props) => {
  const {
    genre,
    release,
    runtime,
    crew
  } = props;

  const {
    director,
    starring
  } = crew;

  const formattedRuntime = formatTimeToDisplay(runtime);

  return (
    <div className="movie-card__text movie-card__row">
      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Director</strong>
          <span className="movie-card__details-value">{director}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Starring</strong>
          <span className="movie-card__details-value">

            {starring.map((item, index) => {
              return (
                <React.Fragment key={`${item}-${index}`}>
                  {item}<br />
                </React.Fragment>
              );
            })}

          </span>
        </p>
      </div>

      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Run Time</strong>
          <span className="movie-card__details-value">{formattedRuntime}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Genre</strong>
          <span className="movie-card__details-value">{genre}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Released</strong>
          <span className="movie-card__details-value">{release}</span>
        </p>
      </div>
    </div>
  );
};

export default FilmDetails;
