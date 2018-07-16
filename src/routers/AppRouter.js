import React from 'react';
import {Router, Route, Switch, Link, NavLink} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'; 
import NotFoundPage from '../components/404page';
import Header from '../components/header';
import CurrentWeather from '../components/CurrentWeather';
import ExtendedForecast from '../components/ExtendedForecast';


export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Header />
            <Switch>
                <Route
                    path="/weather" 
                    component={CurrentWeather}
                    exact={true}
                />
                <Route
                    path="/extended"
                    component={ExtendedForecast} 
                />
                <Route
                    component={NotFoundPage}
                />
            </Switch>
        </div>     
    </Router>
);

export default AppRouter;