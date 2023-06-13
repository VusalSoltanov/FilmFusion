import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={require('../assets/Rectangle3.png')}
          style={{
            width: 130,
            height: 172,
            position: "absolute",
            left: 10,
            top: 10

          }}

        />
        <Image source={require('../assets/Rectangle7.png')}
          style={{
            width: 99,
            height: 128,
            position: "absolute",
            left: 150,
            top: 10
          }}
        />
        <Image source={require('../assets/Rectangle11.png')}
          style={{
            width: 130,
            height: 173,
            position: "absolute",
            left: 254,
            top: 10
          }}
        />
        <Image source={require('../assets/Rectangle4.png')}
          style={{
            width: 130,
            height: 183,
            position: "absolute",
            left: 10,
            top: 190
          }}
        />
        <Image source={require('../assets/Rectangle12.png')}
          style={{
            width: 99,
            height: 118,
            position: "absolute",
            left: 150,
            top: 150
          }}
        />
        <Image source={require('../assets/Rectangle14.png')}
          style={{
            width: 130,
            height: 173,
            position: "absolute",
            left: 254,
            top: 200
          }}
        />
        <Image source={require('../assets/Rectangle5.png')}
          style={{
            width: 130,
            height: 183,
            position: "absolute",
            left: 10,
            top: 385
          }}
        />
        <Image source={require('../assets/Rectangle6.png')}
          style={{
            width: 130,
            height: 190,
            position: "absolute",
            left: 10,
            top: 575
          }}
        />
        <Image source={require('../assets/Rectangle13.png')}
          style={{
            width: 99,
            height: 128,
            position: "absolute",
            left: 148,
            top: 270
          }}
        />
        <Image source={require('../assets/Rectangle17.png')}
          style={{
            width: 99,
            height: 128,
            position: "absolute",
            left: 148,
            top: 410
          }}
        />
        <Image source={require('../assets/Rectangle18.png')}
          style={{
            width: 100,
            height: 120,
            position: "absolute",
            left: 148,
            top: 545
          }}
        />
        <Image source={require('../assets/Rectangle19.png')}
          style={{
            width: 100,
            height: 95,
            position: "absolute",
            left: 148,
            top: 675
          }}
        />
        <Image source={require('../assets/Rectangle15.png')}
          style={{
            width: 130,
            height: 173,
            position: "absolute",
            left: 254,
            top: 390
          }}
        />
        <Image source={require('../assets/Rectangle16.png')}
          style={{
            width: 130,
            height: 193,
            position: "absolute",
            left: 254,
            top: 575
          }}
        />
      </View>
    </View>
  )
}
export default WelcomeScreen

const styles = StyleSheet.create({

  container: {
    flex: 1
    ,
    backgroundColor: "#1c1c1c"
  }

})