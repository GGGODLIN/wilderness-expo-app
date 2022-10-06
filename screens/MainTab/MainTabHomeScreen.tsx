import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import {
  HStack,
  Icon,
  Text,
  VStack,
  Button,
  ScrollView,
  Hidden,
  Divider,
  Input,
  Image,
  Pressable,
  Flex,
  Circle,
  Center,
  Box,
} from 'native-base';
import React from 'react';

import { MAIN_STACK_EVENT_DETAILS } from '../../NavigationNames';
import { NavigationProps } from '../../Props';
import Tab from '../../components/TopTab/Tab';
import Categories from '../../components/home/Categories';
import PostsList from '../../components/home/PostsList';
import DashboardLayout from '../../layouts/DashboardLayout';
import GuestLayout from '../../layouts/GuestLayout';

type Icon = {
  name: string;
  text: string;
};

const trendingCourses: Course[] = [
  {
    id: 1,
    name: 'Artificial Intelligence',
    imageUri: require('../../assets/theme/trending1.png'),
  },
  {
    id: 2,
    name: 'Machine Learning',
    imageUri: require('../../assets/theme/trending2.png'),
  },
  {
    id: 3,
    name: 'AWS SysOps Associate',
    imageUri: require('../../assets/theme/trending3.png'),
  },

  {
    id: 4,
    name: 'Angular Training Course',
    imageUri: require('../../assets/theme/chair.jpeg'),
  },
  {
    id: 5,
    name: 'Artificial Intelligence',
    imageUri: require('../../assets/theme/trending1.png'),
  },
];
const resumedCourses: Course[] = [
  {
    id: 1,
    chapter: 'test',
    name: 'test',
    imageUri: require('../../assets/images/views/view_3.jpg'),
  },
  {
    id: 2,
    chapter: 'test',
    name: 'test',
    imageUri: require('../../assets/images/views/view_3.jpg'),
  },
  {
    id: 3,
    chapter: 'test',
    name: 'test',
    imageUri: require('../../assets/images/views/view_3.jpg'),
  },
  {
    id: 4,
    chapter: 'test',
    name: 'test',
    imageUri: require('../../assets/images/views/view_3.jpg'),
  },
];

const icons: Icon[] = [
  {
    name: 'caravan',
    text: '車泊熱點',
  },
  {
    name: 'snowboarding',
    text: 'SUP 秘境',
  },
  {
    name: 'campground',
    text: '熱門營地',
  },
  {
    name: 'grin-tongue-squint',
    text: '親子營區',
  },
];
const icons2: Icon[] = [
  {
    name: 'comments',
    text: '熱門討論',
  },
  {
    name: 'drumstick-bite',
    text: '露營美食',
  },
  {
    name: 'mountain',
    text: '好野入門',
  },
  {
    name: 'info',
    text: '常見問題',
  },
];

export default function HomeScreen({ route, navigation }: NavigationProps): JSX.Element {
  return (
    <DashboardLayout
      title="玩野覓境"
      displayMenuButton
      displayScreenTitle={false}
      displayAlternateMobileHeader
      rightPanelMobileHeader>
      <Box>
        <VStack _light={{ bg: 'white' }} _dark={{ bg: 'coolGray.800' }} space="0">
          <Categories icons={icons} />
        </VStack>
        <VStack _light={{ bg: 'white' }} _dark={{ bg: 'coolGray.800' }} space="0">
          <Categories icons={icons2} />
        </VStack>
      </Box>
      <ScrollView>
        {[...Array(10)].map((_, i) => (
          <PostsList courses={resumedCourses} />
        ))}
      </ScrollView>
    </DashboardLayout>
  );
}
