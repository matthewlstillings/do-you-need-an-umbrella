let extendedCastDefaultState= [];

export default (state = extendedCastDefaultState, action) => {
    switch (action.type) {
        case 'EXTENDED_CAST':
        return [
            ...state,
            action.forecast
        ]

        case 'CLEAR_EC':
        return []

        default: 
        return state;
    }
}