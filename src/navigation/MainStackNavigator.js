import React from 'react'
import { Platform, View } from 'react-native'
import { Image, Icon } from 'native-base'
import Login from '../screens/auth/Login';
import AuthLoadingScreen from '../screens/auth/AuthLoadingScreen';
import SignUp from '../screens/auth/SignUp';
import MyLoans from '../screens/home/MyLoans';
import ApplyLoan from '../screens/home/ApplyLoan';
import Logout from '../screens/auth/Logout';
import CompleteProfile from '../screens/home/CompleteProfile';
import Home from '../screens/home/Home';
import Notification from '../screens/home/Notification';
import Profile from '../screens/home/Profile';
import ReferFriend from '../screens/home/ReferFriend';
import ReferralHistory from '../screens/home/ReferralHistory';
import TermsConditions from '../screens/auth/TermsConditions';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import grid from '../../assets/grid.png'
import headphones from '../../assets/headphones.png'
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
import { connect } from 'react-redux'


const HomeStack = (props) => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen options={{
                headerShown: true,
                gestureEnabled: false,
                headerStyle: { backgroundColor: '#2D2D2D' },
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                    fontSize: 18,
                    fontFamily: 'Outfit-Medium',
                },
                headerTitleAlign: 'center',
                headerLeft: (props) => (
                    <Image source={grid} alt="grid image" size="5" />
                ),
                headerRight: (props) => (

                    <Image source={headphones} alt="headphones image" size="6" />
                )
            }} name="Home" component={Home} />
            <Stack.Screen options={{

                headerShown: true,
                title: 'Apply Loan Details',
                gestureEnabled: false,
                headerStyle: { backgroundColor: '#2D2D2D' },
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                    fontSize: 18,
                    fontFamily: 'Outfit-Medium',
                },
                headerTitleAlign: 'center',
            }} name="ApplyLoan" component={ApplyLoan} />
        </Stack.Navigator>
    )
}

const ProfileStack = (props) => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen options={{
                headerShown: true,
                gestureEnabled: false,
                headerStyle: { backgroundColor: '#2D2D2D' },
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                    fontSize: 18,
                    fontFamily: 'Outfit-Medium',
                },
                headerTitleAlign: 'center',
                headerLeft: (props) => (
                    <Image source={grid} alt="grid image" size="5" />
                ),
                headerRight: (props) => (

                    <Image source={headphones} alt="headphones image" size="6" />
                )
            }} name="Profile" component={Profile} />
            <Stack.Screen options={{

                headerShown: true,
                title: 'Refer A Friend',
                gestureEnabled: false,
                headerStyle: { backgroundColor: '#2D2D2D' },
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                    fontSize: 18,
                    fontFamily: 'Outfit-Medium',
                },
                headerTitleAlign: 'center',
            }} name="ReferFriend" component={ReferFriend} />
            <Stack.Screen options={{

                headerShown: true,
                title: 'Your Referral History',
                gestureEnabled: false,
                headerStyle: { backgroundColor: '#2D2D2D' },
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                    fontSize: 18,
                    fontFamily: 'Outfit-Medium',
                },
                headerTitleAlign: 'center',
            }} name="ReferralHistory" component={ReferralHistory} />
            <Stack.Screen options={{
                headerShown: true,
                title: 'Profile Completion',
                gestureEnabled: false,
                headerStyle: { backgroundColor: '#2D2D2D' },
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                    fontSize: 18,
                    fontFamily: 'Outfit-Medium',
                },
                headerTitleAlign: 'center',
            }} name="CompleteProfile" component={CompleteProfile} />
            <Stack.Screen options={{
                headerShown: false
            }} name="Logout" component={Logout} />
        </Stack.Navigator>
    )
}

const MainBottomTabNavigator = (props) => {
    return (
        <Tab.Navigator
            screenOptions={{

                tabBarActiveTintColor: '#F8CD69',
                tabBarStyle: { marginTop: -10, borderTopColor: '#2D2D2D', borderTopLeftRadius: 8, borderTopRightRadius: 8, backgroundColor: '#2D2D2D', height: Platform.OS === 'ios' ? 90 : 80 },
                tabBarItemStyle: { paddingTop: Platform.OS === 'ios' ? 10 : 10, paddingBottom: Platform.OS === 'ios' ? 0 : 15 },
                tabBarInactiveTintColor: '#CFCFCF',
                headerShown: true,
                gestureEnabled: false,
                headerStyle: { backgroundColor: '#2D2D2D' },
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                    fontSize: 18,
                    fontFamily: 'Outfit-Medium',
                },
                headerTitleAlign: 'center',
                headerLeft: (props) => (
                    <Image source={grid} alt="grid image" size="5" />
                ),
                headerRight: (props) => (

                    <Image source={headphones} alt="headphones image" size="6" />
                ),
                headerLeftContainerStyle: {
                    paddingLeft: 16
                },
                headerRightContainerStyle: {
                    paddingRight: 16
                }
            }}
        >
            <Tab.Screen
                name="HomeStack"
                options={{
                    headerShown: false,
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="home" color={color} size={size} />
                    ),
                }}
                component={HomeStack} />
            <Tab.Screen
                name="MyLaons"
                options={{
                    title: 'My Loans',
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="file-text" color={color} size={size} />
                    )
                }}
                component={MyLoans} />
            <Tab.Screen
                name="Notification"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="notifications-none" color={color} size={size} />
                    ),
                }}
                component={Notification} />
            <Tab.Screen
                name="ProfileStack"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => (
                        <Feather name="user" color={color} size={size} />
                    ),
                }}
                component={ProfileStack} />
        </Tab.Navigator>
    )
}


const MainStackNavigator = (props) => {

    return (

        <Stack.Navigator>
            {props.isAuthenticated == false ? (
                // No token found, user isn't signed in
                <>

                    <Stack.Screen options={{
                        headerShown: false,
                        gestureEnabled: false
                    }} name="Login" component={Login} />
                    <Stack.Screen options={{
                        headerShown: false,
                        gestureEnabled: false
                    }} name="SignUp" component={SignUp} />
                    <Stack.Screen options={{
                        headerShown: true,
                        gestureEnabled: false,
                        headerStyle: { backgroundColor: '#2D2D2D' },
                        title: 'Terms & Conditions',
                        headerTintColor: '#ffffff',
                        headerTitleStyle: {
                            fontSize: 18,
                            fontFamily: 'Outfit-Medium',
                        },
                        headerTitleAlign: 'center'
                    }} name="TermsConditions" component={TermsConditions} />

                </>
            ) : (
                // User is signed in
                <Stack.Screen
                    name="dashbaord"
                    options={{
                        headerShown: false,
                    }}
                    component={MainBottomTabNavigator} />

            )}
        </Stack.Navigator>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
}

export default connect(mapStateToProps, null)(MainStackNavigator)
