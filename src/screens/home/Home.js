import React, { useRef, useState, useEffect } from 'react'

import { StatusBar, ImageBackground } from 'react-native';
import { Image, Pressable, Button, Text, View, Box, Badge, HStack, VStack, ScrollView, Modal, Center, Skeleton } from 'native-base'
import Carousel from 'react-native-snap-carousel';
import cardImage from '../../../assets/card.png'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import logo from '../../../assets/logo.png'
import FrameNew from '../../../assets/location_frame.png'
import * as Location from 'expo-location';
import * as Contacts from 'expo-contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocation, getContacts, hideLoginPopup } from '../../redux/actions/authActions'
import { clearPromotionsMessages, getPromotions } from '../../redux/actions/promotionsActions'
import { clearPackagesMessages, getPackages } from '../../redux/actions/packagesActions'
import { connect } from 'react-redux'
function Home(props) {

    const ref = useRef();
    const [showModal, setShowModal] = useState(true);
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [state, setState] = useState({
        packages: [],
        promotions: [],
        isPromotionsLoading: true,
        isPackagesLoading: true
    })

    useEffect(() => {
        props.getPackages()
        props.getPromotions()
        setTimeout(function () {
            props.hideLoginPopup()
        }, 3000);

    }, [])


    useEffect(() => {


        (async () => {
            const hideLoginPopup = await AsyncStorage.getItem('hideLoginPopup');
            if (hideLoginPopup == 'yes') {

                setShowModal(false)
            } else {
                setShowModal(true)
            }

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                //setErrorMsg('Permission to access location was denied');
                setShowLocationModal(true)
                console.log('denied', 'Permission to access location was denied')
                return;
            }

            let { coords } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest, maximumAge: 10000 });
            if (coords) {
                let { longitude, latitude } = coords;

                let regionName = await Location.reverseGeocodeAsync({
                    longitude,
                    latitude,
                });

                props.getLocation(regionName[0])
            }

        })();

        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [
                        Contacts.Fields.FirstName,
                        Contacts.Fields.LastName,
                        Contacts.Fields.PhoneNumbers,
                    ],
                });

                if (data.length > 0) {
                    const contacts_saved = await AsyncStorage.getItem('contacts_saved');
                    if (contacts_saved && contacts_saved == 'yes') {

                    } else {
                        props.getContacts(data)
                    }
                }
            }
        })();


    }, [])

    useEffect(() => {

        if (props.promotions.length) {
            setState((state) => ({
                ...state,
                isPromotionsLoading: false,
                promotions: props.promotions,

            }))
            props.clearPromotionsMessages()
        }

        // setState((state) => ({
        //     ...state,
        //     isPromotionsLoading: false,
        // }))

        if (props.getPackagesError) {
            console.log('error occured', props.getPackagesError)

        }

    }, [props.promotionsError, props.promotions])

    useEffect(() => {

        if (props.packages.length) {
            setState((state) => ({
                ...state,
                isPackagesLoading: false,
                packages: props.packages,

            }))
            props.clearPackagesMessages()
        }
        // setState((state) => ({
        //     ...state,
        //     isPackagesLoading: false,
        // }))

        if (props.getPackagesError) {
            console.log('error occured', props.getPackagesError)
        }

    }, [props.getPackagesError, props.packages])

    const _renderItem = ({ item, index }) => {

        return (
            <Pressable onPress={() => props.navigation.navigate('ApplyLoan', { item: item })} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                {({
                    isPressed
                }) => {
                    return <ImageBackground source={cardImage} resizeMode="cover" style={{

                        width: '100%',
                        height: 140,
                        justifyContent: "center",
                        transform: [{
                            scale: isPressed ? 0.96 : 1
                        }]
                    }}>
                        <View px="5" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text fontFamily="Outfit-Regular" color="#FFFFFF" fontSize={12}>Plan Amount (RM)</Text>
                            <Badge ml="5" rounded="xl" alignSelf="flex-start" colorScheme="yellow" variant="solid" _text={{
                                fontFamily: "Outfit-Regular"
                            }}> Loan Plan</Badge>
                        </View>
                        <View pb="4" px="5" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text fontFamily="Outfit-SemiBold" color="#FFFFFF" fontSize={16}>{item.package_min_amount} - {item.package_max_amount} </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialCommunityIcons size={18} name="clock-time-four" color="#ffffff" />
                                <Text pl="1" fontFamily="Outfit-Regular" color="#FFFFFF" fontSize={12}> Period {item.period_min} - {item.period_max} months</Text>
                            </View>

                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Button onPress={() => props.navigation.navigate('ApplyLoan', { item: item })} bg="#FFFFFF" size="lg" _text={{ color: "#1476DF", fontFamily: 'Outfit-SemiBold' }} >
                                Apply Now
                            </Button>
                        </View>
                    </ImageBackground>
                    // <Image style={{
                    //     transform: [{
                    //         scale: isPressed ? 0.96 : 1
                    //     }]
                    // }} size={400} resizeMode={"contain"} source={item.image} alt="Alternate Text" />;

                }
                }

            </Pressable >

        );
    }

    const promotions = state.promotions.length > 0 ? (

        state.promotions.map((promotion, index) => {

            return (

                <Box key={index} shadow="8" rounded="lg" bg="#2D2D2D" p="3">
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
                                {promotion.title}
                            </Text>
                            <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                                {promotion.description}
                            </Text>
                        </View>
                    </View>
                </Box>

            )
        })

    ) : <Text textAlign="center" fontFamily="Outfit-Regular" color="#CFCFCF" fontSize={12}>Opps! No Promotions Yet.</Text>


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

            <Modal size="full" isOpen={showLocationModal} >
                <Modal.Content h="300" bgColor="#2D2D2D" maxWidth="400px">
                    <Modal.Body h="300">
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1, alignItems: 'flex-end' }} >
                                <MaterialCommunityIcons onPress={() => setShowLocationModal(false)} size={26} name="close-circle-outline" color="#ffffff" />
                            </View>
                            <View pb="15" style={{ flex: 5, justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Center size="150" >
                                    <Image source={FrameNew} alt="Ace Credit" size="2xl" resizeMode="contain" />
                                </Center>
                                <Text textAlign="center" fontFamily="Outfit-Medium" color="#F8CD69" fontSize="lg">Access Required !!!</Text>
                                <Text textAlign="center" fontFamily="Outfit-Regular" color="#CFCFCF" fontSize={12}>Ace Credit requires your [location] access for optimal app experience.</Text>

                            </View>
                        </View>

                    </Modal.Body>
                </Modal.Content>
            </Modal>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                {state.isPackagesLoading ? <Center w="100%" >

                    <HStack w="90%" maxW="400" borderWidth="1" space={8} rounded="md" _dark={{
                        borderColor: "coolGray.500"
                    }} _light={{
                        borderColor: "coolGray.200"
                    }} p="4">
                        <Skeleton flex="1" h="100" rounded="md" startColor="coolGray.100" />
                        <VStack flex="3" space="4">
                            <Skeleton startColor="amber.300" />
                            <Skeleton.Text />

                        </VStack>
                    </HStack>
                </Center> : <Carousel
                    layout={"default"}
                    ref={ref}
                    activeSlideAlignment="center"
                    inactiveSlideShift={1}

                    data={state.packages}
                    renderItem={_renderItem}
                    inactiveSlideOpacity={1}
                    sliderWidth={500}
                    itemWidth={300}
                />}
            </View>
            <View style={{ flex: 2 }} px="5"  >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <Text color="#ffffff" fontFamily="Outfit-Medium" fontSize="sm">
                        Latest Promotions
                    </Text>
                    {/* <Text color="#F8CD69" fontFamily="Outfit-Regular" fontSize={12}>
                        View All
                    </Text> */}
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic">
                    <VStack pb="10" pt="5" space={4} >

                        {state.isPromotionsLoading ? <Center w="100%" >
                            <HStack mb="5" w="90%" maxW="400" borderWidth="1" space={8} rounded="md" _dark={{
                                borderColor: "coolGray.500"
                            }} _light={{
                                borderColor: "coolGray.200"
                            }} p="4">
                                <Skeleton flex="1" h="100" rounded="md" startColor="coolGray.100" />
                                <VStack flex="3" space="4">
                                    <Skeleton startColor="amber.300" />
                                    <Skeleton.Text />

                                </VStack>
                            </HStack>
                            <HStack w="90%" maxW="400" borderWidth="1" space={8} rounded="md" _dark={{
                                borderColor: "coolGray.500"
                            }} _light={{
                                borderColor: "coolGray.200"
                            }} p="4">
                                <Skeleton flex="1" h="100" rounded="md" startColor="coolGray.100" />
                                <VStack flex="3" space="4">
                                    <Skeleton startColor="amber.300" />
                                    <Skeleton.Text />

                                </VStack>
                            </HStack>
                        </Center> : promotions}

                    </VStack>
                </ScrollView>

            </View>
        </View>
    )
}


const mapStateToProps = (state) => {
    return {
        promotions: state.promotions.data,
        promotionsError: state.promotions.promotionsError,
        packages: state.packages.data,
        packagesError: state.packages.packagesError,
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        getLocation: (data) => dispatch(getLocation(data)),
        getContacts: (data) => dispatch(getContacts(data)),
        clearPromotionsMessages: () => dispatch(clearPromotionsMessages()),
        getPromotions: () => dispatch(getPromotions()),
        hideLoginPopup: () => dispatch(hideLoginPopup()),
        getPackages: () => dispatch(getPackages()),
        clearPackagesMessages: () => dispatch(clearPackagesMessages()),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
