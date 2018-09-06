import React from 'react';
import {Router, Route, Switch, Link, NavLink} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'; 
import NotFoundPage from '../components/404page';
import Header from '../components/header';
import CurrentWeather from '../components/CurrentWeather';
import ExtendedForecast from '../components/ExtendedForecast';
import HelpPage from '../components/HelpPage';


export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Header />
            <Switch>
                <Route
                    path="/" 
                    component={CurrentWeather}
                    exact={true}
                />
                <Route
                    path="/extended"
                    component={ExtendedForecast} 
                />
                <Route
                    path="/help"
                    component={HelpPage}
                />
                <Route
                    component={NotFoundPage}
                />
            </Switch>
        </div>     
    </Router>
);

export default AppRouter;