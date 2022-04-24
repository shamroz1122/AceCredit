
import { View, Text, Box, Button, Stack, Image, Center } from 'native-base'
import { TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Frame from '../../../assets/Frame.png'
import qrcode from '../../../assets/qr-code.png'
export default function ReferFriend(props) {
    return (
        <View style={{ flex: 1, backgroundColor: '#1f1f1f', padding: 15 }}>
            <SafeAreaView>
                <ScrollView>
                    <TouchableOpacity onPress={() => props.navigation.navigate('ReferralHistory')} shadow="7" style={{ flex: 1, backgroundColor: "#2D2D2D" }} rounded="lg">
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} py="3" px="1">
                            <View activeOpacity={1} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text pl="5" color="#ffffff" fontFamily="Outfit-Medium" fontSize="sm">
                                    See How Referral Works
                                </Text>
                            </View>
                            <MaterialIcons size={22} name="arrow-forward-ios" color="#ffffff" />
                        </View>
                        <View style={{ flex: 1, flexDirection: 'column' }} pb="4">
                            <Center>
                                <Image source={Frame} alt="Alternate Text" size={210} />
                            </Center>
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <Text pt="2" color="#ffffff" fontFamily="Outfit-Medium" fontSize="sm">
                            Invite your friends to AceCredit apps now!
                        </Text>
                        <View shadow="7" style={{ justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#2D2D2D', height: 200 }} mt="2" rounded="lg" >
                            <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                                Share Your Referral Code
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text color="#F8CD69" fontFamily="Outfit-Regular" fontSize="lg">
                                    60162131554
                                </Text>
                                <View pl="2" >
                                    <Feather size={18} name="copy" color="#F8CD69" />
                                </View>
                            </View>
                            <Center>
                                <Image source={qrcode} alt="Alternate Text" size={100} />
                            </Center>
                            <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={10}>
                                Save QR Code
                            </Text>
                        </View>
                        <View pb="10" style={{ flexDirection: 'row' }}>
                            <Stack pt="4" space={4} w="100%" maxW="350px" >
                                <Box rounded="sm" bg={{
                                    linearGradient: {
                                        colors: ["#F8CF6E", "#F6B839"],
                                        start: [0, 0],
                                        end: [0, 1]
                                    }
                                }}>
                                    <Button colorScheme="coolGray" bg="transparent" activeOpacity={1} _text={{ color: "#2D2D2D", fontFamily: 'Outfit-SemiBold' }} py={3} size="lg">
                                        Share Now
                                    </Button>
                                </Box>
                            </Stack>

                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}