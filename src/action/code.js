import axios from 'axios';
import * as types from './ActionTypes';

export function runRequest(obj){
    return (dispatch) => {
        dispatch(run());
        return axios.post('/api/code/run', {
            obj
        }).then((res) => {
            dispatch(runSuccess(res));
        }).catch((err) => {
            dispatch(runFailure(err));
        });
    };
}

export function run(){
    return {
        type: types.RUN_CODE
    };
}

export function runSuccess(res){
    return {
        type: types.RUN_CODE_SUCCESS,
        result: res.data.result
    };
}

export function runFailure(err){
    return {
        type: types.RUN_CODE_FAILURE,
        result: err
    };
}

export function saveCodeRequest(obj){
    return (dispatch) => {
        dispatch(saveCode());
        return axios.post('/api/code/save', {
            obj
        }).then((res) => {
            dispatch(saveCodeSuccess(res));
        }).catch((err) => {
            dispatch(saveCodeFailure(err));
        });
    }
}

export function saveCode(){
    return {
        type: types.SAVE_CODE
    };
}

export function saveCodeSuccess(res){
    return {
        type: types.SAVE_CODE_SUCCESS,
        result: res.data.result
    };
}

export function saveCodeFailure(err){
    return {
        type: types.SAVE_CODE_FAILURE,
        result: err
    };
}

export function getCodeRequest(obj){
    return (dispatch) => {
        dispatch(getCode());
        return axios.get(`/api/code/${obj}`, {  })
        .then((res) => {
            dispatch(getCodeSuccess(res));
        }).catch((err) => {
            dispatch(getCodeFailure(err));
        });
    }
}

export function getCode(){
    return {
        type: types.GET_CODE
    };
}

export function getCodeSuccess(res){
    return {
        type: types.GET_CODE_SUCCESS,
        result: res.data.result
    };
}

export function getCodeFailure(err){
    return {
        type: types.GET_CODE_FAILURE,
        result: err
    };
}

export function removeCodeRequest(id) {
    return (dispatch) => {
        dispatch(removeCode());
        return axios.delete(`/api/code/${id}`, { })
        .then((response) => {
            dispatch(removeCodeSuccess(response));
        }).catch((error) => {
            dispatch(removeCodeFailure(error));
        });
    };
}

export function removeCode() {
    return {
        type: types.REMOVE_CODE
    };
}

export function removeCodeSuccess(response) {
    return {
        type: types.REMOVE_CODE_SUCCESS,
        returnData: response.data.result
    };
}

export function removeCodeFailure(error) {
    return {
        type: types.REMOVE_CODE_FAILURE,
        returnData: error
    };
}
