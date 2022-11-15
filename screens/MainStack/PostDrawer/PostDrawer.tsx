import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';

import {
  MAIN_STACK_POST_DRAWER_POST_DETAILS,
  MAIN_STACK_POST_DRAWER_POST_EDIT,
  MAIN_STACK_POST_DRAWER_POST_REPORT,
} from '../../../NavigationNames';
import Colors from '../../../constants/Colors';
import PostEditScreen from './PostEditScreen';
import PostReportScreen from './PostReportScreen';
import PostDetailsScreen from './PostScreen';

const Drawer = createDrawerNavigator();

export default function PostDrawer(): JSX.Element {
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
        name={MAIN_STACK_POST_DRAWER_POST_DETAILS}
        component={PostDetailsScreen}
        options={{ title: '內容' }}
      />
      <Drawer.Screen
        name={MAIN_STACK_POST_DRAWER_POST_EDIT}
        component={PostEditScreen}
        options={{ title: '編輯' }}
      />
      <Drawer.Screen
        name={MAIN_STACK_POST_DRAWER_POST_REPORT}
        component={PostReportScreen}
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
      <DrawerItem label="刪除" onPress={() => {}} />
    </DrawerContentScrollView>
  );
}
