import { AntDesign, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
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
  IconButton,
} from 'native-base';
import React from 'react';

import { MAIN_STACK_EVENT_DETAILS } from '../../NavigationNames';
import { NavigationProps } from '../../Props';
import { Carousel } from '../../components/Carousel';
import Tab from '../../components/TopTab/Tab';
import Categories from '../../components/home/Categories';
import PostsList from '../../components/home/PostsList';
import Colors from '../../constants/Colors';
import DashboardLayout from '../../layouts/DashboardLayout';
import GuestLayout from '../../layouts/GuestLayout';

type Icon = {
  name: string;
  text: string;
};

const trendingCourses = [
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
const resumedCourses = [
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

const CarouselLayout = () => {
  return (
    <Box
      px={{ base: '0', md: 0 }}
      py={{ base: '0', md: 0 }}
      _light={{ bg: 'transparent' }}
      _dark={{ bg: 'transparent' }}
      height={{ base: 40, md: 20 }}>
      <Carousel
        images={[
          require('../../assets/images/views/view_9.jpg'),
          require('../../assets/images/views/view_10.jpg'),
          require('../../assets/images/views/view_15.jpg'),
          require('../../assets/images/views/view_11.jpg'),
          require('../../assets/images/views/view_12.jpg'),
          require('../../assets/images/views/view_13.jpg'),
          require('../../assets/images/views/view_14.jpg'),
        ]}
        height={{ base: 40, md: 20 }}
        activeIndicatorBgColor="coolGray.500"
        inactiveIndicatorBgColor="coolGray.300"
      />
    </Box>
  );
};

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
      <CarouselLayout />
      <Box pt={4}>
        <HStack space={6} justifyContent="center">
          {icons.map((item, idx) => {
            return (
              <VStack>
                <Center
                  _light={{ bg: Colors.LOGO_COLOR_WHITE_BACKGROUND }}
                  _dark={{ bg: 'coolGray.700' }}
                  rounded="full"
                  w={{ base: 16, md: 14 }}
                  h={{ base: 16, md: 14 }}>
                  <IconButton
                    variant="unstyled"
                    icon={
                      <Icon
                        as={FontAwesome5}
                        name={item.name}
                        _light={{ color: Colors.LOGO_COLOR_GREEN }}
                        _dark={{ color: 'coolGray.50' }}
                        size={8}
                        textAlign="center"
                      />
                    }
                  />
                </Center>
                <Text
                  pt={2}
                  fontSize={{ base: 'sm', md: 'sm' }}
                  _light={{ color: { base: 'coolGray.800', md: 'coolGray.500' } }}
                  _dark={{ color: { base: 'coolGray.50', md: 'coolGray.400' } }}
                  textAlign="center">
                  {item.text}
                </Text>
              </VStack>
            );
          })}
        </HStack>
        <HStack space={6} justifyContent="center" pt={3} pb={4}>
          {icons2.map((item, idx) => {
            return (
              <VStack>
                <Center
                  _light={{ bg: Colors.LOGO_COLOR_WHITE_BACKGROUND }}
                  _dark={{ bg: 'coolGray.700' }}
                  rounded="full"
                  w={{ base: 16, md: 14 }}
                  h={{ base: 16, md: 14 }}>
                  <IconButton
                    variant="unstyled"
                    icon={
                      <Icon
                        as={FontAwesome5}
                        name={item.name}
                        _light={{ color: Colors.LOGO_COLOR_GREEN }}
                        _dark={{ color: 'coolGray.50' }}
                        size={8}
                        textAlign="center"
                      />
                    }
                  />
                </Center>
                <Text
                  pt={2}
                  fontSize={{ base: 'sm', md: 'sm' }}
                  _light={{ color: { base: 'coolGray.800', md: 'coolGray.500' } }}
                  _dark={{ color: { base: 'coolGray.50', md: 'coolGray.400' } }}
                  textAlign="center">
                  {item.text}
                </Text>
              </VStack>
            );
          })}
        </HStack>
        {/*
        <VStack _light={{ bg: 'white' }} _dark={{ bg: 'coolGray.800' }} space="0">
          <Categories icons={icons} />
        </VStack>
        <VStack _light={{ bg: 'white' }} _dark={{ bg: 'coolGray.800' }} space="0">
          <Categories icons={icons2} />
        </VStack>
        */}
      </Box>
      <ScrollView py={4}>
        {[...Array(10)].map((_, i) => (
          <PostsList key={i} courses={resumedCourses} />
        ))}
      </ScrollView>
    </DashboardLayout>
  );
}
