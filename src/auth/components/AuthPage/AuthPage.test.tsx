import React from 'react';
import { shallow } from 'enzyme';
import AuthPage from './AuthPage';

describe('Should render AuthPage', () => {
  it('render App component', () => {
    const wrapper = shallow(<AuthPage />);

    expect(wrapper.find('.test1')).toHaveLength(2);
  });
});
