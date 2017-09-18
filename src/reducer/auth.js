import * as types from 'action/ActionTypes';
import update from 'immutability-helper';

const initialState = {
    login: {
        status: 'INIT',
        token: ''
    },
    check: {
        status: 'INIT'
    },
    register: {
        status: 'INIT'
    }
};

export default function auth(state = initialState, action) {
    switch(action.type) {
        /* LOGIN */
        case types.AUTH_LOGIN:
            return update(state, {
                login: {
                    status: { $set: 'WAITING' }
                }
            });
        case types.AUTH_LOGIN_SUCCESS:
            return update(state, {
                login: {
                    status: { $set: 'SUCCESS' },
                    auth: { $set: action.auth }
                }
            });
        case types.AUTH_LOGIN_FAILURE:
            return update(state, {
                login: {
                    status: { $set: 'FAILURE' },
                }
            });
        case types.AUTH_CHECK:
            return update(state, {
                check: {
                    status: { $set: 'WAITING' }
                }
            });
        case types.AUTH_CHECK_SUCCESS:
            return update(state, {
                check: {
                    status: { $set: 'SUCCESS' },
                }
            });
        case types.AUTH_CHECK_FAILURE:
            return update(state, {
                check: {
                    status: { $set: 'FAILURE' },
                }
            });
        /* REGISTER */
        case types.AUTH_REGISTER:
            return update(state, {
                register: {
                    status: { $set: 'WAITING' }
                }
            });
        case types.AUTH_REGISTER_SUCCESS:
            return update(state, {
                register: {
                    status: { $set: 'SUCCESS' }
                }
            });
        case types.AUTH_REGISTER_FAILURE:
            return update(state, {
                register: {
                    status: { $set: 'FAILURE' },
                }
            });
        default:
            return state;
    }
}
