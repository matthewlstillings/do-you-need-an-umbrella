import React from 'react';
import {connect} from 'react-redux';
import {APIbuild} from '../actions/api';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';


export class Search extends React.Component {
    state = {
        zip: '',
        error: null,
        onFocus: false
    }
    onFocus = () => {
        !this.state.onFocus && this.setState(()=>({onFocus: true}))
    }
    onZipChange = (e) => {
        const zip = e.target.value;
        this.setState(()=>({zip}));
    }
    onSubmit = () => {
        let zipCode = this.state.zip;
        if (zipCode.match(/[a-zA-Z]+/g) ) {
            this.setState(()=>({error: 'Zipcodes only contain numbers'}));
        } else if (zipCode.length !== 5) {
            this.setState(()=>({error: 'Please enter a valid zipcode'}));
        } else {
            let api = 'https://api.wunderground.com/api/472edd4ba9ba5778/forecast/geolookup/conditions/astronomy/q/' + zipCode + '.json';
            this.props.APIbuild(api);
        }
        this.props.onSubmit();
        this.state.onFocus && this.setState(()=>({onFocus: false}))
        
    }
    
    render() {
        return (
            <form 
                ref={(form) => {this.searchForm = form}}
                onSubmit={(e) => {
                    e.preventDefault();
                    this.onSubmit()
                    this.searchForm.reset();
                    }  
                }
                className='search'
               
                
            >
                <input 
                    type="text"
                    onChange={this.onZipChange}
                    className='search__input'
                    placeholder='Search by Zip Code...'
                    onFocus={this.onFocus}
                    
                />
                <button 
                    type="submit"
                    className={'search__button' + (this.state.onFocus == true ? ' reveal' : '') }
                
                ><FontAwesomeIcon icon={faSearch}/></button>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    APIbuild: (api) => dispatch(APIbuild(api))
})

export default connect(undefined, mapDispatchToProps)(Search);