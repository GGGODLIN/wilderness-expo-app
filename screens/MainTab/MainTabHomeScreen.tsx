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
import TopTabs from '../../components/TopTab/TopTabs';
import Categories from '../../components/home/Categories';
import ResumeCourses, { Course } from '../../components/home/ResumeCourses';
import TrendingCourses from '../../components/home/TrendingCourses';
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
    chapter: '高雄高爾夫球場',
    name: '下午 2~5點，續攤熱炒',
    imageUri: require('../../assets/home/emc.png'),
  },
  {
    id: 2,
    chapter: '某高爾夫球場',
    name: '友誼賽',
    imageUri: require('../../assets/home/big-data.png'),
  },
  {
    id: 3,
    chapter: '某高爾夫球場',
    name: '友誼賽',
    imageUri: require('../../assets/home/data-scientist.png'),
  },
  {
    id: 4,
    chapter: '某高爾夫球場',
    name: '友誼賽',
    imageUri: require('../../assets/home/emc.png'),
  },
];

const icons: Icon[] = [
  {
    name: 'shuffle',
    text: '切換',
  },
  {
    name: 'image',
    text: '電燈泡慢跑社',
  },
  {
    name: 'image',
    text: '抓鳥高爾夫社',
  },
  {
    name: 'image',
    text: '一二三四五六',
  },
  {
    name: 'image',
    text: '社團名稱',
  },
  {
    name: 'image',
    text: '社團名稱',
  },
  {
    name: 'image',
    text: '社團名稱',
  },
  {
    name: 'image',
    text: '社團名稱',
  },
];
const footerIcons: Icon[] = [
  { name: 'home', text: 'Home' },
  { name: 'menu-book', text: 'Syllabus' },
  { name: 'speed', text: 'Test' },
  { name: 'subscriptions', text: 'Subscribe' },
];
function MobileFooter() {
  return (
    <Hidden from="md">
      <HStack
        justifyContent="space-between"
        safeAreaBottom
        h="20"
        width="100%"
        position="absolute"
        left="0"
        right="0"
        bottom="0"
        overflow="hidden"
        alignSelf="center"
        borderTopLeftRadius="20"
        borderTopRightRadius="20"
        _light={{ backgroundColor: 'coolGray.50' }}
        _dark={{ backgroundColor: 'coolGray.800' }}>
        {footerIcons.map((item, index) => {
          return (
            <Button
              variant="ghost"
              colorScheme="coolGray"
              _stack={{
                flexDirection: 'column',
              }}
              startIcon={
                <Icon
                  as={MaterialIcons}
                  name={item.name}
                  size="5"
                  _light={{
                    color: index === 0 ? 'primary.900' : 'coolGray.400',
                  }}
                  _dark={{
                    color: index === 0 ? 'primary.500' : 'coolGray.400',
                  }}
                />
              }
              _text={{
                _light: {
                  color: index === 0 ? 'primary.900' : 'coolGray.400',
                },
                _dark: {
                  color: index === 0 ? 'primary.500' : 'coolGray.400',
                },
              }}>
              {item.text}
            </Button>
          );
        })}
      </HStack>
    </Hidden>
  );
}
function Banner() {
  return (
    <VStack
      _light={{ bg: 'amber.300' }}
      _dark={{ bg: { base: 'coolGray.900', md: 'coolGray.800' } }}
      zIndex={2}
      borderRadius={{ md: 4 }}
      px={{ base: 4, md: 8 }}
      pt={{ base: 0, md: 4 }}
      pb={{ base: 4, md: 0 }}
      mb={{ md: 4 }}>
      <Hidden till="md">
        <Pressable>
          <Icon size="6" pt="0.5" as={AntDesign} name="arrowleft" color="coolGray.50" />
        </Pressable>
      </Hidden>

      <HStack alignItems="center" justifyContent="space-between">
        <VStack space="1" w={{ base: '55%', md: '50%' }}>
          <Text
            mt={{ base: 4, md: 10 }}
            fontSize={{ base: 'lg', md: '3xl' }}
            color="amber.900"
            fontWeight="bold">
            歡迎回來, Joe
          </Text>
        </VStack>
        {/*
        <Image
          mb={{ base: '-21', md: '0' }}
          w={{ base: '114', md: '225' }}
          h={{ base: '140', md: '184' }}
          resizeMode="contain"
          alt="nointernet"
          source={require('../../assets/home/icongirl.png')}
        />
        */}
      </HStack>
      {/*
      <Hidden from="md">
        <Input
          mb={-10}
          px={0}
          py={3}
          placeholder="Search"
          _light={{
            bg: 'white',
            borderColor: 'coolGray.300',
          }}
          _dark={{
            bg: 'coolGray.700',
            borderColor: 'coolGray.500',
          }}
          InputLeftElement={
            <Icon
              as={MaterialIcons}
              name="search"
              _light={{ color: 'coolGray.400' }}
              _dark={{ color: 'coolGray.400' }}
              size="6"
              ml={3}
              mr={2}
            />
          }
        />
      </Hidden>
      */}
    </VStack>
  );
}

export default function HomeScreen({ route, navigation }: NavigationProps): JSX.Element {
  return (
    <DashboardLayout
      title="玩野覓境"
      displayMenuButton
      displayScreenTitle={false}
      displayAlternateMobileHeader
      rightPanelMobileHeader>
      <Banner />
      <Categories icons={icons} />
      <ResumeCourses courses={resumedCourses} />
      <TopTabs>
        <Tab label="活動" selected />
        <Tab label="動態" />
      </TopTabs>
      <ScrollView>
        {[...Array(10)].map((_, i) => (
          <Pressable
            key={'eventList' + i + 1}
            onPress={() => navigation.navigate(MAIN_STACK_EVENT_DETAILS)}>
            <HStack space={5} margin={5}>
              <Circle rounded="full" backgroundColor="gray.200" size="md">
                {10 + i * 2}
              </Circle>
              <Flex alignItems="center">
                <Text>大雄高爾夫早場</Text>
                <Text>2022-09-10 09:00</Text>
              </Flex>
              <Center>桃園球場</Center>
            </HStack>
          </Pressable>
        ))}
      </ScrollView>
    </DashboardLayout>
  );
}
