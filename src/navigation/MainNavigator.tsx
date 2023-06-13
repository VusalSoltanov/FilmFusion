import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer, Theme } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStack from './stack/HomeStack'
import SvgHomeIcon from '../assets/svg/HomeIcon'
import WatchedScreen from '../screens/WatchedScreen'
import SvgSaveIcon from '../assets/svg/SaveIcon'
import SettingsScreen from '../screens/SettingsScreen'
import SvgSetting from '../assets/svg/SettingIcon'
import HomeScreen from '../screens/HomeScreen'
import SvgSearchIcon from '../assets/svg/SearcIcon'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
const Tab = createBottomTabNavigator()
const MainNavigator = () => {
  const dark = useSelector<RootState, any>((state) => state.themeSlice)
  const theme: Theme = {
    dark: dark,
    colors: {
      background: dark ? '#1c1c1c' : '#fff',
      text: "blue",
      primary: "yellow",
      card: dark ? '#fff' : '#1c1c1c',
      border: 'green',
      notification: 'red'
    },
  }
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'dark' ? '#1c1c1c' : '#fff',
          borderTopColor:'dark' ? '#000' : '#fff'
        },
      }}>
        
        <Tab.Screen name='HomeScreen' component={HomeStack}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ focused }: any) => (
              <SvgHomeIcon stroke={focused ? '#E0783E' : '#494949'} />
            ),
          }} />
        <Tab.Screen name='Watched' component={WatchedScreen}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ focused }: any) => (
              <SvgSaveIcon
                stroke={focused ? '#E0783E' : '#494949'}
                fill="none"
              />
            ),
          }}
        />
        <Tab.Screen name='Setting' component={SettingsScreen}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ focused }: any) => (
              <SvgSetting
                stroke={focused ? '#E0783E' : '#494949'}
                fill="none"
              />
            ),
          }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  )
}
export default MainNavigator
const styles = StyleSheet.create({})