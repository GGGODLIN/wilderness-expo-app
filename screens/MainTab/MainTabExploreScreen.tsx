import { MaterialIcons } from '@expo/vector-icons';
import { Button, HStack, Text, Icon, Input, Pressable, Box } from 'native-base';
import React, { useState } from 'react';
import { Platform } from 'react-native';

import { NavigationProps } from '../../Props';
import NativeMap from '../../components/NativeMap';
import DashboardLayout from '../../layouts/DashboardLayout';

export default function MainTabExploreScreen({ navigation }: NavigationProps): JSX.Element {
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
          bg: currentSelectedAddress === label ? 'primary.50' : 'transparent',
          borderColor: currentSelectedAddress === label ? 'primary.50' : 'coolGray.300',
          _pressed: { bg: 'primary.100' },
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

  return (
    <DashboardLayout title="附近活動">
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
          placeholder="2118 Thornridge Cir. Syracuse,…"
          fontSize="md"
          fontWeight="medium"
        />
        {/*{Platform.OS === 'web' ? <WebMap /> : <NativeMap />}*/}
        <NativeMap />
      </Box>
    </DashboardLayout>
  );
}
