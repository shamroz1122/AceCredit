import React, { useRef, useState } from 'react'
import { Image, Slider, Button, Divider, Pressable, Text, View, Box, VStack, Modal, Center, Stack } from 'native-base'
import { SafeAreaView, ScrollView } from 'react-native';
function ApplyLoan(props) {
    const [onChangeValue, setOnChangeValue] = React.useState(1500);
    const [onChangeDaysValue, setOnChangeDaysValue] = React.useState(14);
    return (
        <View style={{ flex: 1, backgroundColor: '#1f1f1f', }} p="5">
            <View styl={{ flex: 1 }}>
                <Box bg={{
                    linearGradient: {
                        colors: ["#F8CF6E", "#F6B839"],
                        start: [0, 0],
                        end: [0, 1]
                    }
                }} p="8" rounded='lg' alignItems="center" >
                    <Text color="#000000" fontWeight="500" fontFamily="Outfit-Medium" fontSize="lg">Payment Amount (RM)</Text>
                    <Text color="#000000" fontFamily="Outfit-Bold" fontSize="4xl">300.00</Text>
                </Box>
            </View>

            <View style={{ flex: 2 }} pt="15">
                <SafeAreaView>
                    <ScrollView>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text color="#ffffff" fontFamily="Outfit-Medium" fontSize="sm">
                                Requested Amount
                            </Text>
                            <Text color="#F8CD69" fontFamily="Outfit-Regular" fontSize="sm">
                                MYR {onChangeValue}
                            </Text>
                        </View>
                        <View pt="2">
                            <Slider size="lg" defaultValue={1500} minValue={0} maxValue={5000} colorScheme="yellow" onChange={v => {
                                setOnChangeValue(Math.floor(v));
                            }} >
                                <Slider.Track>
                                    <Slider.FilledTrack />
                                </Slider.Track>
                                <Slider.Thumb />
                            </Slider>
                        </View>
                        <View pt="5" style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text color="#ffffff" fontFamily="Outfit-Medium" fontSize="sm">
                                Period (In Days)
                            </Text>
                            <Text color="#F8CD69" fontFamily="Outfit-Regular" fontSize="sm">
                                {onChangeDaysValue} days
                            </Text>
                        </View>
                        <View pt="2">
                            <Slider size="lg" defaultValue={14} minValue={0} maxValue={100} colorScheme="yellow" onChange={v => {
                                setOnChangeDaysValue(Math.floor(v));
                            }} >
                                <Slider.Track>
                                    <Slider.FilledTrack />
                                </Slider.Track>
                                <Slider.Thumb />
                            </Slider>
                        </View>
                        <View pt="5" style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                                Interest
                            </Text>
                            <Text color="#ffffff" fontFamily="Outfit-Regular" fontSize={12}>
                                0.00000%
                            </Text>
                        </View>
                        <View pt="1" style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                                Underwriting Fee
                            </Text>
                            <Text color="#ffffff" fontFamily="Outfit-Regular" fontSize={12}>
                                RM -50.00
                            </Text>
                        </View>
                        <View pt="1" style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                                Gateway Fee
                            </Text>
                            <Text color="#ffffff" fontFamily="Outfit-Regular" fontSize={12}>
                                RM -50.00
                            </Text>
                        </View>
                        <View pt="1" style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                                Service Fee
                            </Text>
                            <Text color="#ffffff" fontFamily="Outfit-Regular" fontSize={12}>
                                RM -50.00
                            </Text>
                        </View>
                        <View pt="1" style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                                System Fee
                            </Text>
                            <Text color="#ffffff" fontFamily="Outfit-Regular" fontSize={12}>
                                RM -0.00
                            </Text>
                        </View>
                        <View pt="1" style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                                Deposit
                            </Text>
                            <Text color="#ffffff" fontFamily="Outfit-Regular" fontSize={12}>
                                RM -0.00
                            </Text>
                        </View>
                        <View pt="1" style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                                Registration Fee
                            </Text>
                            <Text color="#ffffff" fontFamily="Outfit-Regular" fontSize={12}>
                                RM -0.00
                            </Text>
                        </View>
                        <Divider my="4" bg="#CFCFCF" thickness="0.5" />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text color="#ffffff" fontFamily="Outfit-Medium" fontSize="sm">
                                Total Amount Recieved
                            </Text>
                            <Text color="#F8CD69" fontFamily="Outfit-Regular" fontSize="sm">
                                RM 150.00
                            </Text>
                        </View>
                        <View pb="10" style={{ flexDirection: 'row' }}>
                            <Stack pt="6" space={4} w="100%" maxW="350px" >
                                <Box rounded="sm" bg={{
                                    linearGradient: {
                                        colors: ["#F8CF6E", "#F6B839"],
                                        start: [0, 0],
                                        end: [0, 1]
                                    }
                                }}>
                                    <Button colorScheme="coolGray" bg="transparent" activeOpacity={1} _text={{ color: "#2D2D2D", fontFamily: 'Outfit-SemiBold' }} py={3} size="lg">
                                        Apply Now
                                    </Button>
                                </Box>
                            </Stack>

                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>

        </View>
    )
}

export default ApplyLoan;