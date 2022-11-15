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
import MainTabCollectionScreen from './MainTab/CollectionScreen';
import MainTabCommunityScreen from './MainTab/CommunityScreen';
import MainTabExploreScreen from './MainTab/ExploreScreen';
import MainTabHomeScreen from './MainTab/HomeScreen';
import MainTabProfileStackScreen from './MainTab/ProfileStackScreen';

const Tab = createBottomTabNavigator();

export default function TabsScreen({ navigation }: NavigationProps): JSX.Element {
  return (
    <Tab.Navigator
      initialRouteName={MAIN_TAB_HOME}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any; // FIXME 避免警告只好放 any :(
          const iconSizeHome = 28;
          const iconSizeNormal = 22;

          switch (true) {
            case route.name === MAIN_TAB_COMMUNITY:
            default:
              iconName = focused ? 'people' : 'people-outline';
              size = iconSizeNormal;
              break;
            case route.name === MAIN_TAB_EXPLORE:
              iconName = focused ? 'map' : 'map-outline';
              size = iconSizeNormal;
              break;
            case route.name === MAIN_TAB_HOME:
              iconName = focused ? 'home' : 'home-outline';
              size = iconSizeHome;
              break;
            case route.name === MAIN_TAB_COLLECTION:
              iconName = focused ? 'heart' : 'heart-outline';
              size = iconSizeNormal;
              break;
            case route.name === MAIN_TAB_PROFILE:
              iconName = focused ? 'person' : 'person-outline';
              size = iconSizeNormal;
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.LOGO_COLOR_GREEN,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
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
        name={MAIN_TAB_HOME}
        component={MainTabHomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: '首頁',
        }}
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
