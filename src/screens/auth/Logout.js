import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { logOutUser } from '../../redux/actions/authActions';
import { connect } from 'react-redux'

import AsyncStorage from '@react-native-async-storage/async-storage';
class Logout extends React.Component {
  constructor(props) {
    super(props);
    this._AppAsync();
  }

  _AppAsync = async () => {

    const data = await AsyncStorage.getItem('Data');
    this.props.dispatch(logOutUser(data));
    this.props.navigation.navigate('DownloadingMedia');
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="#5FB8B6" size="large" />
      </View>
    );
  }
}



const mapDispatchToProps = (dispatch) => {

  return {
    logOutUser: (User) => dispatch(logOutUser(User))
  }
}

export default connect(mapDispatchToProps)(Logout)
