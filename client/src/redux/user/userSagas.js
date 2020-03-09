import {takeLatest,put,all,call} from 'redux-saga/effects';
import UserActionTypes from './userTypes';
import * as api from '../../utils/api';
import {signUpSuccess,signUpFailure, loginSuccess, loginFail, verifyTokenSuccess, verifyTokenError} from './userActions';
import {setAlert} from '../alerts/alertActions';
// function* signUpStart(payload){
//     const userObj = payload.payload;
//     try{
//         const {data} = yield call(api.signUp,userObj);
//         console.log(data);
//         localStorage.setItem('userToken',data.token);
//         yield put(signUpSuccess(data.employee));       
//     }catch(error){
//         console.log('error block');
//         console.log(error.response.data.message);
//         yield put(signUpFailure(error.response.data.message));
//     }
// }

// function* onSignUpStart(){
//     yield takeLatest(UserActionTypes.SIGN_UP_START,signUpStart);
// }

function* loginStart(payload){
    const userObj = payload.payload;
    
    try{
        const {data} = yield call(api.login,userObj);
        const token = data.token;
        localStorage.setItem('token',token);
        yield put(loginSuccess());
    }catch(error){
        console.log('ERROR',error.response.data.message);
        yield put(setAlert(error.response.data.message,'danger'));
        yield put(loginFail(error.response.data.message));
    }
}

function* ongLoginStart(){
    yield takeLatest(UserActionTypes.LOGIN_START,loginStart);
}

function* verifyToken(payload){
    const token = payload.payload;
    
    try{
        const {data} = yield call(api.verifyToken,{token});
        console.log(data);
        const {currentEmployee} = data.data;
        console.log(data.data);
        yield put(verifyTokenSuccess(currentEmployee));
    }catch(error){
        console.log(error.response.data.message);
        yield put(verifyTokenError(error.response.data.message));
    }
}

function* onTokenVerify(){
    yield takeLatest(UserActionTypes.VERIFY_TOKEN_START,verifyToken);
}

export function* userSagas(){
    yield all([
        //call(onSignUpStart)
        call(ongLoginStart),
        call(onTokenVerify)
    ]);
}