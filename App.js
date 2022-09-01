import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { AsyncStorage, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet } from 'react-native';
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
        {hadOpenApp ?
          <AppNavigator setHadOpenApp={setHadOpenApp} />
          :
          <IntroScreen setHadOpenApp={setHadOpenApp} />
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
