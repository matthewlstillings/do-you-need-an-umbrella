import React from 'react';
import {connect} from 'react-redux';
import {setTimeout} from 'timers';
import Search from './Search';
import ShortCast from './ShortCast';
import Loader from './Loader';



export class CurrentWeather extends React.Component {
    state = {
        shortCast: '',
        iconCurrent: '',
        forecast: '',
        loader: true
    }
    getWeatherIcon = () => {
        let condition = this.props.currentWeather.condition;
        if (this.props.currentWeather.sunPosition === true) {
            switch (condition) { 
                case 'Light Snow':
                this.setState(()=>({iconCurrent: 'snowy-4'}))
                break;
                case 'Snow':
                    this.setState(()=>({iconCurrent: 'snowy-5'}))
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
                    this.setState(()=>({iconCurrent: 'rainy-5'}))
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
        } else {
            switch (condition) { 
                case 'Light Snow':
                this.setState(()=>({iconCurrent: 'snowy-4'}))
                break;
                case 'Snow':
                    this.setState(()=>({iconCurrent: 'snowy-5'}))
                break;
                case 'Heavy Snow':
                    this.setState(()=>({iconCurrent: 'snowy-6'}))
                break;
                case 'Clear':
                    this.setState(()=>({iconCurrent: 'night'}))
                break;
                case 'Overcast':
                    this.setState(()=>({iconCurrent: 'cloudy'}))
                break;
                case 'Partly Cloudy':
                    this.setState(()=>({iconCurrent: 'cloudy-night-2'}))
                break;
                case 'Mostly Cloudy':
                    this.setState(()=>({iconCurrent: 'cloudy'}))
                break;
                case 'Scattered Clouds':
                    this.setState(()=>({iconCurrent: 'cloudy-night-2'}))
                break;  
                case 'Light Rain':
                    this.setState(()=>({iconCurrent: 'rainy-4'}))
                break;
                case 'Rain':
                    this.setState(()=>({iconCurrent: 'rainy-5'}))
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
            
    }
    getUmbrellaForecast = () => {
        let futureCondition = this.props.currentWeather.futureCondition;
        switch (futureCondition) { 
            case 'Light Snow':
                this.setState(()=>({forecast: 'No Umbrella, catch some flakes on your tongue.'}))
            break;
            case 'Snow':
                this.setState(()=>({forecast: 'If you don\'t like snow you might want to bring one'}))
            break;
            case 'Heavy Snow':
                this.setState(()=>({forecast: 'Bring a shovel instead.'}))
            break;
            case 'Clear':
                this.setState(()=>({forecast: 'No umbrella but grab some sunblock if you\'re pasty.'}))
            break;
            case 'Overcast':
                this.setState(()=>({forecast: 'No umbrella needed but can you ever really trust clouds?'}))
            break;
            case 'Partly Cloudy':
                this.setState(()=>({forecast: 'No umbrella, but take some time to look for shapes in the clouds.'}))
            break;
            case 'Mostly Cloudy':
                this.setState(()=>({forecast: 'No umbrella needed but can you ever really trust clouds?'}))
            break;
            case 'Scattered Clouds':
                this.setState(()=>({forecast: 'No umbrella, but take some time to look for shapes in the clouds.'}))
            break;  
            case 'Light Rain':
                this.setState(()=>({forecast: 'Take one, it\'s gonne be a bit misty.'}))
            break;
            case 'Rain':
                this.setState(()=>({forecast: 'You\'ll need an umbrella.'}))
            break;
            case 'Heavy Rain':
                this.setState(()=>({forecast: 'Get an umbrella and a snorkel'}))               
            break;
            case 'Light Thunderstorm':
                this.setState(()=>({forecast: 'Bring an umbrella, just not one with metal.'}))
            break;
            case 'Thunderstorm':
                this.setState(()=>({forecast: 'Bring an umbrella, just not one with metal.'}))
            break;
            case 'Heavy Thunderstorm':
                this.setState(()=>({forecast: 'You\'re better off staying inside.'}))
            break;
            default:
    
        }
    }
    loadWeather = () => {
         let i = 0;
         let initInterval = setInterval(()=> {
                 i += 1;
                 if (i <= 7) {
                     this.setState(() => ({loader: false}));
                     this.getWeatherIcon();
                     this.getUmbrellaForecast();
                     console.log('Loading Current Weather');
                 } else if (i > 7 && this.state.iconCurrent === '') {
                     console.log('Error loading weather');
                 }
         }, 1000);
    }
    setLoader = () => {
        this.setState(()=>({loader: true}))
        setTimeout(()=>{
            this.setState(()=>({loader: false}))
        }, 3000)
    }
    componentDidMount = () => {
        this.loadWeather();
    }
    render() {
        return (
            
            <div>
                <h1 className="extended-forecast__title">Current Weather</h1>
                <Search onSubmit={
                    this.setLoader
                } />
                {this.state.loader == true ? (<Loader />)
                     : ( this.state.iconCurrent === ''  ? (<Loader />) 
                        : ( <div className="current-weather">
                            
                            <div className="current-weather__container">
                            
                                <div className="current-weather__image-container">
                                    <img className="current-weather__image" src={'./images/WeatherIcons/' + this.state.iconCurrent + '.svg'} /> 
                                </div>
                                    <div className="current-weather__conditions">
                                        <h1 className="current-weather__temp">
                                            {this.props.currentWeather.temperature + String.fromCharCode(176)}F - {this.props.currentWeather.condition} 
                                        </h1>
                                        <h3 className="current-weather__location">{this.props.currentWeather.city}, {this.props.currentWeather.state}</h3>
                                    </div>  
                                </div>

                                <div className="current-weather__conditions">
                                    <h2 className="current-weather__temp">{this.state.forecast}</h2>
                                </div>
                            
                                <div className="current-weather__short-cast">
                                    { 
                                        this.props.shortCast.map((day)=> 
                                            <ShortCast 
                                                key={day.period + 1}
                                                iconImage={day.icon}
                                                title={day.title}
                                                text={day.fcttext}
                                            />
                                        )
                                        
                                    }
                                </div>

                            </div>
                        )
                    )
                }
            </div>
            
        )
    };
};


const mapStateToProps = (state) => {
    return {
        api: state.api,
        currentWeather: state.currentWeather,
        shortCast: state.shortCast
    };
}

export default connect(mapStateToProps)(CurrentWeather);