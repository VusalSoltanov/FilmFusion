import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from "../reducers/themeSlice";
import { AppDispatch, RootState } from '../store/store';
import SvgMoon from '../assets/Moon';
import SvgSun from '../assets/svg/Sun';
const SettingsScreen = () => {
    const dark = useSelector((state: RootState) => state.themeSlice.dark)
    const dispatch = useDispatch<AppDispatch>()
    const handleTheme = () => {
        dispatch(changeTheme())
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: dark ? '#fff' : '#1c1c1c'
        }}>
            <Text style={{
                fontSize: 40,
                color: dark ? '#1c1c1c' : '#fff'
                , marginBottom: 20
            }}>
                Select Theme
            </Text>
            <View style={{ flexDirection: 'row' }}>
                <SvgMoon /><Switch value={dark} onChange={handleTheme} /><SvgSun />
            </View>
        </SafeAreaView>
    )
}
export default SettingsScreen

const styles = StyleSheet.create({})