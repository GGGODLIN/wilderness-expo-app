import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import {
  MAIN_TAB_GROUPS,
  MAIN_TAB_EVENTS,
  MAIN_TAB_HOME,
  MAIN_TAB_MESSAGES,
  MAIN_TAB_PROFILE,
} from '../../NavigationNames';
import { NavigationProps } from '../../Props';
import MainTabClubsScreen from '../MainTab/MainTabClubsScreen';
import MainTabEventsScreen from '../MainTab/MainTabEventsScreen';
import MainTabHomeScreen from '../MainTab/MainTabHomeScreen';
import MainTabMessageScreen from '../MainTab/MainTabMessageScreen';
import MainTabProfileStackScreen from '../MainTab/MainTabProfileStackScreen';

const Tab = createBottomTabNavigator();

export default function MainStackTabsScreen({ navigation }: NavigationProps): JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any; // FIXME 避免警告只好放 any :(

          switch (true) {
            case route.name === MAIN_TAB_GROUPS:
            default:
              iconName = focused ? 'people' : 'people-outline';
              break;
            case route.name === MAIN_TAB_EVENTS:
              iconName = focused ? 'flag' : 'flag-outline';
              break;
            case route.name === MAIN_TAB_HOME:
              iconName = focused ? 'home' : 'home-outline';
              break;
            case route.name === MAIN_TAB_MESSAGES:
              iconName = focused ? 'chatbox' : 'chatbox-outline';
              break;
            case route.name === MAIN_TAB_PROFILE:
              iconName = focused ? 'person' : 'person-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#414BB2',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen
        name={MAIN_TAB_GROUPS}
        component={MainTabClubsScreen}
        options={{ tabBarLabel: '社團' }}
      />
      <Tab.Screen
        name={MAIN_TAB_EVENTS}
        component={MainTabEventsScreen}
        options={{ tabBarLabel: '活動' }}
      />
      <Tab.Screen
        name={MAIN_TAB_HOME}
        component={MainTabHomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: '首頁',
        }}
      />
      <Tab.Screen
        name={MAIN_TAB_MESSAGES}
        component={MainTabMessageScreen}
        options={{ tabBarBadge: '99+', tabBarLabel: '訊息' }}
      />
      <Tab.Screen
        name={MAIN_TAB_PROFILE}
        component={MainTabProfileStackScreen}
        options={{ tabBarLabel: '個人' }}
      />
    </Tab.Navigator>
  );
}
