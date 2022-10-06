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
  Divider,
} from 'native-base';
import React, { useState } from 'react';
import { Platform } from 'react-native';

import { NavigationProps } from '../../Props';
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

  type TrackProps = {
    IconColorLight?: string;
    IconColorDark?: string;
  };

  function TrackingIcon(props: TrackProps) {
    return (
      <Icon
        size={5}
        as={MaterialIcons}
        name="circle"
        _light={{
          color: props.IconColorLight,
        }}
        _dark={{
          color: props.IconColorDark,
        }}
      />
    );
  }

  const trackingData = [
    {
      title: '陽明山三天兩夜',
      description: '待決定圖片與內頁排版',
      status: { type: true, time: '2022-10-08 05:38 pm' },
    },
    {
      title: '陽明山三天兩夜',
      description: '待決定圖片與內頁排版',
      status: { type: true, time: '2022-10-08 05:38 pm' },
    },
    {
      title: '陽明山三天兩夜',
      description: '待決定圖片與內頁排版',
      status: { type: true, time: '2022-10-08 05:38 pm' },
    },
    {
      title: '陽明山三天兩夜',
      description: '待決定圖片與內頁排版',
      status: { type: true, time: '2022-10-08 05:38 pm' },
    },
    {
      title: '陽明山三天兩夜',
      description: '待決定圖片與內頁排版',
      status: { type: true, time: '2022-10-08 05:38 pm' },
    },
  ];

  const StatusStepComponent = ({
    title,
    description,
    status,
    key,
  }: {
    title: string;
    description: string;
    key: number;
    status: { type: boolean; time: string };
  }) => {
    const arr = new Array(6).fill(0);
    return (
      <HStack justifyContent="flex-start" space="4" key={key}>
        <VStack>
          <TrackingIcon
            IconColorLight={status.type ? 'coolGray.200' : 'primary.300'}
            IconColorDark={status.type ? 'primary.500' : 'coolGray.400'}
          />
          <Divider
            orientation="vertical"
            _light={{ bg: 'coolGray.200' }}
            _dark={{ bg: 'primary.500' }}
            size="0.5"
            ml="9.5"
            flex={1}
          />
        </VStack>
        <VStack mb="6" flex={1}>
          <Text
            _light={{ color: status.type ? 'coolGray.800' : 'coolGray.400' }}
            _dark={{ color: status.type ? 'coolGray.50' : 'coolGray.500' }}
            fontWeight="medium"
            fontSize="sm"
            mb="2px">
            {title}
          </Text>

          <Text
            _light={{ color: status.type ? 'coolGray.500' : 'coolGray.400' }}
            _dark={{ color: status.type ? 'coolGray.400' : 'coolGray.500' }}
            fontWeight="normal"
            fontSize="xs">
            {description}
          </Text>
          {status.type && (
            <Text
              _light={{ color: 'coolGray.400' }}
              _dark={{ color: 'coolGray.500' }}
              fontWeight="normal"
              fontSize="xs">
              {status.time}
            </Text>
          )}
        </VStack>
      </HStack>
    );
  };

  function Tracking() {
    return (
      <Box px={{ base: '2', md: '0' }}>
        {trackingData.map((item, index) => (
          <StatusStepComponent
            title={item.title}
            description={item.description}
            status={item.status}
            key={index}
          />
        ))}
      </Box>
    );
  }

  function Tab_1() {
    return (
      <ScrollView py={4}>
        <LocationList courses={locationList} />
      </ScrollView>
    );
  }
  function Tab_2() {
    return (
      <ScrollView py={4}>
        <Tracking />
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
      title: '私藏地點',
      component: <Tab_1 />,
    },
    {
      id: 2,
      title: '旅行軌跡',
      component: <Tab_2 />,
    },
    {
      id: 3,
      title: '成就稱號',
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
    <DashboardLayout title="私藏">
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
