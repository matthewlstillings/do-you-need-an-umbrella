let extendedCastDefaultState= [];

export default (state = extendedCastDefaultState, action) => {
    switch (action.type) {
        case 'EXTENDED_CAST':
        return [
            ...state,
            action.forecast
        ]
        default: 
        return state;
    }
}