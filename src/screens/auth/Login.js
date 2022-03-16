import React, { useState, useEffect } from 'react'
import { StyleSheet, View, LogBox, TouchableOpacity } from 'react-native';
import { FormControl, Button, Flex, Image, Stack, Center, Input, Toast, Text, KeyboardAvoidingView } from 'native-base';
import { login, clearMessage } from '../../redux/actions/authActions'
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux'
import logo from '../../../assets/logo.png'
LogBox.ignoreLogs(['NativeBase: The contrast ratio of 1.524824437896998:1 for #2D2D2D on transparent']);
function Login(props) {

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })


    const [state, setState] = useState({
        isLoading: false,

    })

    useEffect(() => {
        // requestReadExternalStoragePermission()

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

    }, [props.authError, props.isAuthenticated])




    const SignIn = async () => {

        // if (credentials.guid == '') {
        //     Toast.show({
        //         text: 'Please enter GUID.',
        //         buttonText: "Okay",
        //         type: "danger"
        //     })
        // } else {
        //     setState({ ...state, isLoading: true })
        //     props.login(credentials)
        // }
        props.login(credentials)
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
                    <Center size="500" >
                        <Stack space={4} w="100%" maxW="350px" >

                            <Text fontFamily="Outfit-Medium" color="#ffffff" fontSize="xl">Login</Text>
                            <FormControl>
                                <Input fontFamily="Outfit-Regular" color="#CFCFCF" fontSize="16" _focus={{ borderColor: "black" }} borderColor="#2D2D2D" bgColor="#2D2D2D" py={3} style={{ backgroundColor: 'pink' }} size="2xl" placeholder="Email Address" />
                                <FormControl.ErrorMessage>Something is wrong.</FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl>
                                <Input fontFamily="Outfit-Regular" color="#CFCFCF" fontSize="16" _focus={{ borderColor: "black" }} borderColor="#2D2D2D" bgColor="#2D2D2D" py={3} size="2xl" type="password" placeholder="Password" />
                                <FormControl.ErrorMessage>Something is wrong.</FormControl.ErrorMessage>
                            </FormControl>
                            <Text textAlign="right" fontFamily="Outfit-Regular" color="#CFCFCF" fontSize="xs">Forgot Password?</Text>
                            <LinearGradient style={{ borderRadius: 6 }} colors={['#F8CF6E', '#F6B839']} >
                                <Button onPress={SignIn} colorScheme="coolGray" _text={{ color: "#2D2D2D", fontFamily: 'Outfit-SemiBold' }} py={3} bg="transparent" size="lg">
                                    Login
                                </Button>
                            </LinearGradient>

                            <TouchableOpacity onPress={() => props.navigation.navigate('SignUp', { accepted: false })} >

                                <Text textAlign="center" fontFamily="Outfit-Regular" color="#CFCFCF" fontSize="xs">Don’t Have An Account? Register</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)