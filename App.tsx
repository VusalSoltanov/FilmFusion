import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LoginScreen from './src/screens/LoginScreen'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigator from './src/navigation/MainNavigator'
import { Provider } from 'react-redux'
import store from './src/store/store'
import WelcomeScreen from './src/screens/WelcomeScreen'
const App = () => {

  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {
        showSplash ? (<>
          <WelcomeScreen navigation={undefined}
           />
        </>
        ) :
          <Provider store={store}>
            <MainNavigator />
          </Provider>
      }
    </>

  )
}

export default App

const styles = StyleSheet.create({

})