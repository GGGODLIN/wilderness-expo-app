import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleLogin } from './helpers/loginActions';
import AppNavigator from './navigation/AppNavigator';
import IntroScreen from './screens/IntroScreen';


export default function App() {
  const [hadOpenApp, setHadOpenApp] = useState(false);

  useEffect(() => {
    checkHadOpenApp()

  }, []);

  useEffect(() => {
    handleLogin()
  }, []);



  const checkHadOpenApp = async () => {
    let hadOpenApp = await AsyncStorage.getItem('hadOpenApp')
    if (!!hadOpenApp) {
      setHadOpenApp(true)
    } else {
      setHadOpenApp(false)
      await AsyncStorage.setItem('hadOpenApp', JSON.stringify(true))
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "'height'"}
        style={styles.container}>
        <StatusBar
          translucent={true}
          hidden={false}
          barStyle="dark-content"
        />
        {hadOpenApp ? <AppNavigator setHadOpenApp={setHadOpenApp} /> : <IntroScreen setHadOpenApp={setHadOpenApp} />
        }
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
