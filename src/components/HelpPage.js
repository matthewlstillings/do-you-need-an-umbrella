import React from 'react';

export const HelpPage  = () => (
    <div className="help-container">
        <h1 className="extended-forecast__title">Help Page</h1>
        <p className="help__content">This page exists soley to explain why I built this. 
        This website was nothing more than a test for me to play with APIs and React together so that I could include 
        something in my portfolio. If you like what you see please visit my <a className="help__content-link" href="https://mattstillings.com" target="_blank">website</a> to contact me.
        </p>
        <div className="help__image-container">
            <img className="help__image" src={'./images/WeatherIcons/day.svg'} />
            <img className="help__image" src={'./images/WeatherIcons/cloudy.svg'} />
            <img className="help__image" src={'./images/WeatherIcons/night.svg'} />
        </div>
        <p className="help__content">Animated weather icons created by: <a href="https://www.amcharts.com/free-animated-svg-weather-icons/" className="help__content-link" target="_blank">amCharts</a>.</p>
        
    </div>
);

export default HelpPage;