import React from 'react';
import configureStore from '../store/configureStore';
import {fetchCity, fetchState, fetchTemp, fetchCondition, fetchSun, fetchFutureCondition} from '../actions/current-weather';
import {setExtendedCast, clearExtendedCast} from '../actions/extendedCast';
import {setShortCast, clearShortCast} from '../actions/short-cast';



//Build the API
export const buildWeather = (store) => {      
            fetch(store.getState().api).then((response)=> response.json()).then((data) => {

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
                store.dispatch(clearShortCast());
                data.forecast.txt_forecast.forecastday.slice(0, 3).map((newDay) => {
                        store.dispatch(setShortCast(newDay));
                })
                //Extended Forecast
                store.dispatch(clearExtendedCast());
                data.forecast.simpleforecast.forecastday.map((day) => {
                       store.dispatch(setExtendedCast(day));
                })
            })  
}