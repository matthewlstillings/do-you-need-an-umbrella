import React from 'react';
import {connect} from 'react-redux';
import {setTimeout} from 'timers';
import {APIbuild} from '../actions/api';
import {setExtendedCast, clearExtendedCast} from '../actions/extendedCast';
import {setShortCast, clearShortCast} from '../actions/short-cast';
import {fetchCity, fetchFutureCondition, fetchCondition, fetchState, fetchTemp, fetchSun} from '../actions/current-weather';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';



export class Search extends React.Component {
    state = {
        zip: '',
        error: null,
        onFocus: false
    }
    buildWeather = () => {      
        fetch(this.props.api).then((response)=> response.json()).then((data) => {

            //For changing background - will change full data to state
            let sunRise = data.moon_phase.sunrise.hour;
            let sunSet = data.moon_phase.sunset.hour; 
            let currentTime = new Date().getHours();
            const html = document.querySelector('html');
            const header = document.querySelector('.header');
            const nav = document.querySelector('.nav');
            const forecastDay = document.querySelector('.extended-forecast__day');
            if (sunRise > currentTime || currentTime > sunSet ) {
                this.props.fetchSun(false);
            } else if ( sunRise < currentTime || currentTime < sunSet) {
                this.props.fetchSun(true);
                html.classList.add('add-light');
                header.classList.add('add-light');
                nav.classList.add('add-light');
                forecastDay && forecastDay.classList.add('add-light');
            }
            
            //Current Weather
            let temperatureC = data.current_observation.temp_C;
            let temperature = data.current_observation.temp_f;
            let city = data.location.city;
            let state = data.location.state;
            let condition = data.current_observation.weather;
            let futureCondition = data.forecast.simpleforecast.forecastday[0].conditions;
            this.props.fetchCity(city);
            this.props.fetchState(state);
            this.props.fetchTemp(temperature);
            this.props.fetchCondition(condition);
            this.props.fetchFutureCondition(futureCondition);
            
            //Short Cast
            this.props.clearShortCast();
            data.forecast.txt_forecast.forecastday.slice(0, 3).map((newDay) => {
                    this.props.setShortCast(newDay);
            })
            //Extended Forecast
            this.props.clearExtendedCast();
            data.forecast.simpleforecast.forecastday.map((day) => {
                   this.props.setExtendedCast(day);
            })
        })  
}
    onFocus = () => {
        !this.state.onFocus && this.setState(()=>({onFocus: true}))
    }
    onZipChange = (e) => {
        const zip = e.target.value;
        this.setState(()=>({zip}));
    }
    onSubmit = () => {
        let zipCode = this.state.zip;
        if (zipCode.match(/[a-zA-Z]+/g) ) {
            this.props.setError('Zipcodes only contain numbers');
        } else if (zipCode.length < 3 || zipCode.length >= 7 ) {
            this.props.setError('Please enter a valid zipcode');
        } else {
            let api = 'https://api.wunderground.com/api/472edd4ba9ba5778/forecast/geolookup/conditions/astronomy/q/' + zipCode + '.json';
            this.props.APIbuild(api);
            setTimeout(()=>{
                this.buildWeather()
            }, 1000)
            this.props.setError(null);
            this.props.onSubmit();
            this.state.onFocus && this.setState(()=>({onFocus: false}))
        }
    }   
    render() {
        return (
            <form 
                ref={(form) => {this.searchForm = form}}
                onSubmit={(e) => {
                    e.preventDefault();
                    this.onSubmit()
                    this.searchForm.reset();
                    }  
                }
                className='search'
               
                
            >
                <input 
                    type="text"
                    onChange={this.onZipChange}
                    className='search__input'
                    placeholder='Search by Zip Code...'
                    onFocus={this.onFocus}
                    
                />
                <button 
                    type="submit"
                    className={'search__button' + (this.state.onFocus == true ? ' reveal' : '') }
                
                ><FontAwesomeIcon icon={faSearch}/></button>
                
            </form>

        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    APIbuild: (api) => dispatch(APIbuild(api)),
    fetchCity: (city) => dispatch(fetchCity(city)),
    fetchState: (state) => dispatch(fetchState(state)),
    fetchTemp: (temp) => dispatch(fetchTemp(temp)),
    fetchCondition: (condition) => dispatch(fetchCondition(condition)),
    fetchSun: (sun) => dispatch(fetchSun(sun)),
    fetchFutureCondition: (condition) => dispatch(fetchFutureCondition(condition)),
    setShortCast: (shortcast) => dispatch(setShortCast(shortcast)),
    clearShortCast: (shortcast) => dispatch(clearShortCast(shortcast)),
    setExtendedCast: (forecast) => dispatch(setExtendedCast(forecast)),
    clearExtendedCast: (forecast) => dispatch(clearExtendedCast(forecast))

})

const mapStateToProps = (state) => {
    return {
      api: state.api
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);