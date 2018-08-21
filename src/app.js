import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import AppRouter, {history} from './routers/AppRouter';
import configureStore from './store/configureStore';
import {APIbuild} from './actions/api';
import {buildWeather} from './components/currentWeatherBuilder';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();
const buildAPI = () => {
    if (navigator.geolocation) { 
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let long = position.coords.longitude;
            let apiBuild = 'https://api.wunderground.com/api/472edd4ba9ba5778/forecast/geolookup/conditions/astronomy/q/' + lat + ',' + long + '.json';
            store.dispatch(APIbuild(apiBuild));
        })
    }    
}

//Call Weather Fetch
buildAPI();

////////////////////////Learn how to create new Promises
setInterval(()=>{
    if (store.getState().api) {
        if (store.getState().api === store.getState().api) {
            buildWeather(store);
        } else {
            buildWeather(store);
        }
    } else {
        console.log('Loading location...');
    }
    
}, 3000)





//Calls app using provider from react-store
const jsx = (
    <Provider store = {store}>
        <AppRouter />
    </Provider>
); 

//Renders application
let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
         ReactDOM.render(jsx, document.getElementById('root'));
         hasRendered = true;
    }
};
 
renderApp();


