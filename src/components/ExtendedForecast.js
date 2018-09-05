import React from 'react';
import {connect} from 'react-redux';
import ExtendedCastDay from './ExtendedCastDays';
import Loader from './Loader';
import Search from './Search';

export class ExtendedForecast extends React.Component {
    state = {
        loader: false
    }
    setLoader = () => {
        this.setState(()=>({loader: true}))
        setTimeout(()=>{
            this.setState(()=>({loader: false}))
        }, 3000)
    }
    componentDidMount = () => {
        let i = 0;
        let interval = setInterval(()=> {
            if (this.props.forecast) {
                i += 1;
                if (i < 6) {
                    this.setState(() => ({loader: true}));
                }
            }
        }, 500);
    }
    render() {
        return (
            
            <div className="extended-forecast">
                <h1 className="extended-forecast__title">Extended Forecast</h1>
                <h2 className="extended-forecast__title is--for">for</h2>
                <h1 className="extended-forecast__title">{this.props.currentWeather.city + ', ' + this.props.currentWeather.state}</h1>
                <Search onSubmit={this.setLoader}/>
                <div className="extended-forecast__container">
                {
                    this.state.loader === true ? (
                    this.props.forecast.map((day, index) => 
                        <ExtendedCastDay 
                            index={index}
                            key={day.date.weekday}
                            weekday={day.date.weekday_short}
                            month={day.date.monthname_short}
                            monthDay={day.date.day}
                            highF={day.high.fahrenheit}
                            highC={day.high.celcius}
                            lowF={day.low.fahrenheit}
                            lowC={day.low.celcius}
                            conditions={day.conditions}
                            iconImage={day.icon}
                            rain={day.qpf_allday.in}
                            snow={day.snow_allday.in}
                            
                        />
                    )
                ) : (<Loader />)
                }
                </div>
            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        currentWeather: state.currentWeather,
        forecast: state.forecast
    };
}
export default connect(mapStateToProps)(ExtendedForecast);