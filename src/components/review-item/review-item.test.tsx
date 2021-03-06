import * as React from 'react';
import * as renderer from 'react-test-renderer';
import ReviewItem from './review-item';

const comment = {
  id: 1,
  comment: `This movie is perfect in all its categories: credits, sound track, production, casting, writing, photography, editing, acting, and direction.
  I was amazed with the freedom of the use of the camera. This movie will change the way movies are made. Slow-mo, stills, black and white, and color were all used to brilliant effect.`,
  date: `2020-06-29T16:06:01.831Z`,
  rating: 5.6,
  user: {
    id: 4,
    name: `Mollie`
  }
};

it(`ReviewItem render correctly`, () => {
  const tree = renderer.create(
      <ReviewItem review={comment} />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
