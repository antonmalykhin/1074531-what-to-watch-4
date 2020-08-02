import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './components/app/app';
import reducer from './reducer/reducer';
import {Operation as DataOperation} from './reducer/data/data';
import {Operation as AppOperation, ActionCreator as AppActionCreator} from './reducer/app/app';
import {Operation as UserOperation, ActionCreator, AuthorizationStatus} from './reducer/user/user';
import {createAPI} from './api';

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

const loadData = () => {
  store.dispatch(AppActionCreator.changeLoadingStatus(true));
  const loadFilms = store.dispatch(DataOperation.loadFilms());
  const loadPromo = store.dispatch(DataOperation.loadPromoFilm());
  const loadFavorites = store.dispatch(DataOperation.loadFavoriteFilms());
  const getYear = store.dispatch(AppOperation.getCurrentYear());

  return Promise.all([loadFilms, loadPromo, loadFavorites, getYear])
    .then(() => {
      store.dispatch(AppActionCreator.changeLoadingStatus(false));
      store.dispatch(UserOperation.checkAuth());
    })
    .catch((error) => {
      throw error;
    });
};

loadData();

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);