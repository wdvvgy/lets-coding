import * as types from 'action/ActionTypes';
import update from 'immutability-helper';

const initialState = {
    run: {
        runStatus: 'INIT',
        runResult: { }
    },
    code: {
        saveStatus: 'INIT',
        saveId: '',
        getStatus: 'INIT',
        myCode: [ ],
        removeStatus: 'INIT'
    }
};

export default function code(state = initialState, action) {
    switch(action.type) {
        case types.RUN_CODE:
            return update(state, {
                run: {
                    runStatus: { $set: 'WAITING' }
                }
            });
        case types.RUN_CODE_SUCCESS:
            return update(state, {
                run: {
                    runStatus: { $set: 'SUCCESS' },
                    runResult: { $set: JSON.parse(action.result) }
                }
            });
        case types.RUN_CODE_FAILURE:
            return update(state, {
                run: {
                    runStatus: { $set: 'FAILURE' },
                }
            });
        case types.SAVE_CODE:
            return update(state, {
                code: {
                    saveStatus: { $set: 'WAITING' }
                }
            });
        case types.SAVE_CODE_SUCCESS:
            return update(state, {
                code: {
                    saveStatus: { $set: 'SUCCESS' },
                    saveId: { $set: action.result }
                }
            });
        case types.SAVE_CODE_FAILURE:
            return update(state, {
                code: {
                    saveStatus: { $set: 'FAILURE' },
                }
            });
        case types.GET_CODE:
            return update(state, {
                code: {
                    getStatus: { $set: 'WAITING' }
                }
            });
        case types.GET_CODE_SUCCESS:
            return update(state, {
                code: {
                    getStatus: { $set: 'SUCCESS' },
                    myCode: { $set: action.result }
                }
            });
        case types.GET_CODE_FAILURE:
            return update(state, {
                code: {
                    getStatus: { $set: 'FAILURE' }
                }
            });
        case types.REMOVE_CODE:
            return update(state, {
                code: {
                    removeStatus: { $set: 'WAITING' }
                }
            });
        case types.REMOVE_CODE_SUCCESS:
            return update(state, {
                code: {
                    removeStatus: { $set: 'SUCCESS' }
                }
            });
        case types.REMOVE_CODE_FAILURE:
            return update(state, {
                code: {
                    removeStatus: { $set: 'FAILURE'}
                }
            });
        default:
            return state;
    }
}
