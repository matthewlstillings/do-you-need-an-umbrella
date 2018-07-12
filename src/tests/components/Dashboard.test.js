import React from 'react';
import {shallow} from 'enzyme';
import DashboardPage from '../../components/Dashboard';


test('should rener dashboard page', () => {
    const wrapper = shallow(<DashboardPage />);
    expect(wrapper).toMatchSnapshot();
});