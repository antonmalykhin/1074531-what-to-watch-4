import * as React from 'react';
import {configure, mount} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import VideoPlayer from './video-player';

configure({
  adapter: new Adapter()
});

const filmPreviewSettings = {
  SRC: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  POSTER: `img/the-grand-budapest-hotel-poster.jpg`,
};

it(`Should video play`, () => {
  const videoPlayer = mount(
      <VideoPlayer
        src={filmPreviewSettings.SRC}
        poster={filmPreviewSettings.POSTER}
        isPlaying={true}
      />
  );

  expect(videoPlayer.props().isPlaying).toBe(true);

  videoPlayer.unmount();
});

it(`Should video pause`, () => {
  const videoPlayer = mount(
      <VideoPlayer
        src={filmPreviewSettings.SRC}
        poster={filmPreviewSettings.POSTER}
        isPlaying={false}
      />
  );

  expect(videoPlayer.props().isPlaying).toBe(false);

  videoPlayer.unmount();
});
