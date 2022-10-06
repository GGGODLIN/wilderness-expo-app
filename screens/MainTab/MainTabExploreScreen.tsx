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
  Content,
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
  const [textInput, setTextInput] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('Home');

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

  function Tab_1() {
    return (
      <>
        <NativeMap />
        <Box py={4} px={{ base: 4, md: 4 }} _light={{ bg: 'white' }} _dark={{ bg: 'coolGray.800' }}>
          <HStack space="2" mt={0} justifyContent="center" width="100%">
            <Center>
              <Select
                placeholder="台中市"
                selectedValue={textInput}
                onValueChange={(itemValue) => setTextInput(itemValue)}
                _light={{
                  placeholderTextColor: 'coolGray.500',
                  color: 'coolGray.800',
                }}
                _dark={{
                  placeholderTextColor: 'coolGray.400',
                  color: 'coolGray.50',
                }}>
                <Select.Item label="臺北市" value="臺北市" />
                <Select.Item label="新北市" value="新北市" />
                <Select.Item label="桃園市" value="桃園市" />
                <Select.Item label="臺中市" value="臺中市" />
                <Select.Item label="臺南市" value="臺南市" />
                <Select.Item label="高雄市" value="高雄市" />
              </Select>
            </Center>
            <Center>
              <Select
                placeholder="北屯區"
                _light={{
                  placeholderTextColor: 'coolGray.500',
                  color: 'coolGray.800',
                }}
                _dark={{
                  placeholderTextColor: 'coolGray.400',
                  color: 'coolGray.50',
                }}>
                <Select.Item label="龍井區" value="龍井區" />
                <Select.Item label="沙鹿區" value="沙鹿區" />
                <Select.Item label="清水區" value="清水區" />
                <Select.Item label="梧棲區" value="梧棲區" />
              </Select>
            </Center>
          </HStack>
        </Box>
        {/*
        <Fab
          placement="bottom-right"
          colorScheme="blue"
          size="lg"
          icon={<Icon name="share" as="Entypo" />}
    />*/}
      </>
    );
  }
  function Tab_2() {
    return (
      <ScrollView>
        <LocationList courses={locationList} />
      </ScrollView>
    );
  }
  function Tab_3() {
    return (
      <ScrollView>
        <LocationList courses={locationList} />
      </ScrollView>
    );
  }

  const tabs = [
    {
      id: 1,
      title: '附近',
      component: <Tab_1 />,
    },
    {
      id: 2,
      title: '查詢',
      component: <Tab_2 />,
    },
    {
      id: 3,
      title: '私藏',
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
          fontSize="sm"
          fontWeight="medium"
          letterSpacing="0.4"
          _light={{
            color: tabName === currentTab ? Colors.LOGO_COLOR_BROWN : 'coolGray.500',
          }}
          _dark={{
            color: tabName === currentTab ? 'primary.500' : 'coolGray.400',
          }}
          px={4}
          py={2}>
          {tabName}
        </Text>
        {tabName === currentTab && (
          <Box
            borderTopLeftRadius="sm"
            borderTopRightRadius="sm"
            _light={{
              bg: Colors.LOGO_COLOR_BROWN,
            }}
            _dark={{
              bg: 'primary.500',
            }}
            h="1"
          />
        )}
      </Pressable>
    );
  }
  function Tabs() {
    const [tabName, setTabName] = React.useState('Review');
    const [tabChildren, setTabChildren] = useState<React.ReactNode>(<Tab_1 />);
    return (
      <>
        <Center>
          <HStack space="5" borderRadius="sm">
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
    <DashboardLayout title="探索">
      <Box
        px={{ md: 8, xl: 35 }}
        py={{ md: 8 }}
        flex={1}
        _light={{ bg: 'white' }}
        _dark={{ bg: 'coolGray.800' }}>
        <VStack space="5">
          <Tabs />
        </VStack>
        {/*{Platform.OS === 'web' ? <WebMap /> : <NativeMap />}*/}
      </Box>
    </DashboardLayout>
  );
}
