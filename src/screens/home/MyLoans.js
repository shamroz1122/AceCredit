import { View, Text, Box, Divider, Badge, Spinner } from 'native-base'
import { SafeAreaView, ScrollView, useWindowDimensions, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'
import Feather from 'react-native-vector-icons/Feather';
import { clearPackagesMessages, getLoans } from '../../redux/actions/packagesActions'
import { connect } from 'react-redux'

function AllRoute(props) {

    const allLoansApplied = props.allLoans.length > 0 ? (

        props.allLoans.map((allLoan, index) => {

            var colorScheme = ''
            var status = ''
            if (allLoan.status == 'active') {
                colorScheme = 'success'
                status = "Active"
            } else if (allLoan.status == 'expired') {
                colorScheme = 'danger'
                status = "Expired"
            } else if (allLoan.status == 'pending') {
                colorScheme = 'warning'
                status = "Pending"
            }
            else if (allLoan.status == 'completed') {
                colorScheme = 'info'
                status = "Completed"
            }
            else if (allLoan.status == 'rejected') {
                colorScheme = 'danger'
                status = "Rejected"
            }


            return (

                <View key={index} style={{ backgroundColor: '#2D2D2D' }} m="4" p="4" rounded="lg">
                    <View style={{ flexDirection: 'row', }}>
                        <Box alignItems='center' rounded="lg" justifyContent="center" bg={{
                            linearGradient: {
                                colors: ["#F8CF6E", "#F6B839"],

                            }
                        }} h="12" w="12" >

                            <Feather size={26} name="home" color="#000000" />

                        </Box>
                        <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>

                            <View style={{ width: "85%", flexDirection: 'row', justifyContent: 'space-between' }}>

                                <Text pl="5" color="#ffffff" fontFamily="Outfit-Medium" fontSize="sm">
                                    {allLoan.package_name}
                                </Text>

                                <Text pl="7" color="#ffffff" fontFamily="Outfit-Medium" fontSize="sm"  >
                                    RM{allLoan.requested_amount}
                                </Text>
                            </View>

                            <Badge ml="5" rounded="xl" alignSelf="flex-start" colorScheme={colorScheme} variant="solid" _text={{
                                fontFamily: "Outfit-Regular"
                            }}>{status}</Badge>

                        </View>

                    </View>
                    <Divider mt="4" mb="2" alignSelf="center" bg="#CFCFCF" thickness="0.3" />
                    <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                            Loan Applied
                        </Text>
                        <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                            {allLoan.approved_date}
                        </Text>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                            Loan Expiry Date
                        </Text>
                        <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                            {allLoan.expiry_date}
                        </Text>
                    </View>
                </View>


            )
        })

    ) : <Text pt="10" textAlign="center" fontFamily="Outfit-Regular" color="#CFCFCF" fontSize={12}>No record found!</Text>

    return <View style={{ flex: 1 }} >
        {props.isLoading ? <Spinner pt="10" color="#F8CF6E" size="lg" /> :

            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        colors={['#F8CF6E']}
                        progressBackgroundColor="#1f1f1f"
                        tintColor="#F8CF6E"
                        refreshing={props.refreshingNow}
                        onRefresh={props.onRefreshLoans}
                    />
                }
            >

                {allLoansApplied}

            </ScrollView>}
    </View>
}

function ActiveRoute(props) {


    const activeLoansApplied = props.activeLoans.length > 0 ? (

        props.activeLoans.map((allLoan, index) => {

            return (

                <View key={index} style={{ backgroundColor: '#2D2D2D' }} m="4" p="4" rounded="lg">
                    <View style={{ flexDirection: 'row', }}>
                        <Box alignItems='center' rounded="lg" justifyContent="center" bg={{
                            linearGradient: {
                                colors: ["#F8CF6E", "#F6B839"],

                            }
                        }} h="12" w="12" >

                            <Feather size={26} name="home" color="#000000" />

                        </Box>
                        <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>

                            <View style={{ width: "85%", flexDirection: 'row', justifyContent: 'space-between' }}>

                                <Text pl="5" color="#ffffff" fontFamily="Outfit-Medium" fontSize="sm">
                                    {allLoan.package_name}
                                </Text>

                                <Text pl="7" color="#ffffff" fontFamily="Outfit-Medium" fontSize="sm"  >
                                    RM{allLoan.requested_amount}
                                </Text>
                            </View>

                            <Badge ml="5" rounded="xl" alignSelf="flex-start" colorScheme="success" variant="solid" _text={{
                                fontFamily: "Outfit-Regular"
                            }}>Active</Badge>

                        </View>

                    </View>
                    <Divider mt="4" mb="2" alignSelf="center" bg="#CFCFCF" thickness="0.3" />
                    <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                            Loan Applied
                        </Text>
                        <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                            {allLoan.approved_date}
                        </Text>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                            Loan Expiry Date
                        </Text>
                        <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                            {allLoan.expiry_date}
                        </Text>
                    </View>
                </View>


            )
        })

    ) : <Text pt="10" textAlign="center" fontFamily="Outfit-Regular" color="#CFCFCF" fontSize={12}>No record found!</Text>

    return <View style={{ flex: 1 }} >
        {props.isLoading ? <Spinner pt="10" color="#F8CF6E" size="lg" /> :

            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        colors={['#F8CF6E']}
                        progressBackgroundColor="#1f1f1f"
                        tintColor="#F8CF6E"
                        refreshing={props.refreshingNow}
                        onRefresh={props.onRefreshLoans}
                    />
                }
            >

                {activeLoansApplied}

            </ScrollView>}
    </View>


}
function ExpiredRoute(props) {


    const expiredLoansApplied = props.expiredLoans.length > 0 ? (

        props.expiredLoans.map((allLoan, index) => {

            return (

                <View key={index} style={{ backgroundColor: '#2D2D2D' }} m="4" p="4" rounded="lg">
                    <View style={{ flexDirection: 'row', }}>
                        <Box alignItems='center' rounded="lg" justifyContent="center" bg={{
                            linearGradient: {
                                colors: ["#F8CF6E", "#F6B839"],

                            }
                        }} h="12" w="12" >

                            <Feather size={26} name="home" color="#000000" />

                        </Box>
                        <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>

                            <View style={{ width: "85%", flexDirection: 'row', justifyContent: 'space-between' }}>

                                <Text pl="5" color="#ffffff" fontFamily="Outfit-Medium" fontSize="sm">
                                    {allLoan.package_name}
                                </Text>

                                <Text pl="7" color="#ffffff" fontFamily="Outfit-Medium" fontSize="sm"  >
                                    RM{allLoan.requested_amount}
                                </Text>
                            </View>

                            <Badge ml="5" rounded="xl" alignSelf="flex-start" colorScheme="danger" variant="solid" _text={{
                                fontFamily: "Outfit-Regular"
                            }}>Expired</Badge>

                        </View>

                    </View>
                    <Divider mt="4" mb="2" alignSelf="center" bg="#CFCFCF" thickness="0.3" />
                    <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                            Loan Applied
                        </Text>
                        <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                            {allLoan.approved_date}
                        </Text>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                            Loan Expiry Date
                        </Text>
                        <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                            {allLoan.expiry_date}
                        </Text>
                    </View>
                </View>


            )
        })

    ) : <Text pt="10" textAlign="center" fontFamily="Outfit-Regular" color="#CFCFCF" fontSize={12}>No record found!</Text>

    return <View style={{ flex: 1 }} >
        {props.isLoading ? <Spinner pt="10" color="#F8CF6E" size="lg" /> :

            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        colors={['#F8CF6E']}
                        progressBackgroundColor="#1f1f1f"
                        tintColor="#F8CF6E"
                        refreshing={props.refreshingNow}
                        onRefresh={props.onRefreshLoans}
                    />
                }>

                {expiredLoansApplied}

            </ScrollView>}
    </View>


}


function CompletedRoute(props) {


    const completedLoansApplied = props.completedLoans.length > 0 ? (

        props.completedLoans.map((allLoan, index) => {

            return (

                <View key={index} style={{ backgroundColor: '#2D2D2D' }} m="4" p="4" rounded="lg">
                    <View style={{ flexDirection: 'row', }}>
                        <Box alignItems='center' rounded="lg" justifyContent="center" bg={{
                            linearGradient: {
                                colors: ["#F8CF6E", "#F6B839"],

                            }
                        }} h="12" w="12" >

                            <Feather size={26} name="home" color="#000000" />

                        </Box>
                        <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>

                            <View style={{ width: "85%", flexDirection: 'row', justifyContent: 'space-between' }}>

                                <Text pl="5" color="#ffffff" fontFamily="Outfit-Medium" fontSize="sm">
                                    {allLoan.package_name}
                                </Text>

                                <Text pl="7" color="#ffffff" fontFamily="Outfit-Medium" fontSize="sm"  >
                                    RM{allLoan.requested_amount}
                                </Text>
                            </View>

                            <Badge ml="5" rounded="xl" alignSelf="flex-start" colorScheme="info" variant="solid" _text={{
                                fontFamily: "Outfit-Regular"
                            }}>Completed</Badge>

                        </View>

                    </View>
                    <Divider mt="4" mb="2" alignSelf="center" bg="#CFCFCF" thickness="0.3" />
                    <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                            Loan Applied
                        </Text>
                        <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                            {allLoan.approved_date}
                        </Text>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                            Loan Expiry Date
                        </Text>
                        <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                            {allLoan.expiry_date}
                        </Text>
                    </View>
                </View>


            )
        })

    ) : <Text pt="10" textAlign="center" fontFamily="Outfit-Regular" color="#CFCFCF" fontSize={12}>No record found!</Text>

    return <View style={{ flex: 1 }} >
        {props.isLoading ? <Spinner pt="10" color="#F8CF6E" size="lg" /> :

            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        colors={['#F8CF6E']}
                        progressBackgroundColor="#1f1f1f"
                        tintColor="#F8CF6E"
                        refreshing={props.refreshingNow}
                        onRefresh={props.onRefreshLoans}
                    />
                }>

                {completedLoansApplied}

            </ScrollView>}
    </View>


}

// const renderScene = SceneMap({
//     all: AllRoute,
//     active: ActiveRoute,
//     expired: ExpiredRoute,
//     completed: CompletedRoute,
// });


const renderTabBar = props => (
    <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: '#F8CD69' }}
        style={{ backgroundColor: '#2D2D2D' }}
        renderLabel={({ route, focused, color }) => (
            focused ? <Text color="#F8CD69" fontFamily="Outfit-Medium" fontSize="sm">
                {route.title}
            </Text> : <Text color="#CFCFCF" fontFamily="Outfit-Medium" fontSize="sm">
                {route.title}
            </Text>
        )}
    />
);
function MyLoans(props) {

    const [state, setState] = useState({
        allLoans: [],
        activeLoans: [],
        completedLoans: [],
        expiredLoans: [],
        isLoanLaoding: true,
    })
    const [refreshing, setRefreshing] = React.useState(false);
    useEffect(() => {
        props.getLoans()

    }, [])


    useEffect(() => {

        if (Object.keys(props.loans).length) {

            //console.log(props.loans.all)
            setState((state) => ({
                ...state,
                isLoanLaoding: false,
                allLoans: props.loans.all,
                activeLoans: props.loans.active,
                completedLoans: props.loans.completed,
                expiredLoans: props.loans.expired,
            }))
            props.clearPackagesMessages()
        }

        setState((state) => ({
            ...state,
            isLoanLaoding: false,
        }))

        if (props.loansError) {
            console.log('error occured', props.getPackagesError)

        }

    }, [props.loansError, props.loans])

    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'all', title: 'All' },
        { key: 'active', title: 'Active' },
        { key: 'expired', title: 'Expired' },
        { key: 'completed', title: 'Completed' },
    ]);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        props.getLoans()
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'all':
                return <AllRoute isLoading={state.isLoanLaoding} refreshingNow={refreshing} onRefreshLoans={onRefresh} allLoans={state.allLoans} />;
            case 'active':
                return <ActiveRoute isLoading={state.isLoanLaoding} refreshingNow={refreshing} onRefreshLoans={onRefresh} activeLoans={state.activeLoans} />;
            case 'expired':
                return <ExpiredRoute isLoading={state.isLoanLaoding} refreshingNow={refreshing} onRefreshLoans={onRefresh} expiredLoans={state.expiredLoans} />;
            case 'completed':
                return <CompletedRoute isLoading={state.isLoanLaoding} refreshingNow={refreshing} onRefreshLoans={onRefresh} completedLoans={state.completedLoans} />;
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#1f1f1f' }}>

            <TabView
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}

            />

        </SafeAreaView>
    )
}


const mapStateToProps = (state) => {
    return {

        loans: state.packages.loans,
        loansError: state.packages.loansError,
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        clearPackagesMessages: () => dispatch(clearPackagesMessages()),
        getLoans: () => dispatch(getLoans()),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(MyLoans)
