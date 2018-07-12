import React from 'react';
import {shallow} from 'enzyme';
import { Header} from '../../components/header';

test('should render header correctly', ()=> {
    const wrapper = shallow(<Header startLogout={()=>{}}/>);
    expect(wrapper).toMatchSnapshot();
});


test('should call StartLogout on click', ()=> {
    const startLogout = jest.fn();
    const wrapper = shallow(<Header startLogout={startLogout} />);
    wrapper.find('button').simulate('click');
    expect(startLogout).toHaveBeenCalled();
});

