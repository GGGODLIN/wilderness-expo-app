import { MaterialIcons, FontAwesome, AntDesign, Ionicons } from '@expo/vector-icons';
import * as ExpoLocation from 'expo-location';
import {
  Button,
  HStack,
  Text,
  Icon,
  Input,
  Pressable,
  Box,
  Divider,
  IconButton,
  Image,
  Fab,
  VStack,
  Center,
} from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, Dimensions, ScrollView, PermissionsAndroid } from 'react-native';
import MapView, { AnimatedRegion, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';

import {
  MAIN_STACK_LOCATION_DETAILS,
  MAIN_STACK_CREATE_POST,
  MAIN_STACK_CREATE_LOCATION,
} from '../../../NavigationNames';
import { NavigationProps } from '../../../Props';
import Colors from '../../../constants/Colors';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { getRegionFromMarkers } from '../../../utils/MapUtils';

const locationList = [
  {
    id: 1,
    image:
      'https://storage.googleapis.com/smiletaiwan-cms-cwg-tw/article/202003/article-5e6b3844e5039.jpg',
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
    image:
      'https://storage.googleapis.com/smiletaiwan-cms-cwg-tw/article/202003/article-5e6b3844e5039.jpg',
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
    image:
      'https://storage.googleapis.com/smiletaiwan-cms-cwg-tw/article/202003/article-5e6b3844e5039.jpg',
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
    image:
      'https://storage.googleapis.com/smiletaiwan-cms-cwg-tw/article/202003/article-5e6b3844e5039.jpg',
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
    image:
      'https://storage.googleapis.com/smiletaiwan-cms-cwg-tw/article/202003/article-5e6b3844e5039.jpg',
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
    image:
      'https://storage.googleapis.com/smiletaiwan-cms-cwg-tw/article/202003/article-5e6b3844e5039.jpg',
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

export default function MainTabExploreScreen({ navigation }: NavigationProps): JSX.Element {
  const [showLocationCard, setShowLocationCard] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('Home');
  const [mapErrorMsg, setMapErrorMsg] = useState<string | null>(null);
  const screenWidth = Dimensions.get('screen').width;
  const mapRef = useRef<MapView | null>(null);
  const panRef = useRef<ScrollView | null>(null);

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
        px={8}
        py={3}
        borderWidth={1}
        onPress={() => {
          setSelectedAddress(label);
        }}
        _light={{
          bg: currentSelectedAddress === label ? 'amber.100' : 'transparent',
          borderColor: currentSelectedAddress === label ? 'amber.100' : 'coolGray.300',
          _pressed: { bg: 'amber.100' },
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

  function CustomTitle() {
    return (
      <HStack alignItems="flex-start" justifyContent="space-between">
        <Input
          borderWidth={1}
          py={2}
          my={1}
          mb={2}
          mx={2}
          borderRadius="2xl"
          bg="white"
          variant="unstyled"
          value={textInput}
          onPress={() => {
            setShowLocationCard(false);
            setShowFilter(true);
          }}
          onFocus={() => {
            setShowLocationCard(false);
            setShowFilter(true);
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
                setShowFilter(false);
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

  return (
    <DashboardLayout title="活動" customTitle={<CustomTitle />}>
      <Box px={{ md: 8, xl: 35 }} py={{ md: 5 }} flex={1}>
        {showFilter ? (
          <Box
            width="100%"
            py={4}
            px={{ base: 0, md: 0 }}
            pt={4}
            zIndex={2}
            position="absolute"
            alignItems="center"
            right={0}
            top={0}
            _light={{ bg: 'white' }}
            _dark={{ bg: 'coolGray.800' }}>
            <HStack alignItems="center" mx="3">
              <Text
                fontWeight="normal"
                _light={{ color: 'coolGray.900' }}
                _dark={{ color: 'coolGray.50' }}
                my={0}
                lineHeight="24">
                分類 (元件單選，大分類，下拉或橫轉)
              </Text>
              <Divider
                ml={2}
                mr={0}
                _light={{ bg: 'coolGray.200' }}
                _dark={{ bg: 'coolGray.700' }}
                flex={1}
              />
            </HStack>
            <HStack space="3" mt={3} alignItems="flex-start">
              <AddressBadge label="車泊" currentSelectedAddress={selectedAddress} />
              <AddressBadge label="SUP" currentSelectedAddress={selectedAddress} />
              <AddressBadge label="親子活動" currentSelectedAddress={selectedAddress} />
            </HStack>
            <HStack alignItems="center" mx="3" mt="2">
              <Text
                fontWeight="normal"
                _light={{ color: 'coolGray.900' }}
                _dark={{ color: 'coolGray.50' }}
                my={0}
                lineHeight="24">
                其他篩選元件弄好一起顯示
              </Text>
              <Divider
                ml={2}
                mr={0}
                _light={{ bg: 'coolGray.200' }}
                _dark={{ bg: 'coolGray.700' }}
                flex={1}
              />
            </HStack>
            <Button
              width="80%"
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
        {/* ========= Map Part - Start ========= */}
        <MapView
          ref={mapRef}
          onPress={() => {
            Keyboard.dismiss();
            setShowFilter(false);
          }}
          style={{ flex: 1, minHeight: 700, height: '100%' }}
          provider={PROVIDER_GOOGLE}
          region={DEFAULT_MAPVIEW_REGION}
          onRegionChangeComplete={onRegionChangeComplete}
          showsUserLocation
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
                <Icon as={MaterialIcons} color={Colors.LOGO_COLOR_BROWN} name="place" size={10} />
                <Text shadow="2" fontSize="xs" color={Colors.LOGO_COLOR_BROWN} textAlign="center">
                  海拔 {location.altitude} 公尺
                </Text>
                <Text shadow="2" fontSize="xs" color={Colors.LOGO_COLOR_BROWN} textAlign="center">
                  距離 1200 公尺
                </Text>
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
            <HStack space={5} alignItems="flex-start" mx={10} mb={0}>
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
                        borderTopLeftRadius="30"
                        borderTopRightRadius="30"
                        source={{ uri: props.image }}
                        alt="image"
                        width="100%"
                        height="120"
                        resizeMode="cover"
                      />
                      <HStack position="absolute" bottom="2" left="3">
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
                    <HStack flex={1}>
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
                      <VStack>
                        <Pressable
                          mt="2"
                          mr="2"
                          onPress={() => navigation.navigate(MAIN_STACK_CREATE_POST)}
                          flex={1}>
                          <Center
                            _light={{ bg: Colors.LOGO_COLOR_WHITE_BACKGROUND }}
                            _dark={{ bg: 'coolGray.700' }}
                            rounded="full"
                            w="12"
                            h="12"
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
                                  size="6"
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
                          <Text textAlign="center">打卡</Text>
                        </Pressable>
                      </VStack>
                    </HStack>
                  </Box>
                </Pressable>
              ))}
            </HStack>
          </ScrollView>
        </Box>
        {/* ========= Pan Part - End ========= */}
        <VStack space="3" position="absolute" top="10" right="0" mt="2" mr="2">
          <Pressable shadow="2" onPress={() => navigation.navigate(MAIN_STACK_CREATE_LOCATION)}>
            <Center
              _light={{ bg: Colors.LOGO_COLOR_GREEN }}
              _dark={{ bg: 'coolGray.700' }}
              rounded="full"
              w="10"
              h="10"
              textAlign="center"
              alignItems="center"
              justifyContent="center">
              <IconButton
                variant="unstyled"
                colorScheme="light"
                mx="0"
                my="0"
                pl="0"
                px="0"
                py="0"
                icon={<Icon size="5" name="md-add" as={Ionicons} color="white" />}
              />
            </Center>
          </Pressable>
          <Pressable shadow="2" onPress={() => undefined}>
            <Center
              _light={{ bg: Colors.LOGO_COLOR_GREEN }}
              _dark={{ bg: 'coolGray.700' }}
              rounded="full"
              w="10"
              h="10"
              textAlign="center"
              alignItems="center"
              justifyContent="center">
              <IconButton
                variant="unstyled"
                colorScheme="light"
                mx="0"
                my="0"
                px="0"
                py="0"
                icon={<Icon size="5" name="md-navigate-outline" as={Ionicons} color="white" />}
              />
            </Center>
          </Pressable>
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
