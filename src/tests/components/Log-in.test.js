import React from 'react';
import {shallow} from 'enzyme';
import {LogIn} from '../../components/Log-in';

test('should rener LogIn page', () => {
    const wrapper = shallow(<LogIn />);
    expect(wrapper).toMatchSnapshot();
});


test('should call StartLogout on click', ()=> {
    const startLogin = jest.fn();
    const wrapper = shallow(<LogIn startLogin={startLogin} />);
    wrapper.find('button').simulate('click');
    expect(startLogin).toHaveBeenCalled();
});
