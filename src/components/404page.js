import React from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import {history} from '../routers/AppRouter';
import Loader from './Loader';

export class NotFoundPage extends React.Component {
    returnToCurrent = () => {
        history.push('/weather');
    }
    componentDidMount = () => {
        this.returnToCurrent();
    }
    render() {
        return (
            <Loader />
        )
    }
   
};

export default NotFoundPage;