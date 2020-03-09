import ALERT_TYPES from './alertTypes';

const INITIAL_STATE = [];


const alertReducer = (state=INITIAL_STATE,action) => {

    switch(action.type){
        case ALERT_TYPES.ADD_ALERT:
            return [...state,action.payload]
        case ALERT_TYPES.REMOVE_ALERT:
            return state.filter(alert => alert.id!==action.payload);
        default:
            return state;
    }
};

export default alertReducer;