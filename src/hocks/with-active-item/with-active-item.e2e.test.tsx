import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import withActiveItem from './with-active-item';

configure({
  adapter: new Adapter()
});

const mock = {
  tabs: [
    `Overview`,
    `Details`,
    `Reviews`
  ]
};

const MockComponent = () => <div />;
const MockTabsWrapped = withActiveItem(MockComponent, `tabs`);

it(`Should change tabs`, () => {
  const wrapper = shallow(
      <MockTabsWrapped
        tabs={mock.tabs}
      />);

  expect(wrapper.props().activeItem).toEqual(`Overview`);

  wrapper.props().onActiveItemChange(`Details`);
  expect(wrapper.props().activeItem).toEqual(`Details`);

  wrapper.props().onActiveItemChange(`Reviews`);
  expect(wrapper.props().activeItem).toEqual(`Reviews`);
});
