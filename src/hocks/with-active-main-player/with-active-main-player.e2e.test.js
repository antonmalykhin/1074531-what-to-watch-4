import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withActiveMainPlayer from './with-active-main-player.js';

Enzyme.configure({
  adapter: new Adapter()
});

const film = {
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  background: `img/bg-the-grand-budapest-hotel.jpg`,
  genre: `Comedy`,
  release: 2014,
  runtime: 99,
  poster: `img/the-grand-budapest-hotel-poster.jpg`,
  preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  video: `https://upload.wikimedia.org/wikipedia/commons/4/41/Big_Buck_Bunny_medium.ogv`,
  rating: {
    score: 8.9,
    level: `Very good`,
    count: 240
  },
  description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege. Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
  crew: {
    director: `Wes Andreson`,
    starring: `Bill Murray, Edward Norton, Jude Law, Willem Dafoe, Saoirse Ronan, Tony Revoloru, Tilda Swinton, Tom Wilkinson, Owen Wilkinson, Adrien Brody, Ralph Fiennes, Jeff Goldblum`
  }
};

const VideoPlayer = (props) => {
  const {
    children,
    onPlayButtonClick,
  } = props;

  return (
    <div>
      {children}
      <button className="player__play" onClick={() => onPlayButtonClick()} />
    </div>
  );
};

VideoPlayer.propTypes = {
  onExitClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  onFullscreenButtonClick: PropTypes.func.isRequired
};

it(`Checks that HOC's callback play and pause video`, () => {
  const VideoPlayerWrapped = withActiveMainPlayer(VideoPlayer);
  const wrapper = mount(
      <VideoPlayerWrapped
        onExitClick={() => {}}
        film={film}
      />
  );
  window.HTMLMediaElement.prototype.play = () => {};

  const {_videoRef} = wrapper.instance();

  jest.spyOn(_videoRef.current, `play`);

  wrapper.instance().componentDidMount();

  wrapper.find(`.player__play`).simulate(`click`);
  expect(_videoRef.current.play).toHaveBeenCalledTimes(1);

  window.HTMLMediaElement.prototype.pause = () => {};
  jest.spyOn(_videoRef.current, `pause`);
  wrapper.find(`.player__play`).simulate(`click`);
  expect(_videoRef.current.pause).toHaveBeenCalledTimes(1);
});