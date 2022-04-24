import { View, Text, Box, Button, Stack, Image, Center, Divider } from 'native-base'
import { TouchableOpacity, SafeAreaView, ScrollView, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'
import FrameNew from '../../../assets/FrameNew.png'
const FirstRoute = (props) => (
    <View style={{ flex: 1 }} mb="10" >
        <ScrollView showsVerticalScrollIndicator={false}>


            <View rounded="lg" mt="5" style={{ flexDirection: 'column', backgroundColor: '#2D2D2D' }}>
                <View rounded="lg" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text pt="2" pl="2" color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={10}>
                        No.
                    </Text>
                    <Text pt="2" color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={10}>
                        Downline Name
                    </Text>
                    <Text pt="2" pr="2" color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={10}>
                        Amount
                    </Text>
                </View>
                <Divider my="2" alignSelf="center" bg="#CFCFCF" thickness="0.3" />
                <View py="10" style={{ justifyContent: 'space-around', alignItems: 'center' }}>
                    <Center>
                        <Image source={FrameNew} alt="Alternate Text" size={90} />
                    </Center>
                    <Text pt="2" color="#ffffff" fontFamily="Outfit-Medium" fontSize="sm">
                        No Record Found
                    </Text>
                </View>
            </View>
        </ScrollView >
    </View >
);

const SecondRoute = () => (
    <View style={{ flex: 1 }} mb="10" >
        <ScrollView showsVerticalScrollIndicator={false}>


            <View rounded="lg" mt="5" style={{ flexDirection: 'column', backgroundColor: '#2D2D2D' }}>
                <View rounded="lg" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text pt="2" pl="2" color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={10}>
                        No.
                    </Text>
                    <Text pt="2" color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={10}>
                        Downline Name
                    </Text>
                    <Text pt="2" pr="2" color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={10}>
                        Amount
                    </Text>
                </View>
                <Divider my="2" alignSelf="center" bg="#CFCFCF" thickness="0.3" />
                <View py="10" style={{ justifyContent: 'space-around', alignItems: 'center' }}>
                    <Center>
                        <Image source={FrameNew} alt="Alternate Text" size={90} />
                    </Center>
                    <Text pt="2" color="#ffffff" fontFamily="Outfit-Medium" fontSize="sm">
                        No Record Found
                    </Text>
                </View>
            </View>
        </ScrollView >
    </View >
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});

const renderTabBar = props => (
    <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: '#F8CD69' }}
        style={{ backgroundColor: '#1f1f1f' }}
        renderLabel={({ route, focused, color }) => (
            focused ? <Text color="#F8CD69" fontFamily="Outfit-Medium" fontSize="sm">
                {route.title}
            </Text> : <Text color="#CFCFCF" fontFamily="Outfit-Medium" fontSize="sm">
                {route.title}
            </Text>
        )}
    />
);
export default function ReferralHistory() {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Referral History' },
        { key: 'second', title: 'Withdrawal History' },
    ]);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#1f1f1f' }}>


            <View shadow="7" rounded="lg" pb="20" m="4" style={{ flex: 1, backgroundColor: '#2D2D2D' }}>
                <Text pt="3" pl="5" color="#ffffff" fontFamily="Outfit-Medium" fontSize="sm">
                    Total Commission
                </Text>
                <Text pl="5" color="#F8CD69" fontFamily="Outfit-Medium" fontSize="4xl">
                    RM 00.00
                </Text>
                <Divider my="2" w="90%" alignSelf="center" bg="#CFCFCF" thickness="0.5" />
                <View px="5" style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                        Total Commission
                    </Text>
                    <Text color="#ffffff" fontFamily="Outfit-Regular" fontSize="sm">
                        RM 0.00
                    </Text>
                </View>
                <View px="5" pb="5" style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text color="#CFCFCF" fontFamily="Outfit-Regular" fontSize={12}>
                        Balance
                    </Text>
                    <Text color="#ffffff" fontFamily="Outfit-Regular" fontSize="sm">
                        RM 0.00
                    </Text>
                </View>
            </View>
            <View mx="4" style={{ alignItems: 'center', justifyContent: 'space-between', flex: 1, flexDirection: "row" }}>
                <View p="2" rounded="lg" style={{ width: '48%', alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#F8CD69' }}>
                    <Text color="#000000" fontFamily="Outfit-Medium" fontSize="lg">
                        Total Register
                    </Text>
                    <Text color="#000000" fontWeight="bold" fontFamily="Outfit-Medium" fontSize="4xl">
                        0
                    </Text>
                </View>
                <View p="2" rounded="lg" style={{ width: '48%', alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#F8CD69' }}>
                    <Text color="#000000" fontFamily="Outfit-Medium" fontSize="lg">
                        Total Loans
                    </Text>
                    <Text color="#000000" fontWeight="bold" fontFamily="Outfit-Medium" fontSize="4xl">
                        0
                    </Text>
                </View>
            </View>
            <View style={{ flex: 3 }} px="5">
                <TabView
                    renderTabBar={renderTabBar}
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}

                />
            </View>



        </SafeAreaView>
    )
}