import React from 'react';
import Fade from 'react-reveal';

const ExtendedCastDay = (props) => (
    <Fade bottom delay={150 * props.index} duration={300} distance={'100px'} >
        <div className="extended-forecast__day">
            <div className="extended-forecast__day__date-container">
                <h1 className="extended-forecast__title">{props.weekday}</h1>
                <div className="extended-forecast__month-container">
                    <h1 className="extended-forecast__month">{props.month}</h1>
                    <h1 className="extended-forecast__month-day">{props.monthDay}</h1>
                </div>  
            </div>
            <div className="extended-forecast__temp-container">
                <h2 className="extended-forecast__temp">H: {props.highF + String.fromCharCode(176)}</h2>
                <h2 className="extended-forecast__temp">L: {props.lowF + String.fromCharCode(176)}</h2>
            </div>  
            <p className="extended-forecast__condition">{props.conditions}</p>
            <img className="extended-forecast__image" src={'./images/WeatherIcons/' + props.iconImage + '.svg'}/>    
        </div>
    </Fade>
)

export default ExtendedCastDay;