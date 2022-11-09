import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type NavigationProps = {
  route?: any;
  navigation: NativeStackNavigationProp<any, any>;
};

export type Nav = {
  navigate: (value: string) => void;
  goBack: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
};
