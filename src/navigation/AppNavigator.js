import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthLoadingScreen from '../screens/auth/AuthLoadingScreen';
import { connect } from 'react-redux'
import MainStackNavigator from './MainStackNavigator';

function AppNavigator(props) {

    if (props.isLoadingApp) {
        // We haven't finished checking for the token yet
        return <AuthLoadingScreen />;
    }

    return (
        <NavigationContainer>
            <MainStackNavigator />
        </NavigationContainer>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isLoadingApp: state.auth.isLoadingApp
    }
}

export default connect(mapStateToProps, null)(AppNavigator)


