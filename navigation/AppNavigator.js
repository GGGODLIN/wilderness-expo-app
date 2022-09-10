import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import colors from '../constants/Colors';
import DetailScreen from '../screens/DetailScreen';
import HomeScreen from '../screens/HomeScreen';
import LocationScreen from '../screens/LocationScreen';
import ComingScreen from '../screens/ComingScreen';
import MapScreen from '../screens/MapScreen';
import SettingScreen from '../screens/SettingScreen';
import UserNameEditScreen from '../screens/UserNameEditScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Icon } from "@rneui/themed";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AppNavigator(props) {
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#93523c',
            tabBarInactiveTintColor: '#9fa88d',
            initialRouteName: '玩野覓境',
          }}
        >
          <Tab.Screen name="探索" component={LocationScreen} 
            options={{
              tabBarLabel: '探索',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="map-marker-radius-outline" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen name="社群" component={ComingScreen}
            options={{
              tabBarLabel: '社群',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="message-reply-text-outline" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen name="玩野覓境" component={HomeScreen} 
            options={{
              tabBarLabel: '首頁',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home-outline" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen name="私藏" component={ComingScreen} 
            options={{
              tabBarLabel: '私藏',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="heart-outline" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen name="設定"
            children={()=> (<SettingScreen setHadOpenApp={props.setHadOpenApp} /> )}
            options={{
              tabBarLabel: '設定',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account" color={color} size={size} />
              ),
              tabBarBadge: 3,
              headerRight: ({ color, size }) => (
                <TouchableOpacity>
                  <MaterialCommunityIcons name="bell-outline" color={color} size={24} style={{ marginRight: 15 }}  />
                </TouchableOpacity>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
/*
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={({ navigation, route }) => ({
            headerTintColor: colors?.mainActionColor,
            headerTitleStyle: { color: 'black' }
          })}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation, route }) => ({
              title: 'Echo Square',
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Setting')}
                >
                  <Ionicons name="settings-sharp" size={24} color={colors?.mainActionColor} style={{ padding: 12 }} />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="Setting"
            component={SettingScreen}
            options={({ navigation, route }) => ({
              title: '設定',
              headerTitleAlign: 'center'
            })}
            initialParams={{ setHadOpenApp: props?.setHadOpenApp }}
          />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={({ navigation, route }) => ({
              title: '關於 Echo Square',
              headerTitleAlign: 'center'
            })}
          />
          <Stack.Screen
            name="UserNameEditScreen"
            component={UserNameEditScreen}
            options={({ navigation, route }) => ({
              title: '修改名稱',
              headerTitleAlign: 'center'
            })}
          />
          <Stack.Screen
            name="MapScreen"
            component={MapScreen}
            options={({ navigation, route }) => ({
              title: '範圍顯示',
              headerTitleAlign: 'center'
            })}
          />
        </Stack.Navigator>
        */

export default AppNavigator;