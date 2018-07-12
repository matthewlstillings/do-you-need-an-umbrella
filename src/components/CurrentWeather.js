import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import { fetchCity, fetchState, fetchCondition, fetchTemp } from '../actions/current-weather';
import ShortCast from './ShortCast';
import ExtendedCastDay from './ExtendedCastDays';
import { Loader } from './Loader';


export class CurrentWeather extends React.Component {
    state = {
        iconCurrent: 'default'
    }
    getWeatherIcon = () => {
        let condition = this.props.currentWeather.condition;
        switch (condition) { 
            case 'Light Snow':
              this.setState(()=>({iconCurrent: 'snowy-4'}))
              break;
            case 'Snow':
                this.setState(()=>({iconCurrent: 'snowy-6'}))
              break;
            case 'Heavy Snow':
                this.setState(()=>({iconCurrent: 'snowy-6'}))
              break;
            case 'Clear':
                this.setState(()=>({iconCurrent: 'day'}))
              break;
            case 'Overcast':
                this.setState(()=>({iconCurrent: 'cloudy'}))
              break;
            case 'Partly Cloudy':
                this.setState(()=>({iconCurrent: 'cloudy-day-1'}))
              break;
            case 'Mostly Cloudy':
                this.setState(()=>({iconCurrent: 'cloudy-day-3'}))
              break;
            case 'Scattered Clouds':
                this.setState(()=>({iconCurrent: 'cloudy-day-2'}))
              break;  
            case 'Light Rain':
                this.setState(()=>({iconCurrent: 'rainy-4'}))
              break;
            case 'Rain':
                this.setState(()=>({iconCurrent: 'rainy-6'}))
              break;
            case 'Heavy Rain':
                this.setState(()=>({iconCurrent: 'rainy-6'}))               
              break;
            case 'Light Thunderstorm':
                this.setState(()=>({iconCurrent: 'thunder'}))
              break;
            case 'Thunderstorm':
                this.setState(()=>({iconCurrent: 'thunder'}))
              break;
            case 'Heavy Thunderstorm':
                this.setState(()=>({iconCurrent: 'thunder'}))
              break;
            default:
    
            }  
            
    }
    componentDidMount = () => {
        let i = 0;
        let initInterval = setInterval(()=> {
            if (this.props.currentWeather) {
                i += 1;
                if (i < 6) {
                    console.log(i);
                    this.setState(()=> ({render: true}));
                    this.getWeatherIcon();
                }
            }
        }, 2000);
        let updateInterval = setInterval(()=> {
                this.getWeatherIcon();
        }, 30000);
    }
    render() {
        return (
            
            <div>
                <h1 className="extended-forecast__title">Current Weather</h1>
                {this.state.iconCurrent === "default"  ? (<Loader />) : (
                    <div className="current-weather">
                        
                        <div className="current-weather__container">
                        <div className="current-weather__image-container">
                            <img className="current-weather__image" src={'./images/WeatherIcons/' + this.state.iconCurrent + '.svg'} /> 
                        </div>
                            <div className="current-weather__conditions">
                                <h1 className="current-weather__temp">
                                    {this.props.currentWeather.temperature + String.fromCharCode(176)} F - {this.props.currentWeather.condition} 
                                </h1>
                                <h3 className="current-weather__location">{this.props.currentWeather.city}, {this.props.currentWeather.state}</h3>
                            </div>  
                        </div>
                        <div className="current-weather__short-cast">
                            { 
                                this.props.shortCast.map((day)=> 
                                    <ShortCast 
                                        key={day.period}
                                        iconImage={day.icon}
                                        title={day.title}
                                        text={day.fcttext}
                                    />
                                )
                                
                            }
                        </div>
                    </div>
                )}
            </div>
            
        )
    };
};


const mapStateToProps = (state) => {
    return {
        currentWeather: state.currentWeather,
        shortCast: state.shortCast
    };
}

export default connect(mapStateToProps)(CurrentWeather);