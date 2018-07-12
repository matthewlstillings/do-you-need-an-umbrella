import React from 'react';
import {connect} from 'react-redux';
import {startLogin} from '../actions/auth';


export const LogIn = ({startLogin}) => (
        <div className="log-in">
            <div className="log-in__container">
                <div className="log-in__text__container">  
                    <h1>Title</h1>
                    <p>Subtitle</p>
                </div>
                <button onClick={startLogin} >Log In</button>
            </div>
        </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLogin: ()=> dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LogIn);

