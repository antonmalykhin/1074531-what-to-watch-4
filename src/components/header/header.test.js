import React from 'react';
import renderer from 'react-test-renderer';
import Header from './header.jsx';


it(`Header render`, () => {
  const tree = renderer.create(
      <Header >
        <div />
      </Header>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
