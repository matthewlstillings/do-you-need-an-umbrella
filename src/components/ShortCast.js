import React from 'react';

const ShortCast = (props) => (
        <div className="short-cast">
            <img className="short-cast__image" src={'./images/WeatherIcons/' + props.iconImage + '.svg'}/>    
            <h2 className="short-cast__conditions">{props.title}</h2>
            <p className="short-cast__text">{props.text}</p>
        </div>      
);

export default ShortCast;


