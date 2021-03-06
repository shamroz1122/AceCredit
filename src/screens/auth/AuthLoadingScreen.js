import React from 'react';
import { StatusBar, View, ActivityIndicator, Text } from 'react-native';
import { setCurrentUserData, logOutUser } from '../../redux/actions/authActions';
import setBasePath from "../../utils/setBasePath";
import setAuthToken from '../../utils/setAuthToken';
import { connect } from 'react-redux'

import AsyncStorage from '@react-native-async-storage/async-storage';
class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._AppAsync();
  }

  // Fetch the data from storage to navigate to our appropriate place
  _AppAsync = async () => {

    setTimeout(
      function () {
        this.checkAuthentication();
      }
        .bind(this),
      1500
    );

  }

  checkAuthentication = async () => {
    // AsyncStorage.clear();
    // screen will be unmounted and thrown away.

    const userToken = await AsyncStorage.getItem('Token');

    const User = await AsyncStorage.getItem('User');
    const parsedUser = JSON.parse(User)

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.

    if (userToken) {

      setBasePath()
      setAuthToken(userToken);
      this.props.dispatch(setCurrentUserData({ data: parsedUser }));
    } else {
      this.props.dispatch(logOutUser())
    }

  }
  // Render any loading content that you like here
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1F1F1F' }}>
        <ActivityIndicator color="#F8CF6E" size="large" />
        {/* <StatusBar barStyle="light-content" backgroundColor="#212832" /> */}
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUserData: (User) => dispatch(setCurrentUserData(User)),
    logOutUser: (User) => dispatch(logOutUser(User))
  }
}

export default connect(mapDispatchToProps)(AuthLoadingScreen)
