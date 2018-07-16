import React from 'react';
import {connect} from 'react-redux';

export const Loader = (props) => (
    <div className="loader-container">
        <div className='loader'>
            <img className="firstIcon loader-icon" src={'./images/WeatherIcons/day.svg'} />
            <img className="secondIcon loader-icon" src={'./images/WeatherIcons/night.svg'} />
            <div className={"loading-div " + (props.currentWeather.sunPosition === true ? 'add-light' : '')}><h1>Loading...</h1></div>
        </div>
    </div>
)

const mapStateToProps = (state) => {
    return {
        currentWeather: state.currentWeather
    };
}
export default connect(mapStateToProps)(Loader);