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
  Divider,
} from 'native-base';
import React, { useState } from 'react';
import { Platform } from 'react-native';

import { NavigationProps } from '../../Props';
import LocationList from '../../components/explore/LocationList';
import PostsList from '../../components/home/PostsList';
import Colors from '../../constants/Colors';
import DashboardLayout from '../../layouts/DashboardLayout';

export default function MainTabCommunityScreen({ navigation }: NavigationProps): JSX.Element {
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
      imageUri: require('../../assets/images/views/view_1.jpg'),
    },
    {
      id: 3,
      chapter: '南投縣',
      name: '露營地ABC',
      imageUri: require('../../assets/images/views/view_1.jpg'),
    },
    {
      id: 4,
      chapter: '南投縣',
      name: '露營地ABC',
      imageUri: require('../../assets/images/views/view_1.jpg'),
    },
  ];
  const postsList = [
    {
      id: 1,
      chapter: '露營地A',
      name: '第一次露營就上手',
      imageUri: require('../../assets/images/views/view_9.jpg'),
    },
    {
      id: 2,
      chapter: '露營地B',
      name: '美食讀',
      imageUri: require('../../assets/images/views/view_12.jpg'),
    },
    {
      id: 3,
      chapter: '露營地B',
      name: '露營美食',
      imageUri: require('../../assets/images/views/view_7.jpg'),
    },
    {
      id: 4,
      chapter: '露營地B',
      name: '露營地ABC',
      imageUri: require('../../assets/images/views/view_2.jpg'),
    },
  ];
  function Tab_1() {
    return (
      <ScrollView py={4}>
        <PostsList courses={postsList} />
      </ScrollView>
    );
  }
  function Tab_2() {
    return (
      <ScrollView py={4}>
        <Text>會破版待修</Text>
      </ScrollView>
    );
  }
  function Tab_3() {
    return (
      <ScrollView py={4}>
        <Text>會破版待修</Text>
      </ScrollView>
    );
  }

  const tabs = [
    {
      id: 1,
      title: '熱門',
      component: <Tab_1 />,
    },
    {
      id: 2,
      title: '關注',
      component: <Tab_2 />,
    },
    {
      id: 3,
      title: '我的',
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
    const [tabName, setTabName] = React.useState('熱門');
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
    <DashboardLayout title="社群">
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
