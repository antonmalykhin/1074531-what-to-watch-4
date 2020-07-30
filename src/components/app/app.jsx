import React, {PureComponent} from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Main from '../main/main.jsx';
import FilmPage from '../film-page/film-page.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import AddReview from '../add-review/add-review.jsx';
import MainVideoPlayer from '../main-video-player/main-video-player.jsx';
import MyList from '../my-list/my-list.jsx';
import withActiveMainPlayer from '../../hocks/with-active-main-player/with-active-main-player.js';
import {ActionCreator as AppActionCreator} from '../../reducer/app/app.js';
import {ActionCreator as DataActionCreator} from '../../reducer/data/data.js';
import {getPlayingFilm, getCurrentYear} from '../../reducer/app/selectors.js';
import {getFilteredFilms, getPromoFilm, getIsCommentSend, getComments, getFavoriteFilms} from '../../reducer/data/selectors.js';
import {getAuthorizationStatus} from '../../reducer/user/selectors.js';
import {Operation as UserOperation} from '../../reducer/user/user.js';
import {Operation as DataOperation} from '../../reducer/data/data.js';
import history from '../../history';
import withSetRating from '../../hocks/with-set-rating/with-set-rating.js';
import {AppRoute} from '../../const.js';

const MainVideoPlayerWrapped = withActiveMainPlayer(MainVideoPlayer);
const AddReviewWrapped = withSetRating(AddReview);

class App extends PureComponent {
  constructor(props) {
    super(props);

  }

  render() {
    const {
      films,
      favoriteFilms,
      promoFilm,
      playingFilm,
      currentYear,
      authorizationStatus,
      onPlayButtonClick,
      onExitButtonClick,
      addFilmToFavorites,
      login,
      postReview,
      isCommentSend,
      resetWarning,
      comments,
      loadComments,
      loadFavoriteFilms
    } = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            <Main
              authorizationStatus={authorizationStatus}
              currentYear={currentYear}
              promoFilm={promoFilm}
              favoriteFilms={favoriteFilms}
              films={films}
              onPlayClick={onPlayButtonClick}
              loadComments={loadComments}
              addPromoToFavorites={addFilmToFavorites}
            />
          </Route>
          <Route exact path={AppRoute.LOGIN}>
            <SignIn onSubmit={login}/>
          </Route>
          <Route exact path={`${AppRoute.FILMS}/:id`}
            render={(props) => {
              return (
                <FilmPage
                  {...props}
                  authorizationStatus={authorizationStatus}
                  currentYear={currentYear}
                  films={films}
                  favoriteFilms={favoriteFilms}
                  onFilmClick={() => {}}
                  onPlayClick={onPlayButtonClick}
                  addFilmToFavorites={addFilmToFavorites}
                  loadComments={loadComments}
                  comments={comments}
                />
              );
            }}
          />
          <Route exact path={`${AppRoute.FILMS}/:id${AppRoute.REVIEW}`}
            render={(props) => {
              return (
                <AddReviewWrapped
                  {...props}
                  films={films}
                  onSubmit={postReview}
                  isCommentSend={isCommentSend}
                  resetWarning={resetWarning}
                />
              );
            }}
          />
          <Route exact path={`${AppRoute.FILMS}/:id${AppRoute.PLAYER}`}
            render={() => {
              return (
                <MainVideoPlayerWrapped
                  film={playingFilm}
                  onExitClick={() => {
                    history.goBack();
                    onExitButtonClick();
                  }}
                />
              );
            }}
          />
          <Route exact path={AppRoute.MY_LIST} render = {() => {
            return (
              <MyList currentYear={currentYear} favoriteFilms={favoriteFilms} loadFavoriteFilms={loadFavoriteFilms}/>
            );
          }} />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  films: PropTypes.array.isRequired,
  favoriteFilms: PropTypes.array.isRequired,
  promoFilm: PropTypes.object.isRequired,
  playingFilm: PropTypes.object.isRequired,
  currentYear: PropTypes.number.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  onExitButtonClick: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  postReview: PropTypes.func.isRequired,
  isCommentSend: PropTypes.bool.isRequired,
  resetWarning: PropTypes.func.isRequired,
  addFilmToFavorites: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
  loadComments: PropTypes.func.isRequired,
  loadFavoriteFilms: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  films: getFilteredFilms(state),
  favoriteFilms: getFavoriteFilms(state),
  promoFilm: getPromoFilm(state),
  playingFilm: getPlayingFilm(state),
  currentYear: getCurrentYear(state),
  authorizationStatus: getAuthorizationStatus(state),
  comments: getComments(state),
  isCommentSend: getIsCommentSend(state),
});

const mapDispatchToProps = (dispatch) => ({
  resetShowedFilms() {
    dispatch(AppActionCreator.resetShowedFilmCount());
  },
  onPlayButtonClick(film) {
    dispatch(AppActionCreator.openMainPlayer(film));
  },
  onExitButtonClick() {
    dispatch(AppActionCreator.closeMainPlayer());
  },
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  postReview(filmID, disableForm, postData) {
    dispatch(DataOperation.postComment(filmID, disableForm, postData));
  },
  resetWarning() {
    dispatch(DataActionCreator.sendComment(true));
  },
  addFilmToFavorites(filmID, data) {
    dispatch(DataOperation.addToFavorites(filmID, data));
  },
  loadComments(filmID) {
    dispatch(DataOperation.loadComments(filmID));
  },
  loadFavoriteFilms() {
    dispatch(DataOperation.loadFavoriteFilms());
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
