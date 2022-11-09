import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createNavigationContainerRef,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Accelerometer } from 'expo-sensors';
import { NativeBaseProvider } from 'native-base';
import * as React from 'react';
import { useRef } from 'react';

import {
  MAIN_STACK_CLUB_DETAILS,
  MAIN_STACK_CREATE_LOCATION,
  MAIN_STACK_CREATE_POST,
  MAIN_STACK_EVENT_DETAILS,
  MAIN_STACK_LOCATION_DETAILS,
  MAIN_STACK_LOGIN,
  MAIN_STACK_MESSAGES,
  MAIN_STACK_POST,
  MAIN_STACK_PROFILE,
  MAIN_STACK_REGISTER,
  MAIN_STACK_RESET_PASSWORD,
  MAIN_STACK_TABS,
  PROFILE_STACK_NOTIFICATIONS,
} from './NavigationNames';
import { Nav } from './Props';
import MainStackClubDetailsScreen from './screens/MainStack/ClubDetailsScreen';
import CreateLocationScreen from './screens/MainStack/CreateLocationScreen';
import CreatePostScreen from './screens/MainStack/CreatePostScreen';
import MainStackEventDetailsScreen from './screens/MainStack/EventDetailsScreen';
import LocationDetailsScreen from './screens/MainStack/LocationDetailsScreen';
import MainStackLoginScreen from './screens/MainStack/LoginScreen';
import MainStackMessageScreen from './screens/MainStack/MessageScreen';
import MainStackPostScreen from './screens/MainStack/PostScreen';
import MainStackProfileScreen from './screens/MainStack/ProfileScreen';
import MainStackRegisterScreen from './screens/MainStack/RegisterScreen';
import MainStackResetPasswordScreen from './screens/MainStack/ResetPasswordScreen';
import MainStackTabsScreen from './screens/MainStack/TabsScreen';
import ProfileStackNotifications from './screens/ProfileStack/ProfileStackNotifications';

const configureShake = (onShake: (acceleration: number) => void) => {
  // update value every 100ms.
  // Adjust this interval to detect
  // faster (20ms) or slower shakes (500ms)
  Accelerometer.setUpdateInterval(100);

  // at each update, we have acceleration registered on 3 axis
  // 1 = no device movement, only acceleration caused by gravity
  const onUpdate = ({ x, y, z }: { x: number; y: number; z: number }) => {
    // compute a total acceleration value, here with a square sum
    // you can eventually change the formula
    // if you want to prioritize an axis
    const acceleration = Math.sqrt(x * x + y * y + z * z);

    // Adjust sensibility, because it can depend of usage (& devices)
    const sensibility = 2;
    if (acceleration >= sensibility) {
      onShake(acceleration);
    }
  };

  Accelerometer.addListener(onUpdate);
};

const MainStack = createNativeStackNavigator();
const navigationRef = createNavigationContainerRef();

export default function App() {
  configureShake((acceleration) => {
    navigationRef.navigate(MAIN_STACK_LOCATION_DETAILS);
    console.log('Shake detected with acceleration ', acceleration);
  });
  return (
    <NativeBaseProvider>
      <NavigationContainer ref={navigationRef}>
        <MainStack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <MainStack.Screen component={MainStackTabsScreen} name={MAIN_STACK_TABS} />
          <MainStack.Screen component={MainStackLoginScreen} name={MAIN_STACK_LOGIN} />
          <MainStack.Screen component={MainStackRegisterScreen} name={MAIN_STACK_REGISTER} />
          <MainStack.Screen
            component={MainStackResetPasswordScreen}
            name={MAIN_STACK_RESET_PASSWORD}
          />
          <MainStack.Screen component={MainStackClubDetailsScreen} name={MAIN_STACK_CLUB_DETAILS} />
          <MainStack.Screen
            component={MainStackEventDetailsScreen}
            name={MAIN_STACK_EVENT_DETAILS}
          />
          <MainStack.Screen component={MainStackMessageScreen} name={MAIN_STACK_MESSAGES} />
          <MainStack.Screen component={MainStackPostScreen} name={MAIN_STACK_POST} />
          <MainStack.Screen component={MainStackProfileScreen} name={MAIN_STACK_PROFILE} />
          <MainStack.Screen
            component={ProfileStackNotifications}
            name={PROFILE_STACK_NOTIFICATIONS}
          />
          <MainStack.Screen component={LocationDetailsScreen} name={MAIN_STACK_LOCATION_DETAILS} />
          <MainStack.Screen component={CreatePostScreen} name={MAIN_STACK_CREATE_POST} />
          <MainStack.Screen component={CreateLocationScreen} name={MAIN_STACK_CREATE_LOCATION} />
        </MainStack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
