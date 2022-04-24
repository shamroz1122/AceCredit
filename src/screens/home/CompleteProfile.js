import { View, Text, FormControl, Select, Center, Input, useToast, Box, WarningOutlineIcon, Button, Stack, Image, Modal, Spinner } from 'native-base'
import { SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import frontId from '../../../assets/front.png'
import backId from '../../../assets/back.png'
import { updateProfile, clearMessage, uploadAttachment } from '../../redux/actions/authActions'
import { connect } from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CompleteProfile(props) {
    const toast = useToast();
    const [showModal, setShowModal] = useState(false);
    const [credentials, setCredentials] = useState({
        name_on_ic: '',
        nric_no: '',
        referral: '',
        gender: '',
        educational_lvl: '',
        income_lvl: '',
        country: '',
        city: '',
        state: '',
        id_photo_front: '',
        id_photo_back: '',
        id_photo_front_src: '',
        id_photo_back_src: '',
        rel1: '',
        rel1_name: '',
        rel1_phone: '',
        rel2: '',
        rel2_name: '',
        rel2_phone: '',

    })

    const [state, setState] = useState({
        name_on_ic_invalid: false,
        nric_no_invalid: false,
        referral_invalid: false,
        gender_invalid: false,
        educational_lvl_invalid: false,
        income_lvl_invalid: false,
        country_invalid: false,
        city_invalid: false,
        state_invalid: false,
        id_photo_invalid: false,
        rel1_invalid: false,
        rel1_name_invalid: false,
        rel1_phone_invalid: false,
        rel2_invalid: false,
        rel2_name_invalid: false,
        rel2_phone_invalid: false,
        error: '',
        authError: false,
        frontLoading: false,
        backLoading: false,
        isLoading: false,
        position: ''

    })



    useEffect(() => {

        (async () => {

            const profile = await AsyncStorage.getItem('Profile');
            console.log('profile', profile)
            if (profile) {
                console.log('fdfd', profile.name_on_ic)
                const parsedProfile = JSON.parse(profile)
                setCredentials(parsedProfile)
            }

            // nric_no: profile.nric_no,
            // referral: profile.referral,
            // gender: profile.gender,
            // educational_lvl: profile.educational_lvl,
            // income_lvl: profile.income_lvl,
            // country: profile.country,
            // city: profile.city,
            // state: profile.state,
            // id_photo_front: profile.id_photo_front,
            // id_photo_back: profile.id_photo_back,
            // id_photo_front_src: '',
            // id_photo_back_src: '',
            // rel1: profile.rel1,
            // rel1_name: profile.rel1_name,
            // rel1_phone: profile.rel1_phone,
            // rel2: profile.rel2,
            // rel2_name: profile.rel2_name,
            // rel2_phone: profile.rel2_phone,

        })();

    }, [])

    useEffect(() => {
        if (Object.keys(props.uploadedAttachment).length) {

            if (state.position == 'front') {
                setCredentials((credentials) => ({
                    ...credentials,
                    id_photo_front: props.uploadedAttachment.uri
                }))
                setState({ ...state, frontLoading: false })
            } else {
                setCredentials((credentials) => ({
                    ...credentials,
                    id_photo_back: props.uploadedAttachment.uri
                }))
                setState({ ...state, backLoading: false })
            }

            props.clearMessage()

        }

        if (props.uploadedAttachmentError) {
            setState({ ...state, backLoading: false, frontLoading: false, id_photo_invalid: true, error: props.uploadedAttachmentError })
            props.clearMessage()
        }

    }, [props.uploadedAttachment, props.uploadedAttachmentError])


    useEffect(() => {

        if (Object.keys(props.profile).length) {

            toast.show({
                title: "Profile Updated",
                status: "success",

            })

            setState({ ...state, isLoading: false })
            props.clearMessage()

        }


        if (props.profileUpdateError) {
            if (props.profileUpdateError.name_on_ic) {

                setState({ ...state, authError: true, isLoading: false, name_on_ic_invalid: true, error: props.profileUpdateError.name_on_ic })

            } else if (props.profileUpdateError.nric_no) {

                setState({ ...state, authError: true, isLoading: false, nric_no_invalid: true, error: props.profileUpdateError.nric_no })

            } else if (props.profileUpdateError.referral) {

                setState({ ...state, authError: true, isLoading: false, referral_invalid: true, error: props.profileUpdateError.referral })

            } else if (props.profileUpdateError.gender) {

                setState({ ...state, authError: true, isLoading: false, gender_invalid: true, error: props.profileUpdateError.gender })

            } else if (props.profileUpdateError.educational_lvl) {

                setState({ ...state, authError: true, isLoading: false, educational_lvl_invalid: true, error: props.profileUpdateError.educational_lvl })

            } else if (props.profileUpdateError.city) {

                setState({ ...state, authError: true, isLoading: false, city_invalid: true, error: props.profileUpdateError.city })

            } else if (props.profileUpdateError.state) {

                setState({ ...state, authError: true, isLoading: false, state_invalid: true, error: props.profileUpdateError.state })

            } else if (props.profileUpdateError.id_photo_front) {

                setState({ ...state, authError: true, isLoading: false, id_photo_invalid: true, error: props.profileUpdateError.id_photo_front })

            } else if (props.profileUpdateError.id_photo_back) {

                setState({ ...state, authError: true, isLoading: false, id_photo_invalid: true, error: props.profileUpdateError.id_photo_back })

            } else if (props.profileUpdateError.rel1) {

                setState({ ...state, authError: true, isLoading: false, rel1_invalid: true, error: props.profileUpdateError.rel1 })

            } else if (props.profileUpdateError.rel1_name) {

                setState({ ...state, authError: true, isLoading: false, rel1_name_invalid: true, error: props.profileUpdateError.rel1_name })

            } else if (props.profileUpdateError.rel1_phone) {

                setState({ ...state, authError: true, isLoading: false, rel1_phone_invalid: true, error: props.profileUpdateError.rel1_phone })

            } else if (props.profileUpdateError.rel2) {

                setState({ ...state, authError: true, isLoading: false, rel2_invalid: true, error: props.profileUpdateError.rel2 })

            } else if (props.profileUpdateError.rel2_name) {

                setState({ ...state, authError: true, isLoading: false, rel2_name_invalid: true, error: props.profileUpdateError.rel2_name })

            } else if (props.profileUpdateError.rel2_phone) {

                setState({ ...state, authError: true, isLoading: false, rel2_phone_invalid: true, error: props.profileUpdateError.rel2_phone })

            }

            props.clearMessage()
        }

    }, [props.profile, props.profileUpdateError])

    const onChangeNameOnIC = (text) => {
        setCredentials({ ...credentials, name_on_ic: text })
    }

    const onChangeNricNo = (text) => {
        setCredentials({ ...credentials, nric_no: text })
    }

    const onChangeReferral = (text) => {
        setCredentials({ ...credentials, referral: text })
    }
    const setGender = (item) => {
        setCredentials({ ...credentials, gender: item })
    }

    const setEducationLevel = (item) => {
        setCredentials({ ...credentials, educational_lvl: item })
    }

    const setIncomeLevel = (item) => {
        setCredentials({ ...credentials, income_lvl: item })
    }

    const onChangeCountry = (text) => {
        setCredentials({ ...credentials, country: text })
    }

    const onChangeCity = (text) => {
        setCredentials({ ...credentials, city: text })
    }

    const onChangeState = (text) => {
        setCredentials({ ...credentials, state: text })
    }

    const onChangeRel1 = (text) => {
        setCredentials({ ...credentials, rel1: text })
    }

    const onChangeRel1_Name = (text) => {
        setCredentials({ ...credentials, rel1_name: text })
    }

    const onChangeRel1_Phone = (text) => {
        setCredentials({ ...credentials, rel1_phone: text })
    }

    const onChangeRel2 = (text) => {
        setCredentials({ ...credentials, rel2: text })
    }

    const onChangeRel2_Name = (text) => {
        setCredentials({ ...credentials, rel2_name: text })
    }

    const onChangeRel2_Phone = (text) => {
        setCredentials({ ...credentials, rel2_phone: text })
    }

    const takeSnap = async (position) => {
        const options = {
            //   title: 'Select an ID Photo (Front Side) ',
            mediaType: 'photo',
            includeBase64: true,
            includeExtra: true
        };


        launchImageLibrary(options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                //   console.log('User cancelled image picker');
            } else if (response.error) {
                //   console.log('ImagePicker Error: ', response.error);
            } else {

                // return false;
                const source = { uri: response.assets[0].uri }
                // console.log(res)
                // You can also display the image using data:
                //  const source = { uri: 'data:image/jpeg;base64,' + response.data };

                if (response.assets[0].fileSize <= '2000000') {
                    if (position == 'front') {
                        setCredentials({ ...credentials, id_photo_front_src: source })
                        setState({ ...state, frontLoading: true, position: position })
                    } else {
                        setCredentials({ ...credentials, id_photo_back_src: source })
                        setState({ ...state, backLoading: true, position: position })
                    }
                } else {
                    setState({ ...state, id_photo_invalid: true, error: 'File size should not be greater than 2MB' })
                }


                //  console.log(response.assets[0].base64)
                const imageData = { image: response.assets[0].base64, type: response.assets[0].type }
                props.uploadAttachment(imageData)

            }
        });
    };

    const updateProfile = async () => {

        setState((state) => ({
            ...state,
            authError: false,
            name_on_ic_invalid: false,
            nric_no_invalid: false,
            referral_invalid: false,
            gender_invalid: false,
            educational_lvl_invalid: false,
            income_lvl_invalid: false,
            country_invalid: false,
            city_invalid: false,
            state_invalid: false,
            id_photo_invalid: false,
            rel1_invalid: false,
            rel1_name_invalid: false,
            rel1_phone_invalid: false,
            rel2_invalid: false,
            rel2_name_invalid: false,
            rel2_phone_invalid: false,
            error: '',
            isLoading: true
        }))

        props.updateProfile(credentials)

    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#1f1f1f', alignItems: 'center' }}>

            <Modal size="full" isOpen={showModal} >
                <Modal.Content h="236" bgColor="#2D2D2D" maxWidth="400px">
                    <Modal.Body h="236">
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1, alignItems: 'flex-end' }} >
                                <MaterialCommunityIcons onPress={() => setShowModal(false)} size={26} name="close-circle-outline" color="#ffffff" />
                            </View>
                            <View pb="15" style={{ flex: 5, justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Center size="100" >
                                    <MaterialCommunityIcons size={100} name="alert" color="#ffffff" />
                                </Center>
                                <Text textAlign="center" fontFamily="Outfit-Medium" color="#ffffff" fontSize="lg">No access to camera. Please allow permission.</Text>

                            </View>
                        </View>

                    </Modal.Body>
                </Modal.Content>
            </Modal>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View p="4">
                    <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                        Please complete your profile to submit the loan application
                    </Text>
                </View>
                <View>

                    <Stack space={4} pb="10">
                        <View rounded="lg" style={{ backgroundColor: '#2D2D2D' }} pt="2" px="3">
                            <Text fontFamily="Outfit-Regular" color="#CFCFCF" fontSize="10">Name as per IC</Text>
                            <FormControl isInvalid={state.name_on_ic_invalid}>
                                <Input onChangeText={onChangeNameOnIC} value={credentials.name_on_ic} fontFamily="Outfit-Regular" color="#CFCFCF" fontSize="10" _focus={{ borderColor: "#2D2D2D" }} borderColor="#2D2D2D" bgColor="#2D2D2D" w="100%" h="8" />
                                <FormControl.ErrorMessage>{state.error}</FormControl.ErrorMessage>
                            </FormControl>
                        </View>

                        <View rounded="lg" style={{ backgroundColor: '#2D2D2D' }} pt="2" px="3">
                            <Text fontFamily="Outfit-Regular" color="#CFCFCF" fontSize="10">NRIC Number</Text>
                            <FormControl isInvalid={state.nric_no_invalid}>
                                <Input onChangeText={onChangeNricNo} value={credentials.nric_no} fontFamily="Outfit-Regular" color="#CFCFCF" fontSize="10" _focus={{ borderColor: "#2D2D2D" }} borderColor="#2D2D2D" bgColor="#2D2D2D" w="100%" h="8" />
                                <FormControl.ErrorMessage>{state.error}</FormControl.ErrorMessage>
                            </FormControl>
                        </View>
                        <View rounded="lg" style={{ backgroundColor: '#2D2D2D' }} pt="2" px="3">
                            <Text fontFamily="Outfit-Regular" color="#CFCFCF" fontSize="10">Referral (Optional)</Text>
                            <FormControl isInvalid={state.referral_invalid}>
                                <Input onChangeText={onChangeReferral} value={credentials.referral} fontFamily="Outfit-Regular" color="#ffffff" fontSize="12" _focus={{ borderColor: "#2D2D2D" }} borderColor="#2D2D2D" bgColor="#2D2D2D" w="100%" h="8" placeholder='+66' />
                                <FormControl.ErrorMessage>{state.error}</FormControl.ErrorMessage>
                            </FormControl>
                        </View>
                        <View rounded="lg" style={{ backgroundColor: '#2D2D2D' }} pt="2" px="3">
                            <Text fontFamily="Outfit-Regular" color="#CFCFCF" fontSize="10">Gender</Text>
                            <FormControl isInvalid={state.gender_invalid}>
                                <Select onValueChange={itemValue => setGender(itemValue)} selectedValue={credentials.gender} color="#ffffff" minWidth="120" h="8" borderColor="#2D2D2D" accessibilityLabel="Choose Service" placeholder="Select" >
                                    <Select.Item label="Male" value="male" />
                                    <Select.Item label="Female" value="femnale" />
                                    <Select.Item label="Other" value="other" />
                                </Select>
                                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                    {state.error}
                                </FormControl.ErrorMessage>
                            </FormControl>
                        </View>
                        <View rounded="lg" style={{ backgroundColor: '#2D2D2D' }} pt="2" px="3">
                            <Text fontFamily="Outfit-Regular" color="#CFCFCF" fontSize="10">Education Level</Text>
                            <FormControl isInvalid={state.educational_lvl_invalid} >
                                <Select onValueChange={itemValue => setEducationLevel(itemValue)} selectedValue={credentials.educational_lvl} color="#ffffff" minWidth="120" h="8" borderColor="#2D2D2D" accessibilityLabel="Education Level" placeholder="Select" >
                                    <Select.Item label="Low" value="low" />
                                    <Select.Item label="Medium" value="medium" />
                                    <Select.Item label="High" value="high" />
                                </Select>
                                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                    {state.error}
                                </FormControl.ErrorMessage>
                            </FormControl>
                        </View>
                        <View rounded="lg" style={{ backgroundColor: '#2D2D2D' }} pt="2" px="3">
                            <Text fontFamily="Outfit-Regular" color="#CFCFCF" fontSize="10">Income Level</Text>
                            <FormControl isInvalid={state.income_lvl_invalid}>
                                <Select onValueChange={itemValue => setIncomeLevel(itemValue)} selectedValue={credentials.income_lvl} color="#ffffff" minWidth="120" h="8" borderColor="#2D2D2D" accessibilityLabel="Income Level" placeholder="Select" >
                                    <Select.Item label="Low" value="low" />
                                    <Select.Item label="Medium" value="medium" />
                                    <Select.Item label="High" value="high" />
                                </Select>
                                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                    {state.error}
                                </FormControl.ErrorMessage>
                            </FormControl>
                        </View>
                        <View rounded="lg" style={{ backgroundColor: '#2D2D2D' }} pt="2" px="3">
                            <Text fontFamily="Outfit-Regular" color="#CFCFCF" fontSize="10">Country</Text>
                            <FormControl isInvalid={state.country_invalid}>
                                <Input onChangeText={onChangeCountry} value={credentials.country} fontFamily="Outfit-Regular" color="#ffffff" fontSize="12" _focus={{ borderColor: "#2D2D2D" }} borderColor="#2D2D2D" bgColor="#2D2D2D" w="100%" h="8" />
                                <FormControl.ErrorMessage>{state.error}</FormControl.ErrorMessage>
                            </FormControl>
                        </View>
                        <View rounded="lg" style={{ backgroundColor: '#2D2D2D' }} pt="2" px="3">
                            <Text fontFamily="Outfit-Regular" color="#CFCFCF" fontSize="10">State</Text>
                            <FormControl isInvalid={state.state_invalid}>
                                <Input onChangeText={onChangeState} value={credentials.state} fontFamily="Outfit-Regular" color="#ffffff" fontSize="12" _focus={{ borderColor: "#2D2D2D" }} borderColor="#2D2D2D" bgColor="#2D2D2D" w="100%" h="8" />
                                <FormControl.ErrorMessage>{state.error}</FormControl.ErrorMessage>
                            </FormControl>
                        </View>
                        <View rounded="lg" style={{ backgroundColor: '#2D2D2D' }} pt="2" px="3">
                            <Text fontFamily="Outfit-Regular" color="#CFCFCF" fontSize="10">City</Text>
                            <FormControl isInvalid={state.city_invalid}>
                                <Input onChangeText={onChangeCity} value={credentials.city} fontFamily="Outfit-Regular" color="#ffffff" fontSize="12" _focus={{ borderColor: "#2D2D2D" }} borderColor="#2D2D2D" bgColor="#2D2D2D" w="100%" h="8" />
                                <FormControl.ErrorMessage>{state.error}</FormControl.ErrorMessage>
                            </FormControl>
                        </View>
                        <View rounded="lg" style={{ backgroundColor: '#2D2D2D' }} pt="2" px="3">
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text fontFamily="Outfit-Regular" color="#CFCFCF" fontSize="10">ID Photo (Required for Verification)</Text>
                                <Text fontFamily="Outfit-Regular" color="#CFCFCF" fontSize="10">View Sample</Text>
                            </View>

                            <View style={{ justifyContent: "space-around", flexDirection: 'row' }}>

                                {state.frontLoading ? <Spinner color="#F8CF6E" size="lg" /> : <TouchableOpacity onPress={() => takeSnap('front')} >
                                    <Image resizeMode={"contain"} source={credentials.id_photo_front_src != '' ? credentials.id_photo_front_src : frontId} alt="Alternate Text" size="xl" />
                                </TouchableOpacity>}

                                {state.backLoading ? <Spinner color="#F8CF6E" size="lg" /> : <TouchableOpacity onPress={() => takeSnap('back')} >
                                    <Image resizeMode={"contain"} source={credentials.id_photo_back_src != '' ? credentials.id_photo_back_src : backId} alt="Alternate Text" size="xl" />
                                </TouchableOpacity>}

                            </View>
                            <FormControl pb="5" isInvalid={state.id_photo_invalid}>
                                <FormControl.ErrorMessage>{state.error}</FormControl.ErrorMessage>
                            </FormControl>
                        </View>
                        <Text fontFamily="Outfit-Medium" color="#ffffff" fontSize="lg">Emergency Relationship 1</Text>
                        <View rounded="lg" style={{ backgroundColor: '#2D2D2D' }} pt="2" px="3">
                            <Text fontFamily="Outfit-Regular" color="#CFCFCF" fontSize="10">Relationship</Text>
                            <FormControl isInvalid={state.rel1_invalid}>
                                <Input onChangeText={onChangeRel1} value={credentials.rel1} fontFamily="Outfit-Regular" color="#ffffff" fontSize="12" _focus={{ borderColor: "#2D2D2D" }} borderColor="#2D2D2D" bgColor="#2D2D2D" w="100%" h="8" />
                                <FormControl.ErrorMessage>{state.error}</FormControl.ErrorMessage>
                            </FormControl>
                        </View>
                        <View rounded="lg" style={{ backgroundColor: '#2D2D2D' }} pt="2" px="3">
                            <Text fontFamily="Outfit-Regular" color="#CFCFCF" fontSize="10">Name</Text>
                            <FormControl isInvalid={state.rel1_name_invalid}>
                                <Input onChangeText={onChangeRel1_Name} value={credentials.rel1_name} fontFamily="Outfit-Regular" color="#ffffff" fontSize="12" _focus={{ borderColor: "#2D2D2D" }} borderColor="#2D2D2D" bgColor="#2D2D2D" w="100%" h="8" />
                                <FormControl.ErrorMessage>{state.error}</FormControl.ErrorMessage>
                            </FormControl>
                        </View>
                        <View rounded="lg" style={{ backgroundColor: '#2D2D2D' }} pt="2" px="3">
                            <Text fontFamily="Outfit-Regular" color="#CFCFCF" fontSize="10">Phone Number</Text>
                            <FormControl isInvalid={state.rel1_phone_invalid}>
                                <Input onChangeText={onChangeRel1_Phone} value={credentials.rel1_phone} fontFamily="Outfit-Regular" color="#ffffff" fontSize="12" _focus={{ borderColor: "#2D2D2D" }} borderColor="#2D2D2D" bgColor="#2D2D2D" w="100%" h="8" />
                                <FormControl.ErrorMessage>{state.error}</FormControl.ErrorMessage>
                            </FormControl>
                        </View>

                        <Text fontFamily="Outfit-Medium" color="#ffffff" fontSize="lg">Emergency Relationship 2</Text>
                        <View rounded="lg" style={{ backgroundColor: '#2D2D2D' }} pt="2" px="3">
                            <Text fontFamily="Outfit-Regular" color="#CFCFCF" fontSize="10">Relationship</Text>
                            <FormControl isInvalid={state.rel2_invalid}>
                                <Input onChangeText={onChangeRel2} value={credentials.rel2} fontFamily="Outfit-Regular" color="#ffffff" fontSize="12" _focus={{ borderColor: "#2D2D2D" }} borderColor="#2D2D2D" bgColor="#2D2D2D" w="100%" h="8" />
                                <FormControl.ErrorMessage>{state.error}</FormControl.ErrorMessage>
                            </FormControl>
                        </View>
                        <View rounded="lg" style={{ backgroundColor: '#2D2D2D' }} pt="2" px="3">
                            <Text fontFamily="Outfit-Regular" color="#CFCFCF" fontSize="10">Name</Text>
                            <FormControl isInvalid={state.rel2_name_invalid}>
                                <Input onChangeText={onChangeRel2_Name} value={credentials.rel2_name} fontFamily="Outfit-Regular" color="#ffffff" fontSize="12" _focus={{ borderColor: "#2D2D2D" }} borderColor="#2D2D2D" bgColor="#2D2D2D" w="100%" h="8" />
                                <FormControl.ErrorMessage>{state.error}</FormControl.ErrorMessage>
                            </FormControl>
                        </View>
                        <View rounded="lg" style={{ backgroundColor: '#2D2D2D' }} pt="2" px="3">
                            <Text fontFamily="Outfit-Regular" color="#CFCFCF" fontSize="10">Phone Number</Text>
                            <FormControl isInvalid={state.rel2_phone_invalid}>
                                <Input onChangeText={onChangeRel2_Phone} value={credentials.rel2_phone} fontFamily="Outfit-Regular" color="#ffffff" fontSize="12" _focus={{ borderColor: "#2D2D2D" }} borderColor="#2D2D2D" bgColor="#2D2D2D" w="100%" h="8" />
                                <FormControl.ErrorMessage>{state.error}</FormControl.ErrorMessage>
                            </FormControl>
                        </View>
                        <FormControl isInvalid={state.authError}>

                            <FormControl.ErrorMessage>Some Data fields are missing.</FormControl.ErrorMessage>
                        </FormControl>
                        {state.isLoading ? <Spinner color="#F8CF6E" size="lg" /> : <Stack space={4} >
                            <Box rounded="sm" bg={{
                                linearGradient: {
                                    colors: ["#F8CF6E", "#F6B839"],
                                    start: [0, 0],
                                    end: [0, 1]
                                }
                            }}>
                                <Button onPress={updateProfile} colorScheme="coolGray" bg="transparent" activeOpacity={1} _text={{ color: "#2D2D2D", fontFamily: 'Outfit-SemiBold' }} py={3} size="lg">
                                    Complete Profile
                                </Button>
                            </Box>
                        </Stack>}



                    </Stack>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const mapStateToProps = (state) => {
    return {
        profile: state.auth.profile,
        profileUpdateError: state.auth.profileUpdateError,
        isAuthenticated: state.auth.isAuthenticated,
        uploadedAttachment: state.auth.uploadedAttachment,
        uploadedAttachmentError: state.auth.uploadedAttachmentError,
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        clearMessage: () => dispatch(clearMessage()),
        uploadAttachment: (creds) => dispatch(uploadAttachment(creds)),
        updateProfile: (creds) => dispatch(updateProfile(creds))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(CompleteProfile)