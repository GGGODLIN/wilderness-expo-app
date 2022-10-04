import { AntDesign, Fontisto, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import {
  Box,
  HStack,
  Icon,
  Text,
  VStack,
  Avatar,
  Image,
  Input,
  Hidden,
  IconButton,
  Divider,
} from 'native-base';
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { NavigationProps } from '../../Props';
import ChatLayout from '../../layouts/ChatLayout';

type ChatItem = {
  name?: string;
  imageUri: any;
  text: string;
  time: string;
  type: string;
  align: string;
  read: boolean;
};
const chatItemList: ChatItem[] = [
  {
    type: 'text',
    name: 'Joe',
    align: 'left',
    text: '下週末要開團嗎',
    time: '12.00AM',
    imageUri: '',
    read: false,
  },
  {
    type: 'text',
    align: 'right',
    text: '+1，兩天都可以',
    time: '12.01AM',
    imageUri: '',
    read: true,
  },
  {
    type: 'text',
    name: 'Emily',
    align: 'left',
    text: '晚上要不要順便吃羊肉爐',
    time: '12.02AM',
    imageUri: '',
    read: false,
  },
  {
    type: 'text',
    name: 'Joe',
    align: 'left',
    text: '好啊 😂',
    time: '12.03AM',
    imageUri: '',
    read: false,
  },
  {
    type: 'text',
    name: 'Emily',
    align: 'left',
    text: '那我先訂位 ♥',
    time: '12.02AM',
    imageUri: '',
    read: false,
  },
  {
    type: 'text',
    align: 'right',
    text: 'OK',
    time: '12.09AM',
    imageUri: '',
    read: true,
  },
];

function ChatHeader() {
  return (
    <HStack
      borderTopRadius="sm"
      _light={{ bg: 'primary.900' }}
      _dark={{ bg: 'coolGray.900' }}
      alignItems="center"
      space="3"
      p="4">
      <IconButton
        variant="unstyled"
        p="0"
        icon={<Icon size="6" as={AntDesign} name="arrowleft" color="coolGray.50" />}
      />
      <Avatar source={require('../MainStack/images/janedoe.png')} size="8" />
      <Box>
        <Text color="coolGray.50" fontSize="lg">
          Boss 高爾夫球社
        </Text>
        <Text fontSize="sm" _light={{ color: 'primary.300' }} _dark={{ color: 'coolGray.400' }}>
          高爾夫球社
        </Text>
      </Box>
      <HStack alignItems="center" space="3" ml="auto">
        <IconButton
          variant="unstyled"
          p="0"
          icon={<Icon size="6" as={MaterialIcons} name="search" color="coolGray.50" />}
        />
        <IconButton
          variant="unstyled"
          p="0"
          icon={<Icon size="6" as={MaterialIcons} name="more-vert" color="coolGray.50" />}
        />
      </HStack>
    </HStack>
  );
}
function ChatItem(props: ChatItem) {
  return (
    <Box flexDirection={props.align === 'left' ? 'row' : 'row-reverse'}>
      {props.type === 'text' ? (
        <VStack
          minW="32"
          maxW={{ base: '268', md: '396' }}
          borderRadius="sm"
          pt="2"
          pb="1"
          px="2"
          space="0.5"
          _light={{
            bg: props.align === 'left' ? 'coolGray.200' : 'primary.300',
          }}
          _dark={{
            bg: props.align === 'left' ? 'coolGray.700' : 'coolGray.600',
          }}>
          {props.name ? (
            <Text
              fontSize="sm"
              fontWeight="medium"
              _light={{ color: 'primary.900' }}
              _dark={{ color: 'primary.500' }}>
              {props.name}
            </Text>
          ) : null}
          <Text
            fontSize="sm"
            _light={{
              color: 'coolGray.800',
            }}
            _dark={{
              color: 'coolGray.50',
            }}>
            {props.text}
          </Text>
          <HStack space="1" justifyContent="flex-end" alignItems="center">
            <Text
              fontSize="xs"
              _light={{
                color: 'coolGray.500',
              }}
              _dark={{
                color: 'coolGray.400',
              }}>
              {props.time}
            </Text>
            {props.read ? (
              <Icon
                size="5"
                _light={{
                  color: 'coolGray.500',
                }}
                _dark={{
                  color: 'coolGray.400',
                }}
                as={MaterialIcons}
                name="done-all"
              />
            ) : null}
          </HStack>
        </VStack>
      ) : (
        <Box flex="1" alignItems="flex-end">
          <Image
            w="40%"
            maxW="287"
            h="170"
            resizeMode="cover"
            alt="alternative text"
            source={props.imageUri}
            borderRadius="sm"
          />
          <HStack position="absolute" bottom="1" right="2" zIndex={2} space="1">
            <Text fontSize="xs" color="coolGray.50">
              {props.time}
            </Text>
            {props.read ? (
              <Icon
                size="5"
                _light={{
                  color: 'coolGray.500',
                }}
                _dark={{
                  color: 'coolGray.400',
                }}
                as={MaterialIcons}
                name="done-all"
              />
            ) : null}
          </HStack>
        </Box>
      )}
    </Box>
  );
}
function ChatInput() {
  const [textInput, setTextInput] = useState('');
  return (
    <Box
      w="100%"
      borderBottomRadius={{ md: 4 }}
      _light={{ bg: 'white' }}
      _dark={{ bg: 'coolGray.800' }}>
      <Divider />
      <HStack alignItems="center" pt="3" pb="4" px={{ base: 4, md: 8 }}>
        {/*
        <IconButton
          p={0.5}
          variant="unstyled"
          icon={<Icon color="coolGray.400" as={Fontisto} name="smiley" size="5" />}
        />
        */}
        <IconButton
          p={0}
          variant="unstyled"
          icon={
            <Icon color="coolGray.400" as={MaterialCommunityIcons} name="camera-outline" size="6" />
          }
        />

        <Input
          flex={1}
          _android={{ py: '0.5', px: '4' }}
          py="2"
          px="4"
          ml={{ base: 2, md: 3 }}
          mr="3"
          size="md"
          variant="outline"
          rounded="md"
          placeholder="Type a message"
          placeholderTextColor="coolGray.400"
          value={textInput}
          onChangeText={setTextInput}
          _light={{
            bg: 'coolGray.100',
            borderColor: 'white',
          }}
          _dark={{
            bg: 'coolGray.700',
            borderColor: 'coolGray.800',
          }}
        />
        <HStack alignItems="center" space="3" ml="auto">
          {/*
          <IconButton
            p={0}
            variant="unstyled"
            icon={<Icon color="coolGray.400" as={MaterialIcons} name="attach-file" size="6" />}
          />
          */}

          <IconButton
            rounded="full"
            _light={{ bg: 'primary.900' }}
            _dark={{ bg: 'primary.700' }}
            p="1"
            variant="unstyled"
            icon={<Icon color="coolGray.50" as={MaterialIcons} name="send" size={4} />}
          />
        </HStack>
      </HStack>
    </Box>
  );
}
function MainContent() {
  return (
    <Box flex="1" _light={{ bg: 'white' }} _dark={{ bg: 'coolGray.800' }} rounded={{ md: 'sm' }}>
      <Hidden till="md">
        <ChatHeader />
      </Hidden>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <VStack
          px={{ base: 4, md: 20 }}
          py={{ base: 4, md: 10 }}
          _light={{
            bg: { md: 'white' },
          }}
          _dark={{
            bg: { md: 'coolGray.800' },
          }}
          space={{ base: 2, md: 3 }}>
          {chatItemList.map((item, index) => {
            return <ChatItem {...item} key={index} />;
          })}
        </VStack>
      </KeyboardAwareScrollView>
      <ChatInput />
    </Box>
  );
}

export default function MainTabCollectionScreen({ navigation }: NavigationProps): JSX.Element {
  return (
    <ChatLayout title="Boss 高爾夫球社" displaySidebar={false} subTitle="1,239 人">
      <MainContent />
    </ChatLayout>
  );
}
