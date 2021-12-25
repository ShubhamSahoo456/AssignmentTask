import React from "react";
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension'
import {userLoginReducer} from './reducers/LoginReducers'

const loginStorage = localStorage.getItem('userinfo')?JSON.parse(localStorage.getItem('userinfo')) : null
const initialState={
    userLogin:{userinfo:loginStorage}
}

const reducer = combineReducers({
    userLogin:userLoginReducer,
})


const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store