import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from '../../screens/HomeScreen'
import WatchedScreen from '../../screens/WatchedScreen'
import DetailScreen from '../../screens/DetailScreen'
import WelcomeScreen from '../../screens/WelcomeScreen'
const Stack = createNativeStackNavigator()
const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={
            {
                headerShown: false,

            }

        }>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Detail' component={DetailScreen} />
            <Stack.Screen name='Watched' component={WatchedScreen} />
        
        </Stack.Navigator>
    )
}

export default HomeStack

const styles = StyleSheet.create({})