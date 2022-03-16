/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import {
  StatusBar,
} from 'react-native';


import AppNavigator from './src/navigation/AppNavigator';
import store from './src/redux/store'
import { Provider } from 'react-redux'
import { NativeBaseProvider } from "native-base";

const config = {
  dependencies: {
    "linear-gradient": require("react-native-linear-gradient").default,
  },
};



const App: () => Node = () => {

  return (
    <Provider store={store}>
      <NativeBaseProvider config={config} >
        <StatusBar backgroundColor="#1F1F1F" barStyle={'light-content'} />
        <AppNavigator />
      </NativeBaseProvider>
    </Provider>

  );
};


export default App;
