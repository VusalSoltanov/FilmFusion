import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import SvgMail from '../assets/svg/Mail'
import SvgPassword from '../assets/svg/Password'
import SvgGoogle from '../assets/svg/Google'

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Log In</Text>
      </View>
      <View style={styles.mailPasswordContainer}>
        <Text style={{ marginLeft: 20, color: "#fff" }}>email</Text>
        <View style={styles.mailPasswordText}>
          <SvgMail stroke={'#fff'} /><TextInput
            style={styles.textinput}
            placeholder='enter your email'
            placeholderTextColor="#fff"

          ></TextInput>
        </View >
        <Text style={{ marginLeft: 20, color: "#fff" }}>password</Text>
        <View style={styles.mailPasswordText}>
          <SvgPassword stroke={'#1c1c1c'} /><TextInput
            style={styles.textinput}
            placeholder='enter your password'
            placeholderTextColor="#fff"
          ></TextInput>
        </View >
        <View style={{ alignItems: "flex-end", marginRight: 16 }}>
          <TouchableOpacity>
            <Text style={{ color: "#62CDFF" }}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
        <View >
          <TouchableOpacity style={styles.loginButton}>
            <Text>Log  in</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "#fff", fontSize: 24 }}>- - - - - - - - - - or - - - - - - - - - -</Text>
        </View>
        <View style={{ alignItems: "center" }}><TouchableOpacity><SvgGoogle/></TouchableOpacity></View>
        <View style={{ flexDirection: 'row', justifyContent: "center", columnGap: 5 }}>
          <Text style={{ color: "#fff" }}>Don't have an account?</Text>
          <TouchableOpacity><Text style={{ color: "#62CDFF" }}>Sign up</Text></TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1c1c1c",
    flex: 1

  },

  headerContainer: {
    alignItems: "center",
    marginTop: 16

  },
  headerText: {
    fontSize: 30,
    fontWeight: "700",
    color: '#fff'

  },
  mailPasswordContainer: {
    marginHorizontal: 10,
    marginTop: 100

  }
  ,
  mailPasswordText: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    marginHorizontal: 16,
    borderRadius: 15,
    borderColor: "#fff"
  },
  textinput: {
    color: "#fff"

  },
  loginButton: {
    backgroundColor: "#62CDFF",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 15
  }

})