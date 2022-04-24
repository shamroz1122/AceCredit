import React, { useState, useEffect } from 'react'
import { Image, Pressable, Button, Text, View, Box, Spinner, Badge, HStack, VStack, Modal, Center, Skeleton } from 'native-base'
import { clearNotificationsMessages, getNotifications } from '../../redux/actions/notificationsActions'
import { connect } from 'react-redux'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ScrollView, RefreshControl } from 'react-native'

function Notification(props) {


    const [state, setState] = useState({
        notifications: [],
        isLoading: true,

    })
    const [refreshing, setRefreshing] = React.useState(false);
    useEffect(() => {
        props.getNotifications()


    }, [])

    useEffect(() => {

        if (props.notifications.length) {
            setState((state) => ({
                ...state,
                isLoading: false,
                notifications: props.notifications,

            }))
            props.clearNotificationsMessages()
        }

        // setState((state) => ({
        //     ...state,
        //     isLoading: false,
        // }))

        if (props.notificationsError) {
            console.log('error occured', props.notificationsError)

        }

    }, [props.notificationsError, props.notifications])

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        props.getNotifications()
        wait(2000).then(() => setRefreshing(false));
    }, []);


    const notifications = state.notifications.length > 0 ? (

        state.notifications.map((notification, index) => {

            return (

                <Box key={index} shadow="8" rounded="lg" bg="#2D2D2D" p="3">
                    <View style={{ flex: 1, flexDirection: 'row' }} >
                        <View style={{ flex: 1, flexDirection: 'column' }}>

                            <Box alignItems='center' rounded="lg" justifyContent="center" bg={{
                                linearGradient: {
                                    colors: ["#F8CF6E", "#F6B839"],

                                }
                            }} h="16" >

                                <MaterialIcons size={26} name="notifications" color="#ffffff" />

                            </Box>

                        </View>
                        <View style={{ flex: 4, flexDirection: 'column', justifyContent: 'center' }} pl="5">
                            <Text color="#ffffff" fontFamily="Outfit-Medium" fontSize="sm">
                                {notification.title}
                            </Text>
                            <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                                {notification.body}
                            </Text>
                        </View>
                    </View>
                </Box>

            )
        })

    ) : <Text textAlign="center" fontFamily="Outfit-Regular" color="#CFCFCF" fontSize={12}>Opps! No Promotions Yet.</Text>


    return (
        <View style={{ flex: 1, backgroundColor: '#1f1f1f' }}>
            <View style={{ flex: 1 }} px="5"  >

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentInsetAdjustmentBehavior="automatic"
                    refreshControl={
                        <RefreshControl
                            colors={['#F8CF6E']}
                            progressBackgroundColor="#1f1f1f"
                            tintColor="#F8CF6E"
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <VStack pb="10" pt="5" space={4} >

                        {state.isLoading ? <Spinner pt="10" color="#F8CF6E" size="lg" /> : notifications}

                    </VStack>
                </ScrollView>

            </View>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        notifications: state.notifications.notifications,
        notificationsError: state.notifications.notificationsError,
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        getNotifications: () => dispatch(getNotifications()),
        clearNotificationsMessages: () => dispatch(clearNotificationsMessages()),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
