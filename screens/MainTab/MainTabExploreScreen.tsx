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
  Container,
  Heading,
  VStack,
  Select,
  Fab,
  ScrollView,
} from 'native-base';
import React, { useState } from 'react';
import { Platform } from 'react-native';

import { NavigationProps } from '../../Props';
import NativeMap from '../../components/NativeMap';
import LocationList from '../../components/explore/LocationList';
import Colors from '../../constants/Colors';
import DashboardLayout from '../../layouts/DashboardLayout';

export default function MainTabExploreScreen({ navigation }: NavigationProps): JSX.Element {
  const [showFilter, setShowFilter] = useState('');
  const [textInput, setTextInput] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('Home');

  const AddressBadge = ({
    label,
    currentSelectedAddress,
  }: {
    label: string;
    currentSelectedAddress: string;
  }) => {
    return (
      <Pressable
        px={8}
        py={3}
        borderWidth={1}
        onPress={() => {
          setSelectedAddress(label);
        }}
        _light={{
          bg: currentSelectedAddress === label ? Colors.LOGO_COLOR_GREEN_BACKGROUND : 'transparent',
          borderColor:
            currentSelectedAddress === label ? Colors.LOGO_COLOR_GREEN_BACKGROUND : 'coolGray.300',
          _pressed: { bg: Colors.LOGO_COLOR_GREEN_BACKGROUND },
        }}
        _dark={{
          bg: currentSelectedAddress === label ? 'coolGray.700' : 'transparent',
          borderColor: currentSelectedAddress === label ? 'coolGray.700' : 'coolGray.700',
          _pressed: { bg: 'coolGray.600' },
        }}
        alignItems="center"
        justifyContent="center"
        rounded="sm">
        <Text _light={{ color: 'primary.900' }} _dark={{ color: 'coolGray.50' }} fontSize="md">
          {label}
        </Text>
      </Pressable>
    );
  };

  const locationList = [
    {
      id: 1,
      chapter: '南投縣',
      name: '露營地ABC',
      imageUri: require('../../assets/images/views/view_1.jpg'),
    },
    {
      id: 2,
      chapter: '南投縣',
      name: '露營地ABC',
      imageUri: require('../../assets/images/views/view_3.jpg'),
    },
    {
      id: 3,
      chapter: '南投縣',
      name: '露營地ABC',
      imageUri: require('../../assets/images/views/view_5.jpg'),
    },
    {
      id: 4,
      chapter: '南投縣',
      name: '露營地ABC',
      imageUri: require('../../assets/images/views/view_4.jpg'),
    },
  ];

  return (
    <DashboardLayout title="探索">
      <Box
        px={{ md: 8, xl: 35 }}
        py={{ md: 8 }}
        flex={1}
        _light={{ bg: 'white' }}
        _dark={{ bg: 'coolGray.800' }}>
        <Input
          borderWidth={1}
          mx={3}
          zIndex={1}
          variant="unstyled"
          position="absolute"
          top={{ base: '5', md: '44' }}
          left={{ base: 0, md: '8', xl: '35' }}
          right={{ base: 0, md: '8', xl: '35' }}
          py={3}
          value={textInput}
          onPress={() => setShowFilter('show')}
          onFocus={() => setShowFilter('show')}
          onChangeText={setTextInput}
          size="lg"
          _light={{
            bg: 'coolGray.50',
            borderColor: 'coolGray.300',
            placeholderTextColor: 'coolGray.400',
            color: 'coolGray.800',
          }}
          _dark={{
            bg: 'coolGray.800',
            borderColor: 'coolGray.500',
            placeholderTextColor: 'coolGray.400',
            color: 'coolGray.50',
          }}
          _focus={{
            _light: {
              bg: 'coolGray.50',
              borderColor: 'coolGray.300',
              placeholderTextColor: 'coolGray.400',
              color: 'coolGray.800',
            },
            _dark: {
              bg: 'coolGray.800',
              borderColor: 'coolGray.500',
              placeholderTextColor: 'coolGray.400',
              color: 'coolGray.50',
            },
          }}
          _hover={{
            _light: {
              bg: 'coolGray.50',
              borderColor: 'coolGray.300',
              placeholderTextColor: 'coolGray.400',
              color: 'coolGray.800',
            },
            _dark: {
              bg: 'coolGray.800',
              borderColor: 'coolGray.500',
              placeholderTextColor: 'coolGray.400',
              color: 'coolGray.50',
            },
          }}
          InputLeftElement={
            <Icon
              as={<MaterialIcons name="search" />}
              size="6"
              ml="3"
              _light={{
                color: 'coolGray.400',
              }}
              _dark={{
                color: 'coolGray.400',
              }}
            />
          }
          InputRightElement={
            <Pressable
              onPress={() => {
                setTextInput('');
              }}>
              <Icon
                as={<MaterialIcons name="close" />}
                size="6"
                mr="3"
                _light={{
                  color: 'coolGray.400',
                }}
                _dark={{
                  color: 'coolGray.400',
                }}
              />
            </Pressable>
          }
          placeholder="搜尋"
          fontSize="md"
          fontWeight="medium"
        />
        {showFilter == 'show' ? (
          <Box py={4} px={{ base: 4, md: 0 }}>
            <Text
              _light={{ color: 'coolGray.800' }}
              _dark={{ color: 'coolGray.50' }}
              fontSize="sm"
              fontWeight="medium"
              mt={16}>
              所有篩選項，待設定完整資料與圖示
            </Text>
            <HStack space="3" mt={3}>
              <AddressBadge label="水" currentSelectedAddress={selectedAddress} />
              <AddressBadge label="營火" currentSelectedAddress={selectedAddress} />
              <AddressBadge label="WIFI" currentSelectedAddress={selectedAddress} />
            </HStack>
            <Button
              mt={{ base: 5 }}
              variant="solid"
              size="lg"
              _light={{
                bg: Colors.LOGO_COLOR_BROWN,
              }}
              _dark={{
                bg: 'coolGray.700',
              }}>
              查詢
            </Button>
          </Box>
        ) : null}
        <NativeMap
          onPress={() => {
            setShowFilter('');
          }}
        />

        {/*{Platform.OS === 'web' ? <WebMap /> : <NativeMap />}*/}
      </Box>
    </DashboardLayout>
  );
}
