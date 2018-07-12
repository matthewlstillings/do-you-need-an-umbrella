import authReducer from '../../reducers/auth';

test('should set uid login', () => {
    const action = {
        type: 'LOGIN',
        uid: '123666'
    };
    const state = authReducer({}, action);
    expect(state.uid).toEqual(action.uid);
});


test('should clear uid on logout', () => {
    const action = {
        type: 'LOGOUT',
    };
    const state = authReducer({uid: 'dddd'}, action);
    expect(state).toEqual({});
});