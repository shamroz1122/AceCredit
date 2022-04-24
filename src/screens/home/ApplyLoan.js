import React, { useRef, useState, useEffect } from 'react'
import { Slider, Button, Divider, Text, View, Box, Stack, useToast, Spinner } from 'native-base'
import { SafeAreaView, ScrollView } from 'react-native';
import { appLyLoanPlan, clearPackagesMessages } from '../../redux/actions/packagesActions'
import { connect } from 'react-redux'

function ApplyLoan(props) {
    const [packageAmountValue, setOnChangeValue] = React.useState(props.route.params.item.package_min_amount);
    const [periodValue, setOnChangeDaysValue] = React.useState(props.route.params.item.period_min);
    const toast = useToast();

    const [credentials, setCredentials] = useState({
        underwriting_fee: 0,
        gateway_fee: 0,
        service_fee: 0,
        system_fee: 0,
        amount_recieved: 0,
        requested_amount: 0,
        payment_amount: 0,
        periodValue: periodValue,
        interest: 0,
        package_id: ''
    })

    const [state, setState] = useState({
        isLoading: false
    })

    useEffect(() => {

        if (props.applyLoanSuccess) {
            setState((state) => ({
                ...state,
                isLoading: false,

            }))
            toast.show({
                title: "We have recieved your request, we will notify you as soon as possible.",
                status: "success",

            })
            props.clearPackagesMessages()
        }

        if (props.getPackagesError) {
            setState((state) => ({
                ...state,
                isLoading: false,

            }))
            toast.show({
                title: "Error While submitting loan.",
                status: "danger",

            })
            props.clearPackagesMessages()
        }


        if (props.getPackagesError) {
            console.log('error occured', props.getPackagesError)

        }

    }, [props.applyLoanSuccess, props.applyLoanError])

    useEffect(() => {

        var underwriting_fee_unit = props.route.params.item.underwriting_fee_unit
        var gateway_fee_unit = props.route.params.item.gateway_fee_unit
        var system_fee_unit = props.route.params.item.system_fee_unit
        var service_fee_unit = props.route.params.item.service_fee_unit

        var underwriting_fee = 0
        var gateway_fee = 0
        var system_fee = 0
        var service_fee = 0

        if (underwriting_fee_unit == 'fix') {

            underwriting_fee = props.route.params.item.underwriting_fees
            underwriting_fee = underwriting_fee.toFixed(2)
        } else {

            underwriting_fee = (packageAmountValue / 100) * props.route.params.item.underwriting_fees
            underwriting_fee = underwriting_fee.toFixed(2)
        }

        if (gateway_fee_unit == 'fix') {

            gateway_fee = props.route.params.item.gateway_fees
            gateway_fee = gateway_fee.toFixed(2)

        } else {

            gateway_fee = (packageAmountValue / 100) * props.route.params.item.gateway_fees
            gateway_fee = gateway_fee.toFixed(2)
        }

        if (system_fee_unit == 'fix') {

            system_fee = props.route.params.item.system_fees
            system_fee = system_fee.toFixed(2)

        } else {

            system_fee = (packageAmountValue / 100) * props.route.params.item.system_fees
            system_fee = system_fee.toFixed(2)

        }

        if (service_fee_unit == 'fix') {

            service_fee = props.route.params.item.service_fees
            service_fee = service_fee.toFixed(2)

        } else {

            service_fee = (packageAmountValue / 100) * props.route.params.item.service_fees
            service_fee = service_fee.toFixed(2)

        }

        var fee_sum = Number(underwriting_fee) + Number(gateway_fee) + Number(system_fee) + Number(service_fee)
        var amount_recieved = packageAmountValue - fee_sum
        amount_recieved = amount_recieved.toFixed(2)

        var interestRate = props.route.params.item.interest * periodValue
        interestRate = (packageAmountValue / 100) * interestRate


        var payment_amount = (packageAmountValue + interestRate) / periodValue
        payment_amount = payment_amount.toFixed(2)

        setCredentials((state) => ({
            ...credentials,
            underwriting_fee: underwriting_fee,
            gateway_fee: gateway_fee,
            system_fee: system_fee,
            service_fee: service_fee,
            requested_amount: packageAmountValue,
            amount_recieved: amount_recieved,
            payment_amount: payment_amount,
            periodValue: periodValue,
            interest: props.route.params.item.interest,
            package_id: props.route.params.item.id
        }))

    }, [packageAmountValue, periodValue])

    const applyLoan = async () => {

        setState({ ...state, isLoading: true })
        props.appLyLoanPlan(credentials)

    }

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
                    <Text color="#000000" fontFamily="Outfit-Bold" fontSize="4xl">{credentials.payment_amount}</Text>
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
                                MYR {packageAmountValue}
                            </Text>
                        </View>
                        <View pt="2" px="3">
                            <Slider size="lg" defaultValue={props.route.params.item.package_min_amount} minValue={props.route.params.item.package_min_amount} maxValue={props.route.params.item.package_max_amount} colorScheme="yellow" onChange={v => {
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
                                Period (In Months)
                            </Text>
                            <Text color="#F8CD69" fontFamily="Outfit-Regular" fontSize="sm">
                                {periodValue} month
                            </Text>
                        </View>
                        <View pt="2" px="3">
                            <Slider size="lg" defaultValue={props.route.params.item.period_min} minValue={props.route.params.item.period_min} maxValue={props.route.params.item.period_max} colorScheme="yellow" onChange={v => {
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
                                {props.route.params.item.interest} %
                            </Text>
                        </View>
                        <View pt="1" style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                                Underwriting Fee
                            </Text>
                            <Text color="#ffffff" fontFamily="Outfit-Regular" fontSize={12}>
                                RM - {credentials.underwriting_fee}
                            </Text>
                        </View>
                        <View pt="1" style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                                Gateway Fee
                            </Text>
                            <Text color="#ffffff" fontFamily="Outfit-Regular" fontSize={12}>
                                RM - {credentials.gateway_fee}
                            </Text>
                        </View>
                        <View pt="1" style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                                Service Fee
                            </Text>
                            <Text color="#ffffff" fontFamily="Outfit-Regular" fontSize={12}>
                                RM - {credentials.service_fee}
                            </Text>
                        </View>
                        <View pt="1" style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                                System Fee
                            </Text>
                            <Text color="#ffffff" fontFamily="Outfit-Regular" fontSize={12}>
                                RM - {credentials.system_fee}
                            </Text>
                        </View>


                        <Divider my="4" bg="#CFCFCF" thickness="0.5" />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text color="#ffffff" fontFamily="Outfit-Medium" fontSize="sm">
                                Total Amount Recieved
                            </Text>
                            <Text color="#F8CD69" fontFamily="Outfit-Regular" fontSize="sm">
                                RM {credentials.amount_recieved}
                            </Text>
                        </View>
                        <View pb="10" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                            {state.isLoading ? <Spinner color="#F8CF6E" size="lg" pt="10" /> : <Stack pt="6" space={4} w="100%" maxW="350px" >
                                <Box rounded="sm" bg={{
                                    linearGradient: {
                                        colors: ["#F8CF6E", "#F6B839"],
                                        start: [0, 0],
                                        end: [0, 1]
                                    }
                                }}>
                                    <Button onPress={applyLoan} colorScheme="coolGray" bg="transparent" activeOpacity={1} _text={{ color: "#2D2D2D", fontFamily: 'Outfit-SemiBold' }} py={3} size="lg">
                                        Apply Now
                                    </Button>
                                </Box>
                            </Stack>}

                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>

        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        applyLoanError: state.packages.applyLoanError,
        applyLoanSuccess: state.packages.applyLoanSuccess,
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        appLyLoanPlan: (data) => dispatch(appLyLoanPlan(data)),
        clearPackagesMessages: () => dispatch(clearPackagesMessages()),

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ApplyLoan)