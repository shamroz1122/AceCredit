import React, { useState, useEffect } from 'react'
import { View, Text, Box, VStack, Avatar } from 'native-base'
import { TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import profileImage from '../../../assets/profile.png'
import { connect } from 'react-redux'

function Profile(props) {
    const [state, setState] = useState({
        user: {}
    })
    useEffect(() => {

        console.log(props.user)
        setState((state) => ({
            ...state,
            user: props.user,

        }))

    }, [props.user])

    return (
        <View style={{ flex: 1, backgroundColor: '#1f1f1f' }}>
            <View style={{ flex: 1, width: '70%', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
                <Avatar bg="#F8CF6E" alignSelf="center" size="xl" source={profileImage}>
                    GG
                </Avatar>
                <View style={{ flexDirection: 'column' }}>
                    <Text fontFamily="Outfit-Medium" color="#FFFFFF" fontSize={22}>{state.user.name}</Text>
                    <Text fontFamily="Outfit-Regular" color="#FFFFFF" fontSize="sm">{state.user.email}</Text>

                </View>
            </View>
            <View style={{ flex: 3, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} p="4">
                    <TouchableOpacity activeOpacity={1} onPress={() => props.navigation.navigate('CompleteProfile')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Box alignItems='center' rounded="lg" justifyContent="center" bg={{
                            linearGradient: {
                                colors: ["#F8CF6E", "#F6B839"],

                            }
                        }} h="12" w="12" >

                            <Feather size={26} name="user" color="#000000" />

                        </Box>
                        <Text pl="5" color="#ffffff" fontFamily="Outfit-Regular" fontSize="sm">
                            NRIC Name
                        </Text>
                    </TouchableOpacity>
                    <MaterialIcons onPress={() => props.navigation.navigate('CompleteProfile')} size={22} name="arrow-forward-ios" color="#F8CD69" />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} p="4">
                    <TouchableOpacity activeOpacity={1} onPress={() => props.navigation.navigate('ReferFriend')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Box alignItems='center' rounded="lg" justifyContent="center" bg={{
                            linearGradient: {
                                colors: ["#F8CF6E", "#F6B839"],

                            }
                        }} h="12" w="12" >

                            <Feather size={26} name="users" color="#000000" />

                        </Box>
                        <Text pl="5" color="#ffffff" fontFamily="Outfit-Regular" fontSize="sm">
                            Refer a Friend
                        </Text>
                    </TouchableOpacity>

                    <MaterialIcons onPress={() => props.navigation.navigate('ReferFriend')} size={22} name="arrow-forward-ios" color="#F8CD69" />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} p="4">
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Box alignItems='center' rounded="lg" justifyContent="center" bg={{
                            linearGradient: {
                                colors: ["#F8CF6E", "#F6B839"],

                            }
                        }} h="12" w="12" >

                            <MaterialIcons size={26} name="language" color="#000000" />

                        </Box>
                        <Text pl="5" color="#ffffff" fontFamily="Outfit-Regular" fontSize="sm">
                            Language
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text pl="5" color="#F8CD69" fontFamily="Outfit-Regular" fontSize="sm">
                            English
                        </Text>
                        <MaterialIcons size={22} name="arrow-forward-ios" color="#F8CD69" />

                    </View>

                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} p="4">
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Box alignItems='center' rounded="lg" justifyContent="center" bg={{
                            linearGradient: {
                                colors: ["#F8CF6E", "#F6B839"],

                            }
                        }} h="12" w="12" >

                            <Feather size={26} name="info" color="#000000" />

                        </Box>
                        <Text pl="5" color="#ffffff" fontFamily="Outfit-Regular" fontSize="sm">
                            About AceCredit
                        </Text>
                    </View>
                    <MaterialIcons size={22} name="arrow-forward-ios" color="#F8CD69" />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} p="4">
                    <TouchableOpacity activeOpacity={1} onPress={() => props.navigation.navigate('Logout')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Box alignItems='center' rounded="lg" justifyContent="center" bg={{
                            linearGradient: {
                                colors: ["#F8CF6E", "#F6B839"],

                            }
                        }} h="12" w="12" >

                            <MaterialCommunityIcons size={26} name="logout" color="#000000" />

                        </Box>
                        <Text pl="5" color="#ffffff" fontFamily="Outfit-Regular" fontSize="sm">
                            Logout
                        </Text>
                    </TouchableOpacity>
                    <MaterialIcons size={22} name="arrow-forward-ios" color="#F8CD69" />
                </View>
            </View>

        </View>
    )
}


const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}


export default connect(mapStateToProps, null)(Profile)
