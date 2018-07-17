import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import AppRouter, {history} from './routers/AppRouter';
import configureStore from './store/configureStore';
import {fetchCity, fetchState, fetchTemp, fetchCondition, fetchSun, fetchFutureCondition} from './actions/current-weather';
import {APIbuild} from './actions/api';
import {setExtendedCast} from './actions/extendedCast';
import {setShortCast} from './actions/short-cast';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';



const store = configureStore();

//Build the API
const buildAPI = () => {
    if (navigator.geolocation) { 
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let long = position.coords.longitude;
            let api = 'https://api.wunderground.com/api/472edd4ba9ba5778/forecast/geolookup/conditions/astronomy/q/' + lat + ',' + long + '.json';
            console.log(api);
            fetch(api).then((response)=> response.json()).then((data) => {

                //For changing background - will change full data to state
                let sunRise = data.moon_phase.sunrise.hour;
                let sunSet = data.moon_phase.sunset.hour; 
                let currentTime = new Date().getHours();
                const html = document.querySelector('html');
                const header = document.querySelector('.header');
                const nav = document.querySelector('.nav');
                if (sunRise > currentTime || currentTime > sunSet ) {
                    store.dispatch(fetchSun(false));
                    console.log('Sun is gone');
                } else if ( sunRise < currentTime || currentTime < sunSet) {
                    store.dispatch(fetchSun(true));
                    html.classList.add('add-light');
                    header.classList.add('add-light');
                    nav.classList.add('add-light');
                }
                
                //Current Weather
                let temperatureC = data.current_observation.temp_C;
                let temperature = data.current_observation.temp_f;
                let city = data.location.city;
                let state = data.location.state;
                let condition = data.current_observation.weather;
                let futureCondition = data.forecast.simpleforecast.forecastday[0].conditions;
                store.dispatch(fetchCity(city));
                store.dispatch(fetchState(state));
                store.dispatch(fetchTemp(temperature));
                store.dispatch(fetchCondition(condition));
                store.dispatch(fetchFutureCondition(futureCondition));

                //Short Cast
                let shortCast = []; 
                data.forecast.txt_forecast.forecastday.slice(0, 3).map((newDay) => {
                        store.dispatch(setShortCast(newDay));
                })
                //Extended Forecast
                let extendCast = [];
                data.forecast.simpleforecast.forecastday.map((day) => {
                       store.dispatch(setExtendedCast(day));
                })
            })
        }); 
    }    
}

//Call Weather Fetch
buildAPI();


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


