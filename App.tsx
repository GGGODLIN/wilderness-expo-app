import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import * as React from 'react';

import {
  MAIN_STACK_CLUB_DETAILS,
  MAIN_STACK_EVENT_DETAILS,
  MAIN_STACK_LOGIN,
  MAIN_STACK_MESSAGES,
  MAIN_STACK_POST,
  MAIN_STACK_PROFILE,
  MAIN_STACK_REGISTER,
  MAIN_STACK_RESET_PASSWORD,
  MAIN_STACK_TABS,
  PROFILE_STACK_NOTIFICATIONS,
} from './NavigationNames';
import MainStackClubDetailsScreen from './screens/MainStack/MainStackClubDetailsScreen';
import MainStackEventDetailsScreen from './screens/MainStack/MainStackEventDetailsScreen';
import MainStackLoginScreen from './screens/MainStack/MainStackLoginScreen';
import MainStackMessageScreen from './screens/MainStack/MainStackMessageScreen';
import MainStackPostScreen from './screens/MainStack/MainStackPostScreen';
import MainStackProfileScreen from './screens/MainStack/MainStackProfileScreen';
import MainStackRegisterScreen from './screens/MainStack/MainStackRegisterScreen';
import MainStackResetPasswordScreen from './screens/MainStack/MainStackResetPasswordScreen';
import MainStackTabsScreen from './screens/MainStack/MainStackTabsScreen';
import ProfileStackNotifications from './screens/Profile/ProfileStackNotifications';

const Tab = createBottomTabNavigator();
const MainStack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
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
        </MainStack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
