import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';

import {
  MAIN_STACK_LOCATION_DRAWER_POST_DETAILS,
  MAIN_STACK_LOCATION_DRAWER_POST_EDIT,
  MAIN_STACK_LOCATION_DRAWER_POST_REPORT,
} from '../../../NavigationNames';
import Colors from '../../../constants/Colors';
import LocationDetailsScreen from './LocationDetailsScreen';
import LocationEditScreen from './LocationEditScreen';
import LocationReportScreen from './LocationReportScreen';

const Drawer = createDrawerNavigator();

export default function LocationDrawer(): JSX.Element {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'right',
        headerShown: false,

        drawerActiveBackgroundColor: Colors.THEME_MAIN_BACKGROUND,
        drawerActiveTintColor: Colors.LOGO_COLOR_GREEN,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name={MAIN_STACK_LOCATION_DRAWER_POST_DETAILS}
        component={LocationDetailsScreen}
        options={{ title: '內容' }}
      />
      <Drawer.Screen
        name={MAIN_STACK_LOCATION_DRAWER_POST_EDIT}
        component={LocationEditScreen}
        options={{ title: '編輯' }}
      />
      <Drawer.Screen
        name={MAIN_STACK_LOCATION_DRAWER_POST_REPORT}
        component={LocationReportScreen}
        options={{ title: '檢舉' }}
      />
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="分享" onPress={() => {}} />
    </DrawerContentScrollView>
  );
}
