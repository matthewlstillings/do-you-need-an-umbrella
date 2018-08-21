import React from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import Search from './Search';


export const Header = () => (
    <header className="header">
        <h1 className="header__title">Will you need an umbrella?</h1>
        <div className="nav">
            <NavLink className="nav-link" activeClassName="is-active" to='/weather' exact={true}>Current Weather</NavLink>
            <NavLink className="nav-link" activeClassName="is-active" to='/extended' >Extended Forecast</NavLink>
        </div>
    </header>
);


export default Header;