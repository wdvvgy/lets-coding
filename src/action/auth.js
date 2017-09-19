import axios from 'axios';
import * as types from './ActionTypes';

export function loginRequest(formData){
    return (dispatch) => {
        dispatch(login());
        return axios.post('/api/auth/login', {
            formData
        }).then((res) => {
            dispatch(loginSuccess(res));
        }).catch((err) => {
            dispatch(loginFailure(err));
        });
    }
}

export function login() {
    return {
        type: types.AUTH_LOGIN
    };
}

export function loginSuccess(response) {
    return {
        type: types.AUTH_LOGIN_SUCCESS,
        auth: response.data.auth,
        returnData: response
    };
}

export function loginFailure(error) {
    return {
        type: types.AUTH_LOGIN_FAILURE,
        returnData: error
    };
}

/* Register */
export function RegisterRequest(formData) {
    return (dispatch) => {
        dispatch(register());
        return axios.post('/api/auth/register', {
            formData
        }).then((response) => {
            dispatch(registerSuccess(response));
        }).catch((error) => {
            dispatch(registerFailure(error));
        });
    };
}

export function register() {
    return {
        type: types.AUTH_REGISTER
    };
}

export function registerSuccess(response) {
    return {
        type: types.AUTH_REGISTER_SUCCESS,
        returnData: response
    };
}

export function registerFailure(error) {
    return {
        type: types.AUTH_REGISTER_FAILURE,
        returnData: error
    };
}

/* CHECK */
export function checkRequest(token) {
    return (dispatch) => {
        dispatch(check());
        // API REQUEST
        let tokenData = { token: token };
        return axios.get('/api/auth/check', {
            params: tokenData
        }).then((response) => {
            dispatch(checkSuccess(response));
        }).catch((error) => {
            dispatch(checkFailure(error));
        });
    };
}

export function check() {
    return {
        type: types.AUTH_CHECK
    };
}

export function checkSuccess(response) {
    return {
        type: types.AUTH_CHECK_SUCCESS,
        returnData: response
    };
}

export function checkFailure(error) {
    return {
        type: types.AUTH_CHECK_FAILURE,
        returnData: error
    };
}
