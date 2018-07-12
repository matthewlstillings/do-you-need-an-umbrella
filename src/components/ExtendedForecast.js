import React from 'react';
import {connect} from 'react-redux';
import ExtendedCastDay from './ExtendedCastDays';
import Loader from './Loader';

export class ExtendedForecast extends React.Component {
    state = {
        render: false
    }
    componentDidMount = () => {
        let i = 0;
        let interval = setInterval(()=> {
            if (this.props.forecast) {
                i += 1;
                if (i < 6) {
                    this.setState(() => ({render: true}));
                }
            }
        }, 1000);
    }
    render() {
        return (
            
            <div className="extended-forecast">
                <h1 className="extended-forecast__title">Extended Forecast</h1>
                <div className="extended-forecast__container">
                {
                    this.state.render === true ? (
                    this.props.forecast.map((day) => 
                        <ExtendedCastDay 
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
        forecast: state.forecast
    };
}
export default connect(mapStateToProps)(ExtendedForecast);