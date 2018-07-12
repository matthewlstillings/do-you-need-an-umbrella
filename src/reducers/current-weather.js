
//Current Weather Reducer

const currentWeatherDefaultState = {
    city: '',
    state: '',
    temperature: '',
    condition: ''
};
export default (state = currentWeatherDefaultState, action) => {
    switch (action.type) {
        case 'CURRENT_CITY':
        return {
            ...state,
            city: action.city
        };
        case 'CURRENT_STATE':
        return {
            ...state,
            state: action.state
        };
        case 'CURRENT_TEMP':
        return {
            ...state,
            temperature: action.temperature
        };
        case 'CURRENT_CONDITION':
        return {
            ...state,
            condition: action.condition
        };
        default:
            return state;
    }
}

