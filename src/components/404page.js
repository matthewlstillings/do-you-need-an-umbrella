import React from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import {history} from '../routers/AppRouter';
import Loader from './Loader';

export class NotFoundPage extends React.Component {
    render() {
        return (
            <div className="not-found">
                <h1 className="not-found__title">Oops! Wrong way!</h1>
                <img className="not-found__image" src={'./images/WeatherIcons/unknown.svg'} />
                <h2 className="not-found__subtitle">Please return to <span className="help__content-link" >home.</span></h2> 
            </div>
        )
    }
   
};

export default NotFoundPage;