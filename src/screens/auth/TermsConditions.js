import React, { useState, useEffect } from 'react'
import { StyleSheet, StatusBar, SafeAreaView, ScrollView, LogBox, } from 'react-native';
import { Button, Stack, Center, Text, Spacer, View } from 'native-base';
import { login, clearMessage } from '../../redux/actions/authActions'
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux'

LogBox.ignoreLogs(['NativeBase: The contrast ratio of 1.524824437896998:1 for #2D2D2D on transparent']);
function Login(props) {

    return (

        <View style={styles.container}>
            <StatusBar backgroundColor="#2D2D2D" barStyle={'light-content'} />
            <Center>
                <SafeAreaView >
                    <ScrollView contentInsetAdjustmentBehavior="automatic">

                        <View p="5" >

                            <Text textAlign="justify" fontFamily="Outfit-Regular" color="#CFCFCF" fontSize="12">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit nu ncultrices amet gravida quam tincidunt purus suspendisse sceleris que. Eleifend id ullamcorper malesuada cras commodo nibh cursu saliquet. Et suspendisse tristique facilisis porttitor ultricies eu sit int eger. Mauris nulla eu, vitae elementum metus venenatis nulla ut. Non interdum in id sapien amet. Purus nunc congue risus sed duis donec duis varius.
                            </Text>


                            <Text pt="5" textAlign="justify" fontFamily="Outfit-Regular" color="#CFCFCF" fontSize="12">
                                Vestibulum nunc ac non mi vitae vel venenatis sit tortor. Non in leo porttitor consequat id ullamcorper aliquet dolor. Quam bibendum neque venenatis adipiscing duis faucibus quam. Risus morbi ipsum maecenas tristique congue luctus. Nec massa porta nulla diam. Magna gravida congue sit massa, pellentesque. Est tempus consequat ac ipsum est vehicula semper euismod. Fames ullamcorper ornare tellus porta in quam morbi tellus, euismod. Pellentesque elementum vel sagittis pulvinar ullamcorper condimentum ac elementum. Sed nec tempus, eros, pulvinar. Sed eget eu elit volutpat est eu feugiat elementum in. Nunc duis sed viverra purus. Viverra convallis accumsan eu in sed penatibus quisque feugiat.
                            </Text>

                            <Text pt="5" textAlign="justify" fontFamily="Outfit-Regular" color="#CFCFCF" fontSize="12">
                                Cursus ac odio tincidunt pretium mi egestas fusce pellentesque. Sed mauris aliquet cras eget tortor accumsan pretium nullam nibh. Convallis tellus vestibulum in nullam imperdiet tempus ut scelerisque. Sagittis id in non imperdiet urna, aenean sed. Mattis lectus cursus ultricies tincidunt facilisis iaculis suspendisse arcu. Risus enim cursus mattis proin lectus non dignissim volutpat id. Sollicitudin suspendisse dui nibh tellus sed quam in non. Sollicitudin quis arcu ut proin viverra nibh mattis venenatis turpis. Blandit lectus aliquam at varius. Blandit ultrices metus adipiscing lacus mattis hendrerit amet odio.
                                Nullam amet etiam eget amet urna, mi diam. Ullamcorper libero pretium, odio donec quam. Dictum vulputate ipsum in mi suspendisse nec velit. Massa ultrices tellus eget duis. Est nisl malesuada id purus etiam quis diam consectetur tortor. Vestibulum egestas cursus aliquam lorem aenean augue sit ultrices. In fringilla non vitae volutpat quam tellus eros pellentesque sit.
                            </Text>

                            <Stack pt="5" space={4} w="100%" maxW="350px" >
                                <LinearGradient style={{ borderRadius: 6 }} colors={['#F8CF6E', '#F6B839']} >
                                    <Button activeOpacity={1} onPress={() => props.navigation.navigate('SignUp', { accepted: 'accepted' })} colorScheme="coolGray" _text={{ color: "#2D2D2D", fontFamily: 'Outfit-SemiBold' }} py={3} bg="transparent" size="lg">
                                        Accept And Continue
                                    </Button>
                                </LinearGradient>
                            </Stack>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Center>
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