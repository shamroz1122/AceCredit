import React, { useState, useEffect } from 'react'
import { StyleSheet, View, LogBox, TouchableOpacity } from 'react-native';
import { FormControl, Checkbox, Button, Flex, Image, Stack, Center, Input, Toast, Text, KeyboardAvoidingView } from 'native-base';
import { login, clearMessage } from '../../redux/actions/authActions'
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux'
import logo from '../../../assets/logo.png'
LogBox.ignoreLogs(['NativeBase: The contrast ratio of 1.524824437896998:1 for #2D2D2D on transparent']);
function SignUp(props) {

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    })

    const [state, setState] = useState({
        isLoading: false,
        termsAndConditions: false

    })

    useEffect(() => {
        // requestReadExternalStoragePermission()
        if (props.route.params.accepted) {
            setState({ ...state, termsAndConditions: true })
        }

        if (props.isAuthenticated) {
            setState({ ...state, isLoading: false })
            props.navigation.navigate('DownloadingMedia'); // push user to dashboard when they login

        }

        if (props.authError) {

            setState({ ...state, isLoading: false })
            Toast.show({
                text: props.authError,
                buttonText: "Okay",
                type: "danger"
            })
            props.clearMessage()
        }

    }, [props.authError, props.isAuthenticated, props.route.params.accepted])




    const SignIn = async () => {

        if (credentials.guid == '') {
            Toast.show({
                text: 'Please enter GUID.',
                buttonText: "Okay",
                type: "danger"
            })
        } else {
            setState({ ...state, isLoading: true })
            props.login(credentials)
        }
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
                        <Stack space={4} w="100%" maxW="350px" >

                            <Text fontFamily="Outfit-Medium" color="#ffffff" fontSize="xl">Register</Text>
                            <FormControl>
                                <Input fontFamily="Outfit-Regular" color="#CFCFCF" fontSize="16" _focus={{ borderColor: "black" }} borderColor="#2D2D2D" bgColor="#2D2D2D" py={3} style={{ backgroundColor: 'pink' }} size="2xl" placeholder="Full Name" />
                                <FormControl.ErrorMessage>Something is wrong.</FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl>
                                <Input fontFamily="Outfit-Regular" color="#CFCFCF" fontSize="16" _focus={{ borderColor: "black" }} borderColor="#2D2D2D" bgColor="#2D2D2D" py={3} style={{ backgroundColor: 'pink' }} size="2xl" placeholder="Email Address" />
                                <FormControl.ErrorMessage>Something is wrong.</FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl>
                                <Input fontFamily="Outfit-Regular" color="#CFCFCF" fontSize="16" _focus={{ borderColor: "black" }} borderColor="#2D2D2D" bgColor="#2D2D2D" py={3} size="2xl" type="password" placeholder="Password" />
                                <FormControl.ErrorMessage>Something is wrong.</FormControl.ErrorMessage>
                            </FormControl>

                            <Flex flexDirection={"row"}>
                                <View>
                                    <Checkbox onChange={() => setState({ ...state, termsAndConditions: !state.termsAndConditions })} isChecked={state.termsAndConditions} colorScheme="yellow">
                                        <Text></Text>
                                    </Checkbox>
                                </View>
                                <View>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('TermsConditions')} >

                                        <Text underline textAlign="left" fontFamily="Outfit-Regular" px="3" color="#CFCFCF" fontSize="xs">I accept all Terms & Conditions</Text>
                                    </TouchableOpacity>
                                </View>

                            </Flex>

                            <LinearGradient style={{ borderRadius: 6 }} colors={['#F8CF6E', '#F6B839']} >
                                <Button colorScheme="coolGray" _text={{ color: "#2D2D2D", fontFamily: 'Outfit-SemiBold' }} py={3} bg="transparent" size="lg">
                                    Register
                                </Button>
                            </LinearGradient>

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
        authError: state.auth.authError,
        isAuthenticated: state.auth.isAuthenticated,
        data: state.auth.data,
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        login: (creds) => dispatch(login(creds)),
        clearMessage: () => dispatch(clearMessage())
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)