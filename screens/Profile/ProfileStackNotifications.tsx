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
  Select,
  Avatar,
  Image,
  useColorModeValue,
  Stack,
} from 'native-base';
import React, { useState } from 'react';
import { Platform } from 'react-native';
import type { ImageSourcePropType } from 'react-native';

import { NavigationProps } from '../../Props';
import NativeMap from '../../components/NativeMap';
import Colors from '../../constants/Colors';
import DashboardLayout from '../../layouts/DashboardLayout';

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
    imageUrl:
      'https://storage.googleapis.com/smiletaiwan-cms-cwg-tw/article/202003/article-5e6b3844e5039.jpg',
    name: '優惠放送，點選查看合作營地',
    date: '2023-02-02',
    time: '剛剛',
  },
  {
    imageUrl:
      'https://storage.googleapis.com/smiletaiwan-cms-cwg-tw/article/202003/article-5e6b3844e5039.jpg',
    name: '優惠放送，點選查看合作營地',
    date: '2023-04-29',
    time: '剛剛',
  },
  {
    imageUrl:
      'https://storage.googleapis.com/smiletaiwan-cms-cwg-tw/article/202003/article-5e6b3844e5039.jpg',
    name: '優惠放送，點選查看合作營地',
    date: '2023-07-12',
    time: '剛剛',
  },
];

const tabList3: List[] = [
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
];

const tabList4 = [
  {
    imageUrl: 'http://cdn.shopify.com/s/files/1/0588/1230/1506/articles/sports.jpg?v=1627890142',
    name: '版本更新通知',
    date: '2023-02-02',
  },
  {
    imageUrl: 'http://cdn.shopify.com/s/files/1/0588/1230/1506/articles/sports.jpg?v=1627890142',
    name: '版本更新通知',
    date: '2023-04-12',
  },
  {
    imageUrl: 'http://cdn.shopify.com/s/files/1/0588/1230/1506/articles/sports.jpg?v=1627890142',
    name: '版本更新通知',
    date: '2023-06-23',
  },
];

export default function Notifications({ navigation }: NavigationProps): JSX.Element {
  const [textInput, setTextInput] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('Home');

  function Tab_1() {
    const textColor = useColorModeValue('coolGray.800', 'coolGray.50');
    return (
      <ScrollView py={2}>
        <VStack space={5} mt={5} px={4}>
          {tabList3.map((item, index) => {
            return (
              <HStack alignItems="center" key={index} space="2.5">
                <Avatar source={{ uri: item.imageUrl }} height={10} width={10} />
                <Text fontWeight="bold" color={textColor}>
                  {item.name}
                </Text>
                <Text fontWeight="medium" color={textColor}>
                  {item.reaction}
                </Text>
                <Text color={textColor} fontWeight="normal" textAlign="center">
                  {item.time}
                </Text>
              </HStack>
            );
          })}
        </VStack>
      </ScrollView>
    );
  }
  function Tab_2() {
    const textColor = useColorModeValue('coolGray.800', 'coolGray.50');
    return (
      <ScrollView py={2}>
        <VStack space={5} mt={5} px={4}>
          {tabList2.map((item, index) => {
            return (
              <VStack alignItems="flex-start" key={'tab2-list-' + index}>
                <Image source={{ uri: item.imageUrl }} height={200} width="100%" alt="image" />
                <Text color={textColor} fontWeight="normal" textAlign="center" mt={2}>
                  {item.date}
                </Text>
                <Text fontWeight="bold" color={textColor}>
                  {item.name}
                </Text>
              </VStack>
            );
          })}
        </VStack>
      </ScrollView>
    );
  }
  function Tab_3() {
    const textColor = useColorModeValue('coolGray.800', 'coolGray.50');
    return (
      <ScrollView py={2}>
        <VStack space={5} mt={5} px={4}>
          {tabList4.map((item, index) => {
            return (
              <HStack alignItems="center" key={index} space="2.5">
                <VStack alignItems="flex-start">
                  <Text color={textColor} fontWeight="normal" textAlign="center">
                    {item.date}
                  </Text>
                  <Text fontWeight="bold" fontSize="lg" color={textColor}>
                    {item.name}
                  </Text>
                </VStack>
              </HStack>
            );
          })}
        </VStack>
      </ScrollView>
    );
  }

  const tabs = [
    {
      id: 1,
      title: '我的',
      component: <Tab_1 />,
    },
    {
      id: 2,
      title: '公告',
      component: <Tab_2 />,
    },
    {
      id: 3,
      title: '系統',
      component: <Tab_3 />,
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
              bg: Colors.LOGO_COLOR_GREEN,
            }}
            _dark={{
              bg: 'amber.900',
            }}
            h="0.5"
          />
        ) : (
          <Box
            _light={{
              bg: Colors.LOGO_COLOR_WHITE_BACKGROUND,
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

  return (
    <DashboardLayout title="通知" showBackButton>
      <Stack
        flex={1}
        _light={{ bg: Colors.LOGO_COLOR_WHITE_BACKGROUND }}
        _dark={{ bg: 'coolGray.800' }}>
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
    </DashboardLayout>
  );
}
