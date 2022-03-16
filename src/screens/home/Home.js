import React, { useRef, useState } from 'react'

import { StatusBar } from 'react-native';
import { Image, Pressable, Text, View, Box, VStack, ScrollView, Modal, Center, Stack } from 'native-base'
import Carousel from 'react-native-snap-carousel';
import applyLoan from '../../../assets/applyLoan.png'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import logo from '../../../assets/logo.png'
function Home(props) {

    const ref = useRef();
    const [showModal, setShowModal] = useState(true);
    const [state, setState] = useState({
        entries: [
            { image: applyLoan },
            { image: applyLoan },
            { image: applyLoan }
        ],
    })

    const _renderItem = ({ item, index }) => {
        return (

            <Pressable onPress={() => props.navigation.navigate('ApplyLoan')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                {({
                    isPressed
                }) => {
                    return <Image style={{
                        transform: [{
                            scale: isPressed ? 0.96 : 1
                        }]
                    }} size={400} resizeMode={"contain"} source={item.image} alt="Alternate Text" />;
                }}

            </Pressable>

        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#1f1f1f' }}>
            <StatusBar backgroundColor="#2D2D2D" barStyle={'light-content'} />
            <Modal size="full" isOpen={showModal} >
                <Modal.Content h="236" bgColor="#2D2D2D" maxWidth="400px">
                    <Modal.Body h="236">
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1, alignItems: 'flex-end' }} >
                                <MaterialCommunityIcons onPress={() => setShowModal(false)} size={26} name="close-circle-outline" color="#ffffff" />
                            </View>
                            <View pb="15" style={{ flex: 5, justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Center size="100" >
                                    <Image source={logo} alt="Ace Credit" size="xl" />
                                </Center>
                                <Text textAlign="center" fontFamily="Outfit-Medium" color="#ffffff" fontSize="lg">Ace Credit</Text>
                                <Text textAlign="center" fontFamily="Outfit-Regular" color="#CFCFCF" fontSize={12}>Agent Karen : 011 6937 7708</Text>

                            </View>
                        </View>

                    </Modal.Body>
                </Modal.Content>
            </Modal>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                <Carousel
                    layout={"default"}
                    ref={ref}
                    activeSlideAlignment="center"
                    inactiveSlideShift={1}

                    data={state.entries}
                    renderItem={_renderItem}
                    inactiveSlideOpacity={1}
                    sliderWidth={500}
                    itemWidth={300}
                />
            </View>
            <View style={{ flex: 2 }} px="5" >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <Text color="#ffffff" fontFamily="Outfit-Medium" fontSize="sm">
                        Latest Promotions
                    </Text>
                    <Text color="#F8CD69" fontFamily="Outfit-Regular" fontSize={12}>
                        View All
                    </Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic">
                    <VStack pt="5" space={4}>
                        <Box shadow="8" rounded="lg" bg="#2D2D2D" p="3">
                            <View style={{ flex: 1, flexDirection: 'row' }} >
                                <View style={{ flex: 1, flexDirection: 'column' }}>

                                    <Box alignItems='center' rounded="lg" justifyContent="center" bg={{
                                        linearGradient: {
                                            colors: ["#F8CF6E", "#F6B839"],

                                        }
                                    }} h="16" >

                                        <MaterialCommunityIcons size={26} name="clock-time-four-outline" color="#ffffff" />

                                    </Box>

                                </View>
                                <View style={{ flex: 4, flexDirection: 'column', justifyContent: 'center' }} pl="5">
                                    <Text color="#ffffff" fontFamily="Outfit-Medium" fontSize="sm">
                                        Non Time Consuming
                                    </Text>
                                    <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                                        Quick review and approval in an hour
                                    </Text>
                                </View>
                            </View>
                        </Box>
                        <Box shadow="8" rounded="lg" bg="#2D2D2D" p="3">
                            <View style={{ flex: 1, flexDirection: 'row' }} >
                                <View style={{ flex: 1, flexDirection: 'column' }}>

                                    <Box alignItems='center' rounded="lg" justifyContent="center" bg={{
                                        linearGradient: {
                                            colors: ["#F8CF6E", "#F6B839"],

                                        }
                                    }} h="16" >

                                        <MaterialCommunityIcons size={26} name="percent-outline" color="#ffffff" />

                                    </Box>

                                </View>
                                <View style={{ flex: 4, flexDirection: 'column', justifyContent: 'center' }} pl="5">
                                    <Text color="#ffffff" fontFamily="Outfit-Medium" fontSize="sm">
                                        No Interest Charges
                                    </Text>
                                    <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                                        Zero interest and burden, you just repay the exact amount
                                    </Text>
                                </View>
                            </View>
                        </Box>
                        <Box shadow="8" rounded="lg" bg="#2D2D2D" p="3">
                            <View style={{ flex: 1, flexDirection: 'row' }} >
                                <View style={{ flex: 1, flexDirection: 'column' }}>

                                    <Box alignItems='center' rounded="lg" justifyContent="center" bg={{
                                        linearGradient: {
                                            colors: ["#F8CF6E", "#F6B839"],

                                        }
                                    }} h="16" >

                                        <Feather size={26} name="dollar-sign" color="#ffffff" />

                                    </Box>

                                </View>
                                <View style={{ flex: 4, flexDirection: 'column', justifyContent: 'center' }} pl="5">
                                    <Text color="#ffffff" fontFamily="Outfit-Medium" fontSize="sm">
                                        Non Time Consuming
                                    </Text>
                                    <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                                        Quick review and approval in an hour
                                    </Text>
                                </View>
                            </View>
                        </Box>
                    </VStack>
                </ScrollView>

            </View>
        </View>
    )
}

export default Home