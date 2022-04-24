import React, { useState, useEffect } from 'react'
import { StyleSheet, View, LogBox, TouchableOpacity } from 'react-native';
import { FormControl, Checkbox, Button, Flex, Image, Stack, Center, Input, Toast, Text, KeyboardAvoidingView, Spinner } from 'native-base';
import { signUp, clearMessage } from '../../redux/actions/authActions'
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from '../../../assets/logo.png'
LogBox.ignoreLogs(['NativeBase: The contrast ratio of 1.524824437896998:1 for #2D2D2D on transparent']);
function SignUp(props) {

    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: '',
    })

    const [state, setState] = useState({
        isLoading: false,
        termsAndConditions: false,
        isLoading: false,
        error: '',
        isTermsInValid: false,
        isNameInvalid: false,
        isEmailInvalid: false,
        isPasswordInvalid: false,
        authError: false
    })

    useEffect(() => {
        // requestReadExternalStoragePermission()
        if (props.route.params.accepted) {
            setState({ ...state, termsAndConditions: true })
        }

        if (props.isAuthenticated) {
            setState({ ...state, isLoading: false })
            props.navigation.navigate('Home'); // push user to dashboard when they login

        }

        if (props.signUpError) {
            if (props.signUpError.email) {
                setState({ ...state, error: props.signUpError.email, isEmailInvalid: true, isLoading: false })
            }


            props.clearMessage()
        }

    }, [props.signUpError, props.isAuthenticated, props.route.params.accepted])

    const validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const SignUp = async () => {

        if (!state.termsAndConditions) {

            setState({ ...state, isTermsInValid: true, error: "Please accept Terms & Conditions" })

        } else if (credentials.name == '') {

            setState({ ...state, isNameInvalid: true, isTermsInValid: false, isEmailInvalid: false, isPasswordInvalid: false, error: "Name is required." })

        } else if (credentials.email == '' || !validateEmail(credentials.email)) {

            setState({ ...state, isTermsInValid: false, isEmailInvalid: true, isPasswordInvalid: false, isNameInvalid: false, error: "Please enter a valid email address" })

        } else if (credentials.password == '') {
            setState({ ...state, isNameInvalid: false, isTermsInValid: false, isEmailInvalid: false, isPasswordInvalid: true, error: "Password is required." })

        } else {
            setState({ ...state, isLoading: true, isNameInvalid: false, isTermsInValid: false, isEmailInvalid: false, isPasswordInvalid: false, })

            credentials.device_token = props.deviceToken
            props.signUp(credentials)

        }

    }

    const onChangeName = (text) => {
        setCredentials({ ...credentials, name: text })
    }

    const onChangeEmail = (text) => {
        setCredentials({ ...credentials, email: text })
    }

    const onChangePassword = (text) => {
        setCredentials({ ...credentials, password: text })
    }

    return (

        <View style={styles.container}>
            <Flex alignItems="center">
                <Center size="100" pt="10">
                    <Stack w="100%" maxW="350px" >
                        <Image source={logo} alt="Ace Credit" size="xl" />
                        <Text textAlign="center" fontFamily="Outfit-Medium" color="#ffffff" fontSize="lg">Ace Credit</Text>
                    </Stack>
                </Center>
                <KeyboardAvoidingView h={{

                    lg: "auto"
                }} behavior={Platform.OS === "ios" ? "padding" : "height"}>

                    <Center size="500" pt="16" >
                        <Stack space={4} w="100%" maxW="350px" px="1">

                            <Text fontFamily="Outfit-Medium" color="#ffffff" fontSize="xl">Register</Text>
                            <FormControl isInvalid={state.isNameInvalid}>
                                <Input onChangeText={onChangeName} value={credentials.name} fontFamily="Outfit-Regular" color="#CFCFCF" fontSize="16" _focus={{ borderColor: "black" }} borderColor="#2D2D2D" bgColor="#2D2D2D" py={3} style={{ backgroundColor: 'pink' }} size="2xl" placeholder="Full Name" />
                                <FormControl.ErrorMessage>{state.error}</FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={state.isEmailInvalid}>
                                <Input onChangeText={onChangeEmail} value={credentials.email} fontFamily="Outfit-Regular" color="#CFCFCF" fontSize="16" _focus={{ borderColor: "black" }} borderColor="#2D2D2D" bgColor="#2D2D2D" py={3} style={{ backgroundColor: 'pink' }} size="2xl" placeholder="Email Address" />
                                <FormControl.ErrorMessage>{state.error}</FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={state.isPasswordInvalid}>
                                <Input onChangeText={onChangePassword} value={credentials.password} fontFamily="Outfit-Regular" color="#CFCFCF" fontSize="16" _focus={{ borderColor: "black" }} borderColor="#2D2D2D" bgColor="#2D2D2D" py={3} size="2xl" type="password" placeholder="Password" />
                                <FormControl.ErrorMessage>{state.error}</FormControl.ErrorMessage>
                            </FormControl>

                            <Flex flexDirection={"row"}>
                                <View>
                                    <Checkbox onChange={() => setState({ ...state, termsAndConditions: !state.termsAndConditions })} isChecked={state.termsAndConditions} colorScheme="yellow">
                                        <Text></Text>
                                    </Checkbox>
                                </View>
                                <View>
                                    <FormControl isInvalid={state.isTermsInValid}>
                                        <TouchableOpacity onPress={() => props.navigation.navigate('TermsConditions')} >

                                            <Text underline textAlign="left" fontFamily="Outfit-Regular" px="3" color="#CFCFCF" fontSize="xs">I accept all Terms & Conditions</Text>
                                        </TouchableOpacity>
                                        <FormControl.ErrorMessage>{state.error}</FormControl.ErrorMessage>
                                    </FormControl>
                                </View>

                            </Flex>

                            {state.isLoading ? <Spinner color="#F8CF6E" size="lg" /> : <LinearGradient style={{ borderRadius: 6 }} colors={['#F8CF6E', '#F6B839']} >
                                <Button onPress={SignUp} colorScheme="coolGray" _text={{ color: "#2D2D2D", fontFamily: 'Outfit-SemiBold' }} py={3} bg="transparent" size="lg">
                                    Register
                                </Button>
                            </LinearGradient>}

                            <TouchableOpacity onPress={() => props.navigation.navigate('Login')} >

                                <Text textAlign="center" fontFamily="Outfit-Regular" color="#CFCFCF" fontSize="xs">Already Have An Account? Login</Text>
                            </TouchableOpacity>

                        </Stack>

                    </Center>
                </KeyboardAvoidingView>
            </Flex>
        </View >

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        //padding: 25,
        backgroundColor: '#1f1f1f'
    },

})

const mapStateToProps = (state) => {
    return {
        signUpError: state.auth.signUpError,
        isAuthenticated: state.auth.isAuthenticated,
        data: state.auth.data,
        deviceToken: state.auth.deviceToken
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        signUp: (creds) => dispatch(signUp(creds)),
        clearMessage: () => dispatch(clearMessage())
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)