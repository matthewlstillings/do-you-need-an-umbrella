
let shortCastDefaultState = [];

export default (state = shortCastDefaultState, action) => {
    switch (action.type) {
        case 'SHORT_CAST':
        return [
            ...state,
            action.shortcast
        ]
        default: 
        return state;
    }
}