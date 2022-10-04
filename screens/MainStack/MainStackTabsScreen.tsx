import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import {
  MAIN_TAB_COMMUNITY,
  MAIN_TAB_EXPLORE,
  MAIN_TAB_HOME,
  MAIN_TAB_COLLECTION,
  MAIN_TAB_PROFILE,
} from '../../NavigationNames';
import { NavigationProps } from '../../Props';
import Colors from '../../constants/Colors';
import MainTabCollectionScreen from '../MainTab/MainTabCollectionScreen';
import MainTabCommunityScreen from '../MainTab/MainTabCommunityScreen';
import MainTabExploreScreen from '../MainTab/MainTabExploreScreen';
import MainTabHomeScreen from '../MainTab/MainTabHomeScreen';
import MainTabProfileStackScreen from '../MainTab/MainTabProfileStackScreen';

const Tab = createBottomTabNavigator();

export default function MainStackTabsScreen({ navigation }: NavigationProps): JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any; // FIXME 避免警告只好放 any :(

          switch (true) {
            case route.name === MAIN_TAB_COMMUNITY:
            default:
              iconName = focused ? 'people' : 'people-outline';
              break;
            case route.name === MAIN_TAB_EXPLORE:
              iconName = focused ? 'map' : 'map-outline';
              break;
            case route.name === MAIN_TAB_HOME:
              iconName = focused ? 'home' : 'home-outline';
              break;
            case route.name === MAIN_TAB_COLLECTION:
              iconName = focused ? 'heart' : 'heart-outline';
              break;
            case route.name === MAIN_TAB_PROFILE:
              iconName = focused ? 'person' : 'person-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.LOGO_COLOR_GREEN,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen
        name={MAIN_TAB_HOME}
        component={MainTabHomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: '首頁',
        }}
      />
      <Tab.Screen
        name={MAIN_TAB_COMMUNITY}
        component={MainTabCommunityScreen}
        options={{ tabBarLabel: '社群' }}
      />
      <Tab.Screen
        name={MAIN_TAB_EXPLORE}
        component={MainTabExploreScreen}
        options={{ tabBarLabel: '探索' }}
      />
      <Tab.Screen
        name={MAIN_TAB_COLLECTION}
        component={MainTabCollectionScreen}
        options={{ tabBarLabel: '私藏' }}
      />
      <Tab.Screen
        name={MAIN_TAB_PROFILE}
        component={MainTabProfileStackScreen}
        options={{ tabBarBadge: '99+', tabBarLabel: '個人' }}
      />
    </Tab.Navigator>
  );
}
