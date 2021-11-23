/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import authReducer from './src/store/reducers/auth';
import RootStackScreen from './src/routes';
import GlobalTheme from './src/contextProviders/globalThemeProvider';
import {API} from './src/constants/apiConstant';
import {Root} from 'native-base';
import {MenuProvider} from 'react-native-popup-menu';

import 'intl';
import 'intl/locale-data/jsonp/en';

if (API.currentEnv !== 'prod') {
  GLOBAL.XMLHttpRequest =
    GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
}

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <GlobalTheme dark={false}>
        <Root>
          <MenuProvider>
            <RootStackScreen />
          </MenuProvider>
        </Root>
      </GlobalTheme>
    </Provider>
  );
};

export default App;
