import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import AppRouter, {history} from './routers/AppRouter';
import configureStore from './store/configureStore';
import {fetchCity, fetchState, fetchTemp, fetchCondition} from './actions/current-weather';
import {APIbuild} from './actions/api';
import {setExtendedCast} from './actions/extendedCast';
import {setShortCast} from './actions/short-cast';
//import {login, logout} from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { setTimeout } from 'timers';
import moment from 'moment';
import 'react-dates/lib/css/_datepicker.css';
//import {firebase} from './firebase/firebase';


const store = configureStore();

//Build the API
const buildAPI = () => {
    if (navigator.geolocation) { 
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let long = position.coords.longitude;
            let api = 'https://api.wunderground.com/api/472edd4ba9ba5778/forecast/geolookup/conditions/astronomy/q/' + lat + ',' + long + '.json';
            fetch(api).then((response)=> response.json()).then((data) => {

                //For changing background - will change full data to state
                let sunRise = data.moon_phase.sunrise.hour;
                let sunSet = data.moon_phase.sunset.hour; 
                let currentTime = new Date().getHours();
                const html = document.querySelector('html');
                const header = document.querySelector('.header');
                const nav = document.querySelector('.nav');
                const loading = document.querySelector('.loading-div');
                if (sunRise > currentTime || currentTime > sunSet ) {
                    console.log('Sun is gone');
                } else if ( sunRise < currentTime || currentTime < sunSet) {
                    html.classList.add('add-light');
                    header.classList.add('add-light');
                    nav.classList.add('add-light');
                    loading.classList.add('add-light');
                }
                
                //Current Weather
                let temperatureC = data.current_observation.temp_C;
                let temperature = data.current_observation.temp_f;
                let city = data.location.city;
                let state = data.location.state;
                let condition = data.current_observation.weather;
                store.dispatch(fetchCity(city));
                store.dispatch(fetchState(state));
                store.dispatch(fetchTemp(temperature));
                store.dispatch(fetchCondition(condition));

                //Short Cast
                let shortCast = []; 
                console.log(data.forecast.txt_forecast.forecastday);
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

buildAPI();

{/* let i = 0;
setInterval(() =>{
    i++;
    console.log(store.getState(), i)
}, 500); */}

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

//Loader Code - Could add to own component

const loader = (
    <div className="loader__container">
        <div className="loader">
            <div className="circle is-red"></div>
            <div className="circle is-green"></div>
        </div>
    </div>
);

ReactDOM.render(loader, document.getElementById('root')); 
renderApp();

{/*
//Login Actions
firebase.auth().onAuthStateChanged((user)=>{ //Firebase Functions
    if (user) {
        store.dispatch(login(user.uid));
        renderApp()
        if (history.location.pathname === '/') {
            history.push('/dashboard');
        }
       
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
})

*/}

