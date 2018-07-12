import React from 'react';

export const Loader = () => (
    <div className="loader-container">
        <div className="loader">
            <img className="firstIcon loader-icon" src={'./images/WeatherIcons/day.svg'} />
            <img className="secondIcon loader-icon" src={'./images/WeatherIcons/night.svg'} />
            <div className="loading-div"><h1>Loading...</h1></div>
        </div>
    </div>
)

export default Loader;