/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react'
import type { Node } from 'react';
import {
  StatusBar,
  Platform
} from 'react-native';


import AppNavigator from './src/navigation/AppNavigator';
import store from './src/redux/store'
import { Provider } from 'react-redux'
import { NativeBaseProvider } from "native-base";
import SplashScreen from 'react-native-splash-screen'
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification, { Importance } from "react-native-push-notification";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setDeviceToken } from './src/redux/actions/authActions'


const config = {
  dependencies: {
    "linear-gradient": require("react-native-linear-gradient").default,
  },
};

PushNotification.createChannel(
  {
    channelId: "acecredit-loans", // (required)
    channelName: "Loans Notifications", // (required)
    channelDescription: "A channel to notify you about your loan status", // (optional) default: undefined.
    playSound: true, // (optional) default: true
    soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    smallIcon: "ic_notification",
  },
  (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);


// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    // AsyncStorage.setItem("device_token", token.token);
    let device_token = token.token
    store.dispatch(setDeviceToken({ device_token: device_token }))
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    // console.log("NOTIFICATION:", notification);



    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

const App: () => Node = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, [])
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
