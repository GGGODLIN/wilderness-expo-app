import { MaterialIcons, Ionicons, Octicons } from '@expo/vector-icons';
import {
  HStack,
  Icon,
  VStack,
  Avatar,
  Button,
  Text,
  Stack,
  IconButton,
  ScrollView,
  Box,
  Circle,
  Link,
  Center,
  StatusBar,
  Image,
  Pressable,
} from 'native-base';
import React from 'react';
import { ImageBackground } from 'react-native';

import {
  MAIN_STACK_LOGIN,
  PROFILE_STACK_EDIT_PROFILE,
  PROFILE_STACK_CHANGE_PASSWORD,
} from '../../../NavigationNames';
import { NavigationProps } from '../../../Props';
import FloatingLabelInput from '../../../components/FloatingLabelInput';
import Colors from '../../../constants/Colors';
import DashboardLayout from '../../../layouts/DashboardLayout';

const bgColor = '#1f2937';

type IconProps = {
  iconName: string;
  iconText: string;
  onPress?: any;
};

export default function ProfileStackScreen({ navigation }: NavigationProps): JSX.Element {
  const IconList: IconProps[] = [
    {
      iconName: 'person',
      iconText: '修改資料',
      onPress: () => navigation.navigate(PROFILE_STACK_EDIT_PROFILE),
    },
    {
      iconName: 'key',
      iconText: '修改密碼',
      onPress: () => navigation.navigate(PROFILE_STACK_CHANGE_PASSWORD),
    },
    {
      iconName: 'repo',
      iconText: '我的文章',
    },
    {
      iconName: 'sign-in',
      iconText: '登入',
      onPress: () => navigation.navigate(MAIN_STACK_LOGIN),
    },
    {
      iconName: 'sign-out',
      iconText: '登出',
      onPress: () => navigation.navigate(MAIN_STACK_LOGIN),
    },
  ];

  function OptionList() {
    return (
      <Box mt={2.5}>
        {IconList.map((item, idx) => {
          return (
            <Button
              key={idx}
              onPress={item.onPress}
              variant="ghost"
              justifyContent="flex-start"
              py="3"
              px="5"
              _light={{
                _text: { color: 'coolGray.800' },
                _icon: { color: 'coolGray.800' },
                _hover: {
                  _text: {
                    color: 'coolGray.800',
                  },
                  _icon: {
                    color: 'primary.900',
                  },
                  bg: 'coolGray.50',
                },
              }}
              _dark={{
                _text: { color: 'coolGray.50' },
                _icon: { color: 'coolGray.50' },
                _hover: {
                  _text: {
                    color: 'primary.500',
                  },
                  _icon: {
                    color: 'primary.500',
                  },
                  bg: 'coolGray.700',
                },
              }}
              _text={{
                fontSize: 'md',
                fontWeight: 'medium',
              }}
              leftIcon={<Icon size={5} mr={2} as={MaterialIcons} name={item.iconName} />}>
              {item.iconText}
            </Button>
          );
        })}
      </Box>
    );
  }

  function Keyword(props: IconProps) {
    return (
      <Pressable
        onPress={props.onPress}
        width="22%"
        px="1"
        py="1"
        mx={1}
        my="1"
        borderRadius="10"
        borderColor="coolGray.100"
        //bg="coolGray.50"
        _pressed={{ bg: Colors.LOGO_COLOR_GREEN }}
        children={({ isPressed }) => (
          <Box>
            <VStack alignItems="center" justifyContent="space-between">
              <Icon
                size={6}
                m={1}
                ml={2}
                as={Octicons}
                name={props.iconName}
                color={isPressed ? 'white' : 'coolGray.500'}
              />
              <Text
                mx="0"
                my="0"
                fontSize="xs"
                color={isPressed ? 'white' : Colors.LOGO_COLOR_GREEN}>
                {props.iconText}
              </Text>
            </VStack>
          </Box>
        )}
      />
    );
  }

  function MobileScreen() {
    return (
      <>
        <Box
          pb={6}
          pt={1}
          alignItems="center"
          _light={{ bg: Colors.THEME_MAIN_BACKGROUND }}
          _dark={{ bg: 'coolGray.900' }}>
          <Avatar source={{ uri: 'https://picsum.photos/200' }} width={20} height={20} />
          <HStack alignItems="center" justifyContent="center" space={2} mt={3.5}>
            <Text
              fontSize="xl"
              fontWeight="bold"
              _dark={{
                color: 'coolGray.200',
              }}
              _light={{
                color: Colors.LOGO_COLOR_BROWN,
              }}>
              好野人
            </Text>
            {/*
            <IconButton
              p={0}
              icon={
                <Icon
                  as={MaterialIcons}
                  name="mode-edit"
                  size={5}
                  _dark={{
                    color: 'coolGray.200',
                  }}
                  _light={{
                    color: Colors.LOGO_COLOR_GREEN_BACKGROUND,
                  }}
                />
              }
            />
            */}
          </HStack>
          <HStack alignItems="center" justifyContent="center" space={2} mt={0}>
            <Text
              fontSize="xl"
              fontWeight="bold"
              _dark={{
                color: 'coolGray.200',
              }}
              _light={{
                color: Colors.LOGO_COLOR_BROWN,
              }}>
              Josh
            </Text>
            {/*
            <IconButton
              p={0}
              icon={
                <Icon
                  as={MaterialIcons}
                  name="mode-edit"
                  size={5}
                  _dark={{
                    color: 'coolGray.200',
                  }}
                  _light={{
                    color: Colors.LOGO_COLOR_GREEN_BACKGROUND,
                  }}
                />
              }
            />
            */}
          </HStack>
          <Text
            fontSize="sm"
            fontWeight="medium"
            textAlign="center"
            _light={{ color: Colors.LOGO_COLOR_BROWN }}
            _dark={{ color: 'coolGray.400' }}>
            0912345678
          </Text>
        </Box>
        <ScrollView>
          <OptionList />
        </ScrollView>
      </>
    );
  }

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ImageBackground source={{ uri: 'https://picsum.photos/500' }}>
        <Box safeAreaTop bg="#00000060">
          <HStack px="10%" pt="10" pb="10" alignItems="center" justifyContent="space-between">
            <VStack width="30%" alignItems="flex-start">
              <Center rounded="full">
                <Image
                  source={require('../../../assets/avatars/cate.png')}
                  width={16}
                  height={16}
                  alt="avatar"
                />
              </Center>
            </VStack>
            <VStack width="50%" alignItems="flex-start">
              <Text fontSize="xs" fontWeight="normal" color="coolGray.100">
                好野人
              </Text>
              <Text fontSize="xl" fontWeight="normal" color="white">
                Wolf
              </Text>
            </VStack>
            <Box>
              <Box borderWidth="1" borderColor="coolGray.300" borderRadius="xl" px="2" py="1">
                <Text fontSize="xs" fontWeight="normal" color="white">
                  打卡 125 次
                </Text>
              </Box>
            </Box>
          </HStack>
          <Box
            pt="5"
            px="8"
            py="4"
            bg={Colors.THEME_MAIN_BACKGROUND}
            borderTopLeftRadius="20"
            borderTopRightRadius="20">
            <HStack space="0" alignItems="center" justifyContent="space-between">
              <VStack width="20%" alignItems="center" justifyContent="space-between">
                <Text mt="2" fontSize="lg" fontWeight="bold" color="coolGray.500">
                  打卡
                </Text>
                <Text mt="0" mb="2" fontSize="lg" color="coolGray.500">
                  125
                </Text>
              </VStack>
              <VStack width="20%" alignItems="center" justifyContent="space-between">
                <Text mt="2" fontSize="lg" fontWeight="bold" color="coolGray.500">
                  關注
                </Text>
                <Text mt="0" mb="2" fontSize="lg" color="coolGray.500">
                  7
                </Text>
              </VStack>
              <VStack width="20%" alignItems="center" justifyContent="space-between">
                <Text mt="2" fontSize="lg" fontWeight="bold" color="coolGray.500">
                  收藏
                </Text>
                <Text mt="0" mb="2" fontSize="lg" color="coolGray.500">
                  26
                </Text>
              </VStack>
              <VStack width="20%" alignItems="center" justifyContent="space-between">
                <Text mt="2" fontSize="lg" fontWeight="bold" color="coolGray.500">
                  貢獻
                </Text>
                <Text mt="0" mb="2" fontSize="lg" color="coolGray.500">
                  5
                </Text>
              </VStack>
            </HStack>
          </Box>
          <Box pt="0" pb="60" minHeight="700" px="0" py="4" bg="white">
            <Box px="4" py="4" bg="white" borderRadius="20">
              <ScrollView>
                <Stack
                  width="100%"
                  flexWrap="wrap"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center">
                  {IconList.map((item, index) => (
                    <Keyword key={index} {...item} />
                  ))}
                </Stack>
              </ScrollView>
            </Box>
            <HStack mt={{ base: 6, md: 4 }} justifyContent="center" alignItems="center" space="4">
              <Link href="https://www.facebook.com/WildernessComTW">
                <Image
                  width="6"
                  height="6"
                  source={require('../../../assets/icon/facebook.png')}
                  alt="Alternate Text"
                />
              </Link>
              <Link href="https://line.me/R/ti/p/@004uiixw">
                <Image
                  width="6"
                  height="6"
                  source={require('../../../assets/icon/line.png')}
                  alt="Alternate Text"
                />
              </Link>
            </HStack>
          </Box>
        </Box>
      </ImageBackground>
    </>
  );
}
