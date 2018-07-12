import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import currentWeatherReducer from '../reducers/current-weather';
import apiReducer from '../reducers/api';
import extendedCast from '../reducers/extendedCast';
import shortCast from '../reducers/short-cast';



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            currentWeather: currentWeatherReducer,
            api: apiReducer,
            forecast: extendedCast,
            shortCast: shortCast

        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
}


