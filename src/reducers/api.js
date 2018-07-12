
//Current Weather Reducer

const apiDefault = '';
export default (state = apiDefault, action) => {
    switch (action.type) {
        case 'API_BUILD':
            return action.api
        default:
            return state;
    }
}
