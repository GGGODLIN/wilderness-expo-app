import { MaterialIcons } from '@expo/vector-icons';
import {
  Button,
  HStack,
  Text,
  Icon,
  Input,
  Pressable,
  Box,
  Center,
  ScrollView,
  VStack,
  Stack,
  Select,
  Avatar,
  Image,
  useColorModeValue,
  useBreakpointValue,
  FlatList,
} from 'native-base';
import React, { useState } from 'react';
import { Platform, ImageSourcePropType, useWindowDimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { MAIN_STACK_EVENT_DETAILS, MAIN_STACK_POST } from '../NavigationNames';
import { NavigationProps } from '../Props';
import { Carousel } from '../components/Carousel';
import NativeMap from '../components/NativeMap';
import Colors from '../constants/Colors';
import DashboardLayout from '../layouts/DashboardLayout';

type List = {
  imageUrl: string;
  name: string;
  reaction: string;
  time: string;
  secondImageUrl: string;
};

const tabList1: List[] = [
  {
    imageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    name: 'John',
    reaction: '邀請你成為他的朋友',
    time: '剛剛',
    secondImageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    name: 'Priya',
    reaction: '邀請你成為他的朋友',
    time: '23 分鐘前',
    secondImageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    name: 'Doe.J',
    reaction: '邀請你成為他的朋友',
    time: '2 小時前',
    secondImageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    name: 'Doe.H',
    reaction: '邀請你成為他的朋友',
    time: '2 天前',
    secondImageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    name: 'John D',
    reaction: '邀請你成為他的朋友',
    time: '1 個月前',
    secondImageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    name: 'John Doe',
    reaction: '邀請你成為他的朋友',
    time: '1 個月前',
    secondImageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    name: 'lege Doe',
    reaction: '邀請你成為他的朋友',
    time: '2 年前',
    secondImageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
];

const tabList2 = [
  {
    imageUrl: 'http://cdn.shopify.com/s/files/1/0588/1230/1506/articles/sports.jpg?v=1627890142',
    name: '春季球場優惠放送，點選查看合作球場',
    date: '2023-02-02',
    time: '剛剛',
  },
  {
    imageUrl: 'http://cdn.shopify.com/s/files/1/0588/1230/1506/articles/sports.jpg?v=1627890142',
    name: '春季球場優惠放送，點選查看合作球場',
    date: '2023-04-29',
    time: '剛剛',
  },
  {
    imageUrl: 'http://cdn.shopify.com/s/files/1/0588/1230/1506/articles/sports.jpg?v=1627890142',
    name: '春季球場優惠放送，點選查看合作球場',
    date: '2023-07-12',
    time: '剛剛',
  },
];

const member: List[] = [
  {
    imageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    name: 'John',
    reaction: '發了新的動態',
    time: '剛剛',
    secondImageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    name: 'Priya',
    reaction: '在你的動態上留言',
    time: '46 分鐘前',
    secondImageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    name: 'Doe.J',
    reaction: '發了新的動態',
    time: '4 小時前',
    secondImageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    name: 'Doe.H',
    reaction: '發了新的動態',
    time: '1 個月前',
    secondImageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    name: 'John D',
    reaction: '在你的動態上留言',
    time: '3 個月前',
    secondImageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    name: 'John Doe',
    reaction: '在你的動態上留言',
    time: '1 年前',
    secondImageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    name: 'lege Doe',
    reaction: '在你的動態上留言',
    time: '2 年前',
    secondImageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    name: 'Doe.H',
    reaction: '發了新的動態',
    time: '1 個月前',
    secondImageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    name: 'John D',
    reaction: '在你的動態上留言',
    time: '3 個月前',
    secondImageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    name: 'John Doe',
    reaction: '在你的動態上留言',
    time: '1 年前',
    secondImageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    name: 'lege Doe',
    reaction: '在你的動態上留言',
    time: '2 年前',
    secondImageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    name: 'Doe.H',
    reaction: '發了新的動態',
    time: '1 個月前',
    secondImageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    name: 'John D',
    reaction: '在你的動態上留言',
    time: '3 個月前',
    secondImageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    name: 'John Doe',
    reaction: '在你的動態上留言',
    time: '1 年前',
    secondImageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    name: 'lege Doe',
    reaction: '在你的動態上留言',
    time: '2 年前',
    secondImageUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
];

const ActionButton = () => {
  const [favorite, setFavorite] = useState(false);

  return (
    <HStack
      space="4"
      alignItems="center"
      px={4}
      p={2}
      style={{ backgroundColor: 'white' }}
      shadow={2}>
      <Button
        flex={1}
        size="lg"
        variant="solid"
        _light={{
          bg: 'black',
        }}
        _dark={{
          bg: 'coolGray.700',
        }}>
        追蹤
      </Button>
      <Button
        flex={1}
        size="lg"
        variant="solid"
        _light={{
          bg: 'black',
        }}
        _dark={{
          bg: 'coolGray.700',
        }}>
        報名
      </Button>
    </HStack>
  );
};

const CarouselLayout = () => {
  return (
    <Box
      px={{ base: '0', md: 0 }}
      py={{ base: '0', md: 0 }}
      _light={{ bg: 'transparent' }}
      _dark={{ bg: 'transparent' }}
      height={{ base: 300, md: 20 }}>
      <Carousel
        images={[
          require('../assets/images/views/view_3.jpg'),
          require('../assets/images/views/view_3.jpg'),
          require('../assets/images/views/view_3.jpg'),
          require('../assets/images/views/view_3.jpg'),
          require('../assets/images/views/view_3.jpg'),
        ]}
        height={{ base: 300, md: 20 }}
        activeIndicatorBgColor="coolGray.500"
        inactiveIndicatorBgColor="coolGray.300"
      />
    </Box>
  );
};

type PostProps = {
  avatorImageUri?: string;
  author?: string;
  clubsName?: string;
  eventName?: string;
  imageUri: ImageSourcePropType;
  description: string;
  like: number;
  liked: boolean;
};

const itemList: PostProps[] = [
  {
    avatorImageUri:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    author: '作者',
    clubsName: '這是一個名字很長長長長的社團',
    eventName: '馬拉松活動',
    imageUri: require('../assets/images/views/view_3.jpg'),
    description: '動態內容第一行\n二\n三\n四',
    like: 200,
    liked: false,
  },
  {
    avatorImageUri:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    author: '作者',
    clubsName: '',
    eventName: '點我連到活動頁',
    imageUri: require('../assets/images/views/view_3.jpg'),
    description: '這邊動態有按過讚',
    like: 639,
    liked: true,
  },
  {
    avatorImageUri:
      'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    author: '作者',
    clubsName: '點我連到社團頁',
    eventName: '',
    imageUri: require('../assets/images/views/view_3.jpg'),
    description: '動態內容',
    like: 399,
    liked: false,
  },
  {
    avatorImageUri:
      'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    author: '作者',
    clubsName: '',
    eventName: '',
    imageUri: require('../assets/images/views/view_3.jpg'),
    description: '動態內容',
    like: 849,
    liked: true,
  },
];

export default function LocationDetailsScreen({ navigation }: NavigationProps): JSX.Element {
  const [textInput, setTextInput] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('Home');

  function PostCard(props: PostProps) {
    const { width: windowWidth } = useWindowDimensions();
    const [favorite, setFavorite] = useState(props.liked);

    return (
      <Box width="100%" px="2" my="2" borderRadius="sm" m={{ base: '1.5', md: '2.5' }}>
        <Pressable>
          <HStack my="1" w="100%" justifyContent="space-between">
            <HStack>
              <Avatar height="6" width="6" source={{ uri: props.avatorImageUri }} />
              <VStack space="0" alignItems="center">
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  py={1}
                  mx={2}
                  _dark={{ color: 'coolGray.50' }}
                  _light={{ color: 'coolGray.700' }}>
                  {props.author}
                </Text>
              </VStack>
            </HStack>
            <HStack>
              <VStack space="0" alignItems="stretch" justifyContent="flex-end">
                {props.clubsName != null && (
                  <Pressable
                    onPress={() => {
                      console.log('hello');
                    }}>
                    <Text
                      fontSize="sm"
                      fontWeight="medium"
                      _dark={{ color: 'coolGray.50' }}
                      _light={{ color: 'coolGray.700' }}
                      textAlign="right">
                      {props.clubsName}
                    </Text>
                  </Pressable>
                )}
                {props.eventName != null && (
                  <Pressable
                    onPress={() => {
                      console.log('hello');
                    }}>
                    <Text
                      fontSize="sm"
                      fontWeight="medium"
                      _dark={{ color: 'coolGray.50' }}
                      _light={{ color: 'coolGray.700' }}
                      textAlign="right">
                      {props.eventName}
                    </Text>
                  </Pressable>
                )}
              </VStack>
            </HStack>
          </HStack>
          <Text
            onPress={() => navigation.navigate(MAIN_STACK_POST)}
            my="2"
            fontSize="xs"
            _light={{ color: 'coolGray.500' }}
            _dark={{ color: 'coolGray.400' }}>
            {props.description}
          </Text>
          <Pressable onPress={() => navigation.navigate(MAIN_STACK_POST)}>
            <Image w="100%" h="170" source={props.imageUri} alt={props.author} resizeMode="cover" />
          </Pressable>
          <HStack mt="1" w="100%" justifyContent="space-between">
            <Pressable onPress={() => setFavorite(!favorite)}>
              <HStack alignItems="center">
                <Icon
                  size="4"
                  _light={{ color: 'coolGray.500' }}
                  _dark={{ color: 'coolGray.500' }}
                  as={MaterialIcons}
                  name={favorite ? 'thumb-up' : 'thumb-up-off-alt'}
                />
                <Text
                  my="2"
                  ml="2"
                  fontSize="sm"
                  _light={{ color: 'coolGray.500' }}
                  _dark={{ color: 'coolGray.400' }}>
                  {props.like} 喜歡
                </Text>
              </HStack>
            </Pressable>
            <Pressable onPress={() => navigation.navigate(MAIN_STACK_POST)}>
              <HStack alignItems="center">
                <Icon
                  size="4"
                  _light={{ color: 'coolGray.500' }}
                  _dark={{ color: 'coolGray.500' }}
                  as={MaterialIcons}
                  name="comment"
                />
                <Text
                  my="2"
                  ml="2"
                  fontSize="sm"
                  _light={{ color: 'coolGray.500' }}
                  _dark={{ color: 'coolGray.400' }}>
                  留言
                </Text>
              </HStack>
            </Pressable>
            <Pressable>
              <HStack alignItems="center">
                <Icon
                  size="4"
                  _light={{ color: 'coolGray.500' }}
                  _dark={{ color: 'coolGray.500' }}
                  as={MaterialIcons}
                  name="share"
                />
                <Text
                  my="2"
                  ml="2"
                  fontSize="sm"
                  _light={{ color: 'coolGray.500' }}
                  _dark={{ color: 'coolGray.400' }}>
                  分享
                </Text>
              </HStack>
            </Pressable>
          </HStack>
        </Pressable>
      </Box>
    );
  }

  function MainPostsList() {
    const noColumn = useBreakpointValue({
      base: 2,
      sm: 3,
      md: 3,
      lg: 5,
      xl: 5,
    });
    const { height } = useWindowDimensions();
    return (
      <ScrollView>
        <Box
          px={{ base: 2.5, md: '22' }}
          py={{ base: '14', md: '22' }}
          rounded={{ md: 'sm' }}
          alignItems="center">
          {itemList.map((item, index) => (
            <PostCard key={index} {...item} />
          ))}
        </Box>
      </ScrollView>
    );
  }

  function Tab_1() {
    const textColor = useColorModeValue('coolGray.800', 'coolGray.50');
    return (
      <ScrollView>
        <CarouselLayout />
        <VStack space={4} mt={5} px={4}>
          <HStack>
            <VStack>
              <Text fontWeight="bold" fontSize="lg" color="coolGray.400">
                2023-12-12 (週日) 18:00
              </Text>
              <Text fontWeight="bold" fontSize="3xl" color="coolGray.700">
                [疾風羽球館] 菜鳥雙人 晚上八點到九點
              </Text>
            </VStack>
          </HStack>
          <HStack justifyContent="space-between">
            <VStack w="50%">
              <Text fontWeight="bold" color="coolGray.400">
                主辦
              </Text>
              <HStack space="2" alignItems="center">
                <Avatar
                  height="6"
                  width="6"
                  source={{
                    uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
                  }}
                />
                <VStack space="0" alignItems="flex-start">
                  <HStack alignItems="flex-start" justifyContent="flex-start">
                    <Text
                      textAlign="left"
                      fontSize="xs"
                      fontWeight="medium"
                      py={0}
                      _dark={{ color: 'coolGray.50' }}
                      _light={{ color: 'coolGray.700' }}>
                      主辦人
                    </Text>
                  </HStack>
                  <HStack>
                    <Text
                      fontSize="xs"
                      fontWeight="medium"
                      py={0}
                      _dark={{ color: 'coolGray.50' }}
                      _light={{ color: 'coolGray.700' }}>
                      社團名稱
                    </Text>
                  </HStack>
                </VStack>
              </HStack>
            </VStack>
            <VStack w="50%">
              <Text fontWeight="bold" color="coolGray.400">
                地點
              </Text>
              <Text color="coolGray.700">疾風羽球館{'\n'}台北市信義區逛大街100號</Text>
              <Text color="blue.700">前往導航</Text>
            </VStack>
          </HStack>
          <HStack justifyContent="space-between">
            <VStack w="50%">
              <Text fontWeight="bold" color="coolGray.400">
                活動時間
              </Text>
              <Text color="coolGray.700">2022-12-12{'\n'}18:00~20:00</Text>
              <Text color="blue.700">設定提醒</Text>
            </VStack>
            <VStack w="50%">
              <Text fontWeight="bold" color="coolGray.400">
                報名時間
              </Text>
              <Text color="coolGray.700">2022-11-12 12:00{'\n'}~ 2022-12-10 12:00</Text>
              <Text color="blue.700">設定提醒</Text>
            </VStack>
          </HStack>
          <HStack justifyContent="space-between">
            <VStack w="50%">
              <Text fontWeight="bold" color="coolGray.400">
                費用選項
              </Text>
              <Text color="coolGray.700">每人 500 元</Text>
            </VStack>
            <VStack w="50%">
              <Text fontWeight="bold" color="coolGray.400">
                支付方式
              </Text>
              <Text color="coolGray.700">現場</Text>
            </VStack>
          </HStack>
          <HStack justifyContent="space-between">
            <VStack w="50%">
              <Text fontWeight="bold" color="coolGray.400">
                報名限制
              </Text>
              <Text color="coolGray.700">限社團成員</Text>
              <Text color="coolGray.700">出席率 90%</Text>
            </VStack>
            <VStack w="50%">
              <Text fontWeight="bold" color="coolGray.400">
                攜伴限制
              </Text>
              <Text color="coolGray.700">可攜伴 1 位</Text>
            </VStack>
          </HStack>
          <HStack justifyContent="space-between">
            <VStack w="50%">
              <Text fontWeight="bold" color="coolGray.400">
                注意事項
              </Text>
              <Text color="coolGray.700">
                1. 注意事項內容{'\n'}
                2. 注意事項內容{'\n'}
                3. 注意事項內容{'\n'}
                4. 注意事項內容{'\n'}
                5. 注意事項內容
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </ScrollView>
    );
  }
  function Tab_2() {
    const textColor = useColorModeValue('coolGray.800', 'coolGray.50');
    return (
      <ScrollView py={2}>
        <Box
          flex={1}
          px={{ base: 2.5, md: '22' }}
          py={{ base: '14', md: '22' }}
          rounded={{ md: 'sm' }}
          alignItems="center">
          {itemList.map((item, index) => (
            <PostCard key={index} {...item} />
          ))}
        </Box>
      </ScrollView>
    );
  }
  function Tab_3() {
    const textColor = useColorModeValue('coolGray.800', 'coolGray.50');

    return (
      <ScrollView py={2}>
        <VStack mt={5} px={0} alignItems="center">
          <FlatList
            nestedScrollEnabled
            numColumns={4}
            data={member}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <VStack alignItems="center" key={index} space="1" w="90" h="100">
                  <Avatar source={{ uri: item.imageUrl }} height={10} width={10} />
                  <Text fontWeight="bold" color={textColor}>
                    {item.name}
                  </Text>
                </VStack>
              );
            }}
            keyExtractor={(item, index) => 'eventlist' + index}
          />
        </VStack>
      </ScrollView>
    );
  }
  function Tab_4() {
    const textColor = useColorModeValue('coolGray.800', 'coolGray.50');
    return (
      <ScrollView py={2}>
        <Text>轉跳至訊息頁</Text>
      </ScrollView>
    );
  }

  const tabs = [
    {
      id: 1,
      title: '資訊',
      component: <Tab_1 />,
    },
    {
      id: 2,
      title: '動態',
      component: <Tab_2 />,
    },
    {
      id: 3,
      title: '參加者',
      component: <Tab_3 />,
    },
    {
      id: 4,
      title: '訊息',
      component: <Tab_4 />,
    },
  ];

  function TabItem({
    tabName,
    currentTab,
    handleTabChange,
  }: {
    tabName: string;
    currentTab: string;
    handleTabChange: (tabTitle: string) => void;
  }) {
    return (
      <Pressable onPress={() => handleTabChange(tabName)}>
        <Text
          paddingX={5}
          paddingY={1}
          fontSize="lg"
          fontWeight="medium"
          letterSpacing="0.4"
          _light={{
            color: tabName === currentTab ? 'coolGray.700' : 'coolGray.400',
          }}
          _dark={{
            color: tabName === currentTab ? 'primary.500' : 'coolGray.400',
          }}>
          {tabName}
        </Text>
        {tabName === currentTab ? (
          <Box
            _light={{
              bg: Colors.LOGO_COLOR_BROWN,
            }}
            _dark={{
              bg: 'amber.900',
            }}
            h="0.5"
          />
        ) : (
          <Box
            _light={{
              bg: 'white',
            }}
            _dark={{
              bg: 'white',
            }}
            h="0.5"
          />
        )}
      </Pressable>
    );
  }
  function Tabs() {
    const [tabName, setTabName] = React.useState(tabs[0].title);
    const [tabChildren, setTabChildren] = useState<React.ReactNode>(tabs[0].component);
    return (
      <>
        <Center backgroundColor="white">
          <HStack my={0}>
            {tabs.map(({ id, title, component }) => (
              <TabItem
                key={id}
                tabName={title}
                currentTab={tabName}
                handleTabChange={(tab) => {
                  setTabName(tab);
                  setTabChildren(component);
                }}
              />
            ))}
          </HStack>
        </Center>
        <Box
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            minHeight: '100%',
          }}>
          {tabChildren}
        </Box>
      </>
    );
  }

  function CustomTitle() {
    return (
      <VStack space="0">
        <HStack space="2" alignItems="center">
          <Avatar
            height="6"
            width="6"
            source={{
              uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            }}
          />
          <VStack space="0" alignItems="flex-start">
            <HStack alignItems="flex-start" justifyContent="flex-start">
              <Text
                textAlign="left"
                fontSize="xs"
                fontWeight="medium"
                py={0}
                _dark={{ color: 'coolGray.50' }}
                _light={{ color: 'white' }}>
                作者名稱
              </Text>
            </HStack>
            <HStack>
              <Text
                fontSize="xs"
                fontWeight="medium"
                py={0}
                _dark={{ color: 'coolGray.50' }}
                _light={{ color: 'white' }}>
                社團名稱
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    );
  }

  return (
    <DashboardLayout title="活動資訊" showBackButton>
      <KeyboardAwareScrollView style={{ flex: 1 }} bounces={false}>
        <Stack flex={1} _light={{ bg: Colors.LOGO_COLOR_BROWN }} _dark={{ bg: 'coolGray.800' }}>
          <Box
            pt={5}
            px={{ md: 8, xl: 35 }}
            py={{ md: 8 }}
            flex={1}
            _light={{ bg: 'white' }}
            _dark={{ bg: 'coolGray.800' }}
            bg="white"
            borderTopLeftRadius="2xl"
            borderTopRightRadius="2xl">
            <VStack space="5">
              <Tabs />
            </VStack>
          </Box>
        </Stack>
      </KeyboardAwareScrollView>
      <ActionButton />
    </DashboardLayout>
  );
}
