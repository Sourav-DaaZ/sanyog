/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView,Text} from 'react-native';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import authReducer from './src/store/reducers/auth';

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(
rootReducer, 
applyMiddleware(thunk)
);

const App = () => {
  return (
    <Provider store={store}>
        <SafeAreaView><Text>Setup Done</Text></SafeAreaView>
    </Provider>
  );
};


export default App;
