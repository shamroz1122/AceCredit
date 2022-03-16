import React from 'react'
import { View, Text, Box, VStack, Avatar } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import profileImage from '../../../assets/profileImage.png'
export default function Profile() {
    return (
        <View style={{ flex: 1, backgroundColor: '#1f1f1f' }}>
            <View style={{ flex: 1, width: '70%', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
                <Avatar bg="#F8CF6E" alignSelf="center" size="xl" source={profileImage}>
                    GG
                </Avatar>
                <View style={{ flexDirection: 'column' }}>
                    <Text fontFamily="Outfit-Medium" color="#FFFFFF" fontSize={22}>Moeed Shahid</Text>
                    <Text fontFamily="Outfit-Regular" color="#FFFFFF" fontSize="sm">60162131554</Text>

                </View>
            </View>
            <View style={{ flex: 3, flexDirection: 'row' }}>

            </View>

        </View>
    )
}