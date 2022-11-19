import { AntDesign } from '@expo/vector-icons';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Accelerometer } from 'expo-sensors';
import { Icon, AlertDialog, Center, NativeBaseProvider, VStack, Text, Spinner } from 'native-base';
import * as React from 'react';
import { enableLatestRenderer } from 'react-native-maps';

import {
  MAIN_STACK_CREATE_LOCATION,
  MAIN_STACK_CREATE_POST,
  MAIN_STACK_CREATE_POST_WITH_LOCATION,
  MAIN_STACK_EVENT_DETAILS,
  MAIN_STACK_LOCATION_DRAWER,
  MAIN_STACK_LOGIN,
  MAIN_STACK_MESSAGES,
  MAIN_STACK_POST_DRAWER,
  MAIN_STACK_PROFILE,
  MAIN_STACK_REGISTER,
  MAIN_STACK_RESET_PASSWORD,
  MAIN_STACK_TABS,
  PROFILE_STACK_NOTIFICATIONS,
} from './NavigationNames';
import Colors from './constants/Colors';
import CreateLocationScreen from './screens/MainStack/CreateLocationScreen';
import CreatePostScreen from './screens/MainStack/CreatePostScreen';
import CreatePostWithLocationScreen from './screens/MainStack/CreatePostWithLocationScreen';
import EventDetailsScreen from './screens/MainStack/EventDetailsScreen';
import LocationDrawer from './screens/MainStack/LocationDrawer/LocationDrawer';
import LoginScreen from './screens/MainStack/LoginScreen';
import MessageScreen from './screens/MainStack/MessageScreen';
import PostDrawer from './screens/MainStack/PostDrawer/PostDrawer';
import ProfileScreen from './screens/MainStack/ProfileScreen';
import RegisterScreen from './screens/MainStack/RegisterScreen';
import ResetPasswordScreen from './screens/MainStack/ResetPasswordScreen';
import TabsScreen from './screens/MainStack/TabsScreen';
import ProfileStackNotifications from './screens/ProfileStack/ProfileStackNotifications';

enableLatestRenderer();

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
  const [isOpen, setIsOpen] = React.useState(false);
  const cancelRef = React.useRef(null);

  const onClose = () => setIsOpen(false);
  const randomLocation = () => {
    if (navigationRef.isReady()) {
      navigationRef.navigate(MAIN_STACK_LOCATION_DRAWER, {});
      setIsOpen(false);
    } else {
      setTimeout(randomLocation, 1500);
    }
  };

  configureShake(() => {
    setIsOpen(true);
    setTimeout(randomLocation, 1500);
  });
  return (
    <NativeBaseProvider>
      <NavigationContainer ref={navigationRef}>
        <MainStack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <MainStack.Screen component={TabsScreen} name={MAIN_STACK_TABS} />
          <MainStack.Screen component={LoginScreen} name={MAIN_STACK_LOGIN} />
          <MainStack.Screen component={RegisterScreen} name={MAIN_STACK_REGISTER} />
          <MainStack.Screen component={ResetPasswordScreen} name={MAIN_STACK_RESET_PASSWORD} />
          <MainStack.Screen component={EventDetailsScreen} name={MAIN_STACK_EVENT_DETAILS} />
          <MainStack.Screen component={MessageScreen} name={MAIN_STACK_MESSAGES} />
          <MainStack.Screen component={PostDrawer} name={MAIN_STACK_POST_DRAWER} />
          <MainStack.Screen component={ProfileScreen} name={MAIN_STACK_PROFILE} />
          <MainStack.Screen
            component={ProfileStackNotifications}
            name={PROFILE_STACK_NOTIFICATIONS}
          />
          <MainStack.Screen component={LocationDrawer} name={MAIN_STACK_LOCATION_DRAWER} />
          <MainStack.Screen component={CreatePostScreen} name={MAIN_STACK_CREATE_POST} />
          <MainStack.Screen
            component={CreatePostWithLocationScreen}
            name={MAIN_STACK_CREATE_POST_WITH_LOCATION}
          />
          <MainStack.Screen component={CreateLocationScreen} name={MAIN_STACK_CREATE_LOCATION} />
        </MainStack.Navigator>
      </NavigationContainer>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}>
        <AlertDialog.Content>
          <AlertDialog.Header>
            <Center>
              <Icon color="black" as={AntDesign} name="shake" size="2xl" mb="2" />
              <Text fontSize="lg">搖晃隨機地點</Text>
            </Center>
          </AlertDialog.Header>
          <AlertDialog.Body>
            <VStack>
              <Center>
                <Spinner color={Colors.LOGO_COLOR_GREEN} my={6} size="lg" />
              </Center>
              <Center>
                <Text>正在搜尋附近的地點...</Text>
              </Center>
            </VStack>
          </AlertDialog.Body>
        </AlertDialog.Content>
      </AlertDialog>
    </NativeBaseProvider>
  );
}
