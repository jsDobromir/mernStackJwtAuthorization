import ALERT_TYPES from './alertTypes';
import uuid from "uuid";

export const setAlert = (msg,alertType) => dispatch => {
    const id = uuid.v4();
    dispatch({
        type : ALERT_TYPES.ADD_ALERT,
        payload : {id,msg,alertType}
    });
    setTimeout(()=>{dispatch({type : ALERT_TYPES.REMOVE_ALERT,payload : id})},5000)
}
