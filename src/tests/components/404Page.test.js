import React from 'react';
import {shallow} from 'enzyme';
import NotFoundPage from '../../components/404page';

test('should render 404 Error Page', () => {
    const wrapper = shallow(<NotFoundPage />);
    expect(wrapper).toMatchSnapshot();
});