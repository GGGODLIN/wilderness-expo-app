import { MaterialIcons, Ionicons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import MasonryList from '@react-native-seoul/masonry-list';
import * as ExpoLocation from 'expo-location';
import {
  Button,
  HStack,
  Text,
  Icon,
  Input,
  Pressable,
  Box,
  IconButton,
  Image,
  VStack,
  Center,
  useToast,
  Select,
  CheckIcon,
  Stack,
} from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import MapView, { AnimatedRegion, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';

import {
  MAIN_STACK_LOCATION_DETAILS,
  MAIN_STACK_CREATE_POST_WITH_LOCATION,
  MAIN_STACK_CREATE_LOCATION,
} from '../../../NavigationNames';
import { NavigationProps } from '../../../Props';
import Colors from '../../../constants/Colors';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { getRegionFromMarkers } from '../../../utils/MapUtils';

const locationList = [
  {
    id: 1,
    image: 'https://picsum.photos/1000',
    name: '活動 1',
    description: '我是活動 1',
    latitude: 25.01,
    longitude: 121.54,
    avatorImageUri:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    author: '作者',
    clubsName: '這是一個名字很長長長長的社團',
    eventName: '點我連到活動頁',
    imageUri: require('../../../assets/images/views/view_3.jpg'),
    title: '地點 A',
    dateStart: '2022-12-25',
    dateEnd: '2022-12-30',
    timeStart: '18:00',
    timeEnd: '20:00',
    week: '週日',
    like: 639,
    liked: true,
    tags: [
      {
        id: 1,
        title: '私人營地',
      },
      {
        id: 2,
        title: '需要預約',
      },
    ],
    altitude: 123,
  },
  {
    id: 2,
    image: 'https://picsum.photos/1000',
    name: '活動 2',
    description: '活動 2 簡介',
    latitude: 25.02,
    longitude: 121.52,
    avatorImageUri:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    author: '作者',
    clubsName: null,
    eventName: '點我連到活動頁',
    imageUri: require('../../../assets/images/views/view_3.jpg'),
    title: '地點 B',
    dateStart: '2022-12-25',
    dateEnd: '2022-12-30',
    timeStart: '18:00',
    timeEnd: '20:00',
    week: '週日',
    like: 639,
    liked: true,
    tags: [
      {
        id: 1,
        title: 'SUP',
      },
      {
        id: 2,
        title: '水上地點',
      },
    ],
    altitude: 567,
  },
  {
    id: 3,
    image: 'https://picsum.photos/1000',
    name: '活動3',
    description: '我是活動 3',
    latitude: 25.03,
    longitude: 121.51,
    avatorImageUri:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    author: '作者',
    clubsName: null,
    eventName: '點我連到活動頁',
    imageUri: require('../../../assets/images/views/view_3.jpg'),
    title: '地點 C',
    dateStart: '2022-12-25',
    dateEnd: '2022-12-30',
    timeStart: '18:00',
    timeEnd: '20:00',
    week: '週日',
    like: 639,
    liked: true,
    tags: [
      {
        id: 1,
        title: '親子營地',
      },
    ],
    altitude: 999,
  },
  {
    id: 4,
    image: 'https://picsum.photos/1000',
    name: '活動4',
    description: '我是活動 4',
    latitude: 25.04,
    longitude: 121.55,
    avatorImageUri:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    author: '作者',
    clubsName: '點我連到社團頁',
    eventName: null,
    imageUri: require('../../../assets/images/views/view_3.jpg'),
    title: '這是一個很長的標題這是一個很長的標題',
    dateStart: '2022-12-25',
    dateEnd: '2022-12-30',
    timeStart: '18:00',
    timeEnd: '20:00',
    week: '週日',
    like: 639,
    liked: true,
    tags: [
      {
        id: 1,
        title: '車泊熱點',
      },
    ],
    altitude: 1234,
  },
  {
    id: 5,
    image: 'https://picsum.photos/1000',
    name: '活動5',
    description: '我是活動 5',
    latitude: 25.05,
    longitude: 121.58,
    avatorImageUri:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    author: '作者',
    clubsName: null,
    eventName: '點我連到活動頁',
    imageUri: require('../../../assets/images/views/view_3.jpg'),
    title: '地點 F',
    dateStart: '2022-12-25',
    dateEnd: '2022-12-30',
    timeStart: '18:00',
    timeEnd: '20:00',
    week: '週日',
    like: 639,
    liked: true,
    tags: [
      {
        id: 1,
        title: '深山',
      },
    ],
    altitude: 5432,
  },
  {
    id: 6,
    image: 'https://picsum.photos/1000',
    name: '活動6',
    description: '我是活動 6',
    latitude: 25.06,
    longitude: 121.57,
    avatorImageUri:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    author: '作者',
    clubsName: null,
    eventName: '點我連到活動頁',
    imageUri: require('../../../assets/images/views/view_3.jpg'),
    title: '地點 G',
    dateStart: '2022-12-25',
    dateEnd: '2022-12-30',
    timeStart: '18:00',
    timeEnd: '20:00',
    week: '週日',
    like: 639,
    liked: true,
    tags: [
      {
        id: 1,
        title: '關鍵字',
      },
      {
        id: 2,
        title: '關鍵字',
      },
      {
        id: 3,
        title: '關鍵字',
      },
    ],
    altitude: 1243,
  },
];

const DEFAULT_MAPVIEW_REGION = {
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
  latitude: 25.032163,
  longitude: 121.535002,
};

const mapStyle = [
  {
    featureType: 'poi',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];

export default function ExploreScreen({ navigation }: NavigationProps): JSX.Element {
  const [showLocationCard, setShowLocationCard] = useState(true);

  // 篩選列
  const [showFilterCondition, setShowFilterCondition] = useState(false);
  const [showFilterTag, setShowFilterTag] = useState(false);
  const [showFilterFacility, setShowFilterFacility] = useState(false);

  const [textInput, setTextInput] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('Home');
  const [mapErrorMsg, setMapErrorMsg] = useState<string | null>(null);
  const screenWidth = Dimensions.get('screen').width;
  const mapRef = useRef<MapView | null>(null);
  const panRef = useRef<ScrollView | null>(null);

  const [showCountry, setShowCountry] = useState(false);
  const [showAltitude, setShowAltitude] = useState(false);
  const [showRecommend, setShowRecommend] = useState(false);
  const [showCrowded, setShowCrowded] = useState(false);
  const [country, setCountry] = React.useState('不限制縣市');
  const [altitude, setAltitude] = useState('不限制海拔');
  const [recommend, setRecommend] = useState('不限制推薦');
  const [crowded, setCrowded] = useState('不限制擁擠程度');

  /*const [country, setCountry] = React.useState('');*/
  const [area, setArea] = React.useState('');
  const [level, setLevel] = React.useState('');

  const toast = useToast();

  const currentRegion = new AnimatedRegion(DEFAULT_MAPVIEW_REGION);

  useEffect(() => {
    (async () => {
      const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setMapErrorMsg('Permission to access location was denied');
        return;
      }

      const location = await ExpoLocation.getCurrentPositionAsync({});
      mapRef!.current!.animateToRegion(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        },
        300
      );
    })();

    //FIXME 改成定位完成後移動到當前位置
    const markers = locationList.map((location) => ({
      latitude: location.latitude,
      longitude: location.longitude,
    }));
    const region = getRegionFromMarkers(markers);

    mapRef!.current!.animateToRegion(region, 300);
  }, []);

  const AddressBadge = ({
    label,
    currentSelectedAddress,
  }: {
    label: string;
    currentSelectedAddress: string;
  }) => {
    return (
      <Pressable
        px={4}
        py={1}
        borderWidth={1}
        borderRadius="2xl"
        onPress={() => {
          setSelectedAddress(label);
        }}
        _light={{
          bg:
            currentSelectedAddress === label
              ? Colors.LOGO_COLOR_GREEN
              : Colors.LOGO_COLOR_WHITE_BACKGROUND,
          borderColor:
            currentSelectedAddress === label
              ? Colors.LOGO_COLOR_GREEN
              : Colors.LOGO_COLOR_WHITE_BACKGROUND,
          _pressed: {
            bg: Colors.LOGO_COLOR_WHITE_BACKGROUND,
            borderColor: Colors.LOGO_COLOR_WHITE_BACKGROUND,
          },
        }}
        alignItems="center"
        justifyContent="center"
        rounded="full">
        <Text
          _light={{ color: currentSelectedAddress === label ? 'white' : 'coolGray.500' }}
          fontSize="md">
          {label}
        </Text>
      </Pressable>
    );
  };

  function CustomTitle() {
    return (
      <HStack alignItems="flex-start" justifyContent="space-between">
        <Input
          borderWidth={1}
          py={2}
          my={1}
          mb={2}
          mx={4}
          borderRadius="2xl"
          bg="white"
          variant="unstyled"
          value={textInput}
          onPress={() => {
            setShowLocationCard(false);
          }}
          onFocus={() => {
            setShowLocationCard(false);
          }}
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
                Keyboard.dismiss();
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
      </HStack>
    );
  }

  const onRegionChangeComplete = (region: Region): void => {
    currentRegion.setValue(region);
  };

  if (mapErrorMsg) {
    return (
      <DashboardLayout title="活動" customTitle={<CustomTitle />}>
        <Box px={{ md: 8, xl: 35 }} py={{ md: 5 }} flex={1}>
          <Text>{mapErrorMsg}</Text>
        </Box>
      </DashboardLayout>
    );
  }

  const tags = [
    { id: 1, title: '車泊' },
    { id: 2, title: '營地' },
    { id: 3, title: 'SUP' },
    { id: 4, title: '釣魚' },
    { id: 5, title: '親子' },
  ];

  type Icon = {
    name: string;
    text: string;
    state: number;
  };
  const icons: Icon[] = [
    {
      name: 'caravan',
      text: '收費營地',
      state: 0,
    },
    {
      name: 'caravan',
      text: '公共營地',
      state: 0,
    },
    {
      name: 'caravan',
      text: '露營車',
      state: 0,
    },
    {
      name: 'caravan',
      text: '露營車',
      state: 0,
    },
    {
      name: 'caravan',
      text: '任意',
      state: 0,
    },
    {
      name: 'caravan',
      text: '任意',
      state: 0,
    },
    {
      name: 'caravan',
      text: '任意',
      state: 0,
    },
    {
      name: 'caravan',
      text: '任意',
      state: 0,
    },
    {
      name: 'caravan',
      text: '任意',
      state: 0,
    },
    {
      name: 'caravan',
      text: '任意',
      state: 0,
    },
    {
      name: 'caravan',
      text: '任意',
      state: 0,
    },
    {
      name: 'caravan',
      text: '任意',
      state: 0,
    },
    {
      name: 'caravan',
      text: '任意',
      state: 0,
    },
    {
      name: 'caravan',
      text: '任意',
      state: 0,
    },
    {
      name: 'caravan',
      text: '任意',
      state: 0,
    },
    {
      name: 'caravan',
      text: '任意',
      state: 0,
    },
    {
      name: 'caravan',
      text: '任意',
      state: 0,
    },
    {
      name: 'caravan',
      text: '任意',
      state: 0,
    },
    {
      name: 'caravan',
      text: '任意',
      state: 0,
    },
    {
      name: 'caravan',
      text: '任意',
      state: 0,
    },
  ];

  function getFacilityStyle(state: number) {
    if (state === 0) {
      return 'coolGray.200';
    }
    if (state === 1) {
      return 'coolGray.700';
    }
    if (state === 2) {
      return 'red.700';
    }
    return 'coolGray.500';
  }
  function FacilityCard(props: { item: Icon }) {
    const [facilityState, setFacilityState] = useState(props.item.state);

    return (
      <TouchableOpacity
        onPress={() => {
          if (facilityState >= 2) {
            setFacilityState(0);
          } else {
            setFacilityState(facilityState + 1);
          }
        }}>
        <HStack
          key={'icon_' + props.index}
          overflow="visible"
          mx={0}
          mb={0}
          alignItems="center"
          justifyContent="flex-start">
          <IconButton
            variant="unstyled"
            icon={
              <Icon
                as={FontAwesome5}
                name={props.item.name}
                _light={{
                  color: getFacilityStyle(facilityState),
                }}
                size={3}
                textAlign="center"
                alignSelf="center"
              />
            }
          />
          <Text
            fontSize="sm"
            color={getFacilityStyle(facilityState)}
            textAlign="center"
            strikeThrough={facilityState === 2}>
            {props.item.text}
          </Text>
        </HStack>
      </TouchableOpacity>
    );
  }

  return (
    <DashboardLayout title="活動" customTitle={<CustomTitle />}>
      <Box px={{ md: 8, xl: 35 }} py={{ md: 5 }} flex={1}>
        {showCountry && (
          <VStack
            position="absolute"
            bg="white"
            bottom={0}
            left={0}
            w="100%"
            h="300"
            pb="30"
            shadow={2}
            zIndex={9}
            flex={1}
            justifyContent="center">
            <Picker
              mode="dialog"
              style={{ height: 100, flex: 1 }}
              accessibilityLabel="選擇縣市"
              placeholder="選擇縣市"
              selectedValue={country}
              onValueChange={(itemValue, itemIndex) => {
                setCountry(itemValue);
              }}>
              <Picker.Item label="請選擇" value="不限制縣市" />
              <Picker.Item label="台北市" value="台北市" />
              <Picker.Item label="新北市" value="新北市" />
              <Picker.Item label="桃園市" value="桃園市" />
              <Picker.Item label="台中市" value="台中市" />
            </Picker>
            <Button
              mx={4}
              variant="solid"
              size="lg"
              style={{ backgroundColor: 'black' }}
              onPress={() => {
                setShowCountry(false);
              }}>
              選擇
            </Button>
          </VStack>
        )}
        {showAltitude && (
          <VStack
            position="absolute"
            bg="white"
            bottom={0}
            left={0}
            w="100%"
            h="300"
            pb="30"
            shadow={2}
            zIndex={9}
            flex={1}
            justifyContent="center">
            <Picker
              mode="dialog"
              style={{ height: 100, flex: 1 }}
              accessibilityLabel="選擇海拔"
              placeholder="選擇海拔"
              selectedValue={altitude}
              onValueChange={(itemValue, itemIndex) => {
                setAltitude(itemValue);
              }}>
              <Picker.Item label="不限制海拔" value="不限制海拔" />
              <Picker.Item label="海邊" value="海邊" />
              <Picker.Item label="平地" value="平地" />
              <Picker.Item label="300公尺以下" value="300" />
              <Picker.Item label="300公尺~500公尺" value="500" />
              <Picker.Item label="500公尺~800公尺" value="800" />
              <Picker.Item label="800公尺~1000公尺" value="1000" />
              <Picker.Item label="1000公尺以上" value="1100" />
            </Picker>
            <Button
              mx={4}
              variant="solid"
              size="lg"
              style={{ backgroundColor: 'black' }}
              onPress={() => {
                setShowAltitude(false);
              }}>
              選擇
            </Button>
          </VStack>
        )}
        {showCrowded && (
          <VStack
            position="absolute"
            bg="white"
            bottom={0}
            left={0}
            w="100%"
            h="300"
            pb="30"
            shadow={2}
            zIndex={9}
            flex={1}
            justifyContent="center">
            <Picker
              mode="dialog"
              style={{ height: 100, flex: 1 }}
              accessibilityLabel="選擇擁擠程度"
              placeholder="選擇擁擠程度"
              selectedValue={crowded}
              onValueChange={(itemValue, itemIndex) => {
                setCrowded(itemValue);
              }}>
              <Picker.Item label="空曠" value="空曠" />
              <Picker.Item label="偶爾" value="偶爾" />
              <Picker.Item label="總是" value="總是" />
            </Picker>
            <Button
              mx={4}
              variant="solid"
              size="lg"
              style={{ backgroundColor: 'black' }}
              onPress={() => {
                setShowCrowded(false);
              }}>
              選擇
            </Button>
          </VStack>
        )}
        <HStack
          bg="coolGray.50"
          justifyContent="space-between"
          position="absolute"
          alignItems="center"
          left={0}
          top={0}
          w="100%"
          px={6}
          py={1}
          zIndex={8}>
          <TouchableOpacity
            onPress={() => {
              setShowFilterCondition(!showFilterCondition);
              setShowFilterTag(false);
              setShowFilterFacility(false);
              setShowLocationCard(false);
            }}>
            <HStack alignItems="center" py="1">
              <Text fontSize="sm" px="1">
                條件
              </Text>
              <Icon
                as={AntDesign}
                color={Colors.LOGO_COLOR_BROWN}
                name={showFilterCondition ? 'minuscircleo' : 'pluscircleo'}
                size={3}
              />
            </HStack>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowFilterTag(!showFilterTag);
              setShowFilterCondition(false);
              setShowFilterFacility(false);
              setShowLocationCard(false);
            }}>
            <HStack alignItems="center" py="1">
              <Text fontSize="sm" px="1">
                標籤
              </Text>
              <Icon
                as={AntDesign}
                color={Colors.LOGO_COLOR_BROWN}
                name={showFilterTag ? 'minuscircleo' : 'pluscircleo'}
                size={3}
              />
            </HStack>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowFilterFacility(!showFilterFacility);
              setShowFilterTag(false);
              setShowFilterCondition(false);
              setShowLocationCard(false);
            }}>
            <HStack alignItems="center" py="1">
              <Text fontSize="sm" px="1">
                設施
              </Text>
              <Icon
                as={AntDesign}
                color={Colors.LOGO_COLOR_BROWN}
                name={showFilterFacility ? 'minuscircleo' : 'pluscircleo'}
                size={3}
              />
            </HStack>
          </TouchableOpacity>
        </HStack>
        {showFilterCondition ? (
          <Box
            shadow={2}
            width="100%"
            py={4}
            px={{ base: 0, md: 0 }}
            pt={0}
            zIndex={2}
            position="absolute"
            alignItems="center"
            right={0}
            top={8}
            _light={{ bg: 'white' }}
            _dark={{ bg: 'coolGray.800' }}>
            <HStack space="2" justifyContent="space-between" alignItems="center">
              <VStack
                backgroundColor={Colors.LOGO_COLOR_WHITE_BACKGROUND}
                borderColor="coolGray.50"
                borderRadius="10"
                borderWidth="0"
                py="4"
                px="2"
                mx="1"
                my="2"
                w="44%">
                <Text
                  w="100%"
                  onPress={() => {
                    setShowCountry(!showCountry);
                    setShowAltitude(false);
                    setShowCrowded(false);
                  }}>
                  {country}
                </Text>
              </VStack>
              <VStack
                backgroundColor={Colors.LOGO_COLOR_WHITE_BACKGROUND}
                borderColor="coolGray.50"
                borderRadius="10"
                borderWidth="0"
                py="4"
                px="2"
                mx="1"
                my="2"
                w="44%">
                <Text
                  w="100%"
                  onPress={() => {
                    setShowAltitude(!showAltitude);
                    setShowCountry(false);
                    setShowCrowded(false);
                  }}>
                  {altitude}
                </Text>
              </VStack>
              {/*
              <Select
                selectedValue={country}
                minWidth="45%"
                accessibilityLabel="選擇縣市"
                placeholder="選擇縣市"
                _selectedItem={{
                  bg: 'coolGray.200',
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) => setCountry(itemValue)}>
                <Select.Item label="不限制縣市" value="" />
                <Select.Item label="台北市" value="台北" />
                <Select.Item label="新北市" value="新北" />
                <Select.Item label="桃園市" value="桃園" />
                <Select.Item label="台中市" value="台中" />
                <Select.Item label="台中市" value="台中" />
                <Select.Item label="待串接整合縣市" value="2" />
              </Select>
              <Select
                selectedValue={area}
                minWidth="45%"
                accessibilityLabel="選擇海拔"
                placeholder="選擇海拔"
                _selectedItem={{
                  bg: 'coolGray.200',
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) => setArea(itemValue)}>
                <Select.Item label="不限制海拔" value="" />
                <Select.Item label="海邊" value="海邊" />
                <Select.Item label="平地" value="平地" />
                <Select.Item label="300公尺以下" value="300" />
                <Select.Item label="300公尺~500公尺" value="500" />
                <Select.Item label="500公尺~800公尺" value="800" />
                <Select.Item label="800公尺~1000公尺" value="1000" />
                <Select.Item label="1000公尺以上" value="1100" />
              </Select>
              */}
            </HStack>
            <HStack space="2">
              <Select
                selectedValue={level}
                minWidth="45%"
                accessibilityLabel="選擇推薦程度"
                placeholder="選擇推薦程度"
                _selectedItem={{
                  bg: 'coolGray.200',
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) => setLevel(itemValue)}>
                <Select.Item label="不限制" value="0" />
                <Select.Item label="人氣推薦" value="1" />
                <Select.Item label="官方推薦" value="2" />
              </Select>
              <Select
                selectedValue={level}
                minWidth="45%"
                accessibilityLabel="選擇擁擠程度"
                placeholder="選擇擁擠程度"
                _selectedItem={{
                  bg: 'coolGray.200',
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) => setLevel(itemValue)}>
                <Select.Item label="空曠" value="0" />
                <Select.Item label="偶爾" value="1" />
                <Select.Item label="總是" value="2" />
              </Select>
            </HStack>
          </Box>
        ) : null}
        {showFilterTag ? (
          <Box
            shadow={2}
            width="100%"
            py={4}
            px={{ base: 0, md: 0 }}
            pt={0}
            zIndex={2}
            position="absolute"
            alignItems="center"
            right={0}
            top={8}
            _light={{ bg: 'white' }}
            _dark={{ bg: 'coolGray.800' }}>
            <HStack space="3" mt={3} alignItems="flex-start">
              {tags.map((item, index) => (
                <AddressBadge label={item.title} currentSelectedAddress={selectedAddress} />
              ))}
            </HStack>
          </Box>
        ) : null}
        {showFilterFacility ? (
          <Box
            shadow={2}
            width="100%"
            py={4}
            px={0}
            pt={0}
            zIndex={2}
            position="absolute"
            alignItems="center"
            right={0}
            top={8}
            _light={{ bg: 'white' }}
            _dark={{ bg: 'coolGray.800' }}>
            <VStack w="100%" px="2" pt="4">
              <HStack space={6} justifyContent="space-between" alignItems="center">
                <Stack flexWrap="wrap" direction="row" space="2">
                  <MasonryList
                    showsVerticalScrollIndicator={false}
                    numColumns={4}
                    data={icons}
                    renderItem={({ item }) => <FacilityCard item={item} />}
                    keyExtractor={(item: Offer, index: number) => 'key' + index}
                  />
                </Stack>
              </HStack>
            </VStack>
          </Box>
        ) : null}
        {/* ========= Map Part - Start ========= */}
        <MapView
          ref={mapRef}
          onPress={() => {
            Keyboard.dismiss();
            setShowFilterCondition(false);
            setShowFilterTag(false);
            setShowFilterFacility(false);
          }}
          style={{ flex: 1, minHeight: 700, height: '100%' }}
          provider={PROVIDER_GOOGLE}
          region={DEFAULT_MAPVIEW_REGION}
          onRegionChangeComplete={onRegionChangeComplete}
          showsUserLocation
          showsMyLocationButton={false}
          customMapStyle={mapStyle}>
          {locationList.map((location, index) => (
            <Marker
              key={location.id}
              identifier={'marker_' + location.id.toString()}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              onPress={() => {
                setShowLocationCard(true);
                panRef!.current!.scrollTo({ x: index * (screenWidth - 60), y: 0, animated: true });
              }}>
              <VStack alignItems="center">
                <Icon as={MaterialIcons} color={Colors.LOGO_COLOR_BROWN} name="place" size={6} />
                <VStack bg="#FFFFFFC0" borderRadius="xl" px="1" py="1">
                  <Text fontSize="xs" color={Colors.LOGO_COLOR_BROWN} textAlign="center">
                    海拔 {location.altitude} 公尺
                  </Text>
                  <Text fontSize="xs" color={Colors.LOGO_COLOR_BROWN} textAlign="center">
                    距離 1200 公尺
                  </Text>
                </VStack>
              </VStack>
            </Marker>
          ))}
        </MapView>
        {/* ========= Map Part - End ========= */}

        {/* ========= Pan Part - Start ========= */}
        <Box zIndex={showLocationCard ? 3 : -1} position="absolute" bottom={10} left={0} right={0}>
          <ScrollView
            ref={panRef}
            horizontal
            snapToInterval={screenWidth - 60}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const positionX = event.nativeEvent.contentOffset.x;
              const snapWidth = screenWidth - 60;
              const which = Math.round(positionX / snapWidth);
              // console.log('width: ' + snapWidth + ', which: ' + which + ', x: ' + positionX);
              const markers = [
                {
                  latitude: locationList[which].latitude,
                  longitude: locationList[which].longitude,
                },
              ];
              const region = getRegionFromMarkers(markers);
              mapRef!.current!.animateToRegion(region, 300);
            }}>
            <HStack space={5} alignItems="flex-start" mx={5} mb={0}>
              {locationList.map((props, index) => (
                <Pressable
                  key={'location' + index}
                  onPress={() => navigation.navigate(MAIN_STACK_LOCATION_DETAILS)}>
                  <Box
                    shadow={2}
                    borderRadius="2xl"
                    bgColor="white"
                    key={'pan_' + props.id}
                    height={220}
                    width={screenWidth - 80}>
                    <Box>
                      <Image
                        borderTopLeftRadius="20"
                        borderTopRightRadius="20"
                        source={{ uri: props.image }}
                        alt="image"
                        width="100%"
                        height="120"
                        resizeMode="cover"
                      />
                      <HStack
                        position="absolute"
                        bottom="0"
                        left="0"
                        pl="4"
                        pb="1"
                        width="100%"
                        bg="#00000060">
                        {props.tags.map((item, tags_index) => (
                          <Box
                            shadow="2"
                            borderWidth="1"
                            borderColor="coolGray.300"
                            borderRadius="xl"
                            mr="1"
                            mt="2"
                            my="1"
                            px="2"
                            py="1"
                            key={'location' + index + '.tag' + tags_index}>
                            <Text fontSize="xs" fontWeight="normal" color="white">
                              {item.title}
                            </Text>
                          </Box>
                        ))}
                      </HStack>
                    </Box>
                    <HStack flex={1} pt="1">
                      <VStack pt="2" px={4} flex={1} width="80%">
                        <Text
                          mt="0"
                          fontSize="lg"
                          fontWeight="medium"
                          _light={{ color: 'coolGray.900' }}
                          _dark={{ color: 'coolGray.400' }}>
                          {props.title}
                        </Text>
                        <Text color={Colors.LOGO_COLOR_BROWN}>海拔 {props.altitude} 公尺</Text>
                        <Text color={Colors.LOGO_COLOR_BROWN}>距離 123 公里</Text>
                      </VStack>
                      <VStack pt="2" pr="4" flex={1} alignItems="flex-end">
                        <TouchableOpacity
                          onPress={() => navigation.navigate(MAIN_STACK_CREATE_POST_WITH_LOCATION)}>
                          <Center
                            _light={{ bg: Colors.THEME_MAIN_BACKGROUND }}
                            _dark={{ bg: 'coolGray.700' }}
                            rounded="full"
                            w="9"
                            h="9"
                            textAlign="center"
                            alignItems="center"
                            justifyContent="center">
                            <IconButton
                              variant="unstyled"
                              colorScheme="light"
                              mx="0"
                              my="0"
                              ml="0"
                              px="0"
                              py="0"
                              icon={
                                <Icon
                                  size="5"
                                  name="md-golf-outline"
                                  as={Ionicons}
                                  _dark={{
                                    color: 'coolGray.200',
                                  }}
                                  _light={{
                                    color: Colors.LOGO_COLOR_BROWN,
                                  }}
                                />
                              }
                            />
                          </Center>
                          <Text textAlign="center" mt="1">
                            打卡
                          </Text>
                        </TouchableOpacity>
                      </VStack>
                    </HStack>
                  </Box>
                </Pressable>
              ))}
            </HStack>
          </ScrollView>
        </Box>
        {/* ========= Pan Part - End ========= */}
        <VStack space="3" position="absolute" top="10%" right="0" mt="0" mr="4">
          <TouchableOpacity onPress={() => navigation.navigate(MAIN_STACK_CREATE_LOCATION)}>
            <Center
              p="2"
              textAlign="center"
              alignItems="center"
              justifyContent="center"
              bg={Colors.LOGO_COLOR_GREEN}
              rounded="full">
              <Icon size="4" name="plus" as={AntDesign} color="white" />
            </Center>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              toast.show({
                description: '位置更新中',
              });
              const location = await ExpoLocation.getCurrentPositionAsync({});
              mapRef!.current!.animateToRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
            }}>
            <Center
              p="2"
              textAlign="center"
              alignItems="center"
              justifyContent="center"
              bg={Colors.LOGO_COLOR_GREEN}
              rounded="full">
              <Icon size="4" name="enviroment" as={AntDesign} color="white" />
            </Center>
          </TouchableOpacity>
        </VStack>
        {/*
        <Fab
          position="absolute"
          bottom={0}
          height={12}
          renderInPortal={false}
          bg={Colors.LOGO_COLOR_BROWN}
          colorScheme="light"
          shadow={2}
          size="sm"
          onPress={() => navigation.navigate(MAIN_STACK_CREATE_POST)}
          icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />}
        />
        */}
      </Box>
    </DashboardLayout>
  );
}
