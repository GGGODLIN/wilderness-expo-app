import { MaterialIcons, Ionicons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import {
  HStack,
  Text,
  Icon,
  Pressable,
  Box,
  Center,
  Stack,
  VStack,
  ScrollView,
  Image,
  Divider,
  Progress,
  IconButton,
  useToast,
  Input,
} from 'native-base';
import React, { useState } from 'react';
import { Keyboard, Dimensions, TouchableOpacity, View, PanResponder } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { SwipeListView } from 'react-native-swipe-list-view';

import {
  MAIN_STACK_LOCATION_DETAILS,
  MAIN_STACK_POST,
  MAIN_STACK_CREATE_EQUIPMENT,
} from '../../../NavigationNames';
import { NavigationProps } from '../../../Props';
import Colors from '../../../constants/Colors';
import DashboardLayout from '../../../layouts/DashboardLayout';

type Content = {
  imageUri: string;
  itemName: string;
  itemCompany: string;
  description: string;
  discountedPrice: string;
  actualPrice: string;
  Progress: number;
};

type MobileIcon = {
  iconName: string;
  iconText: string;
};
const trendingContentList: Content[] = [
  {
    imageUri: 'https://picsum.photos/200',
    itemName: '好野人',
    itemCompany: 'BABY GROW',
    description: '達到露營 100 次',
    discountedPrice: '$5,53,000',
    actualPrice: '5,000',
    Progress: 100,
  },
  {
    imageUri: 'https://picsum.photos/200',
    itemName: '企鵝王',
    itemCompany: 'YK',
    description: '達到滑水 100 次',
    discountedPrice: '$5,53,000',
    actualPrice: '5,000',
    Progress: 50,
  },
  {
    imageUri: 'https://picsum.photos/200',
    itemName: '街頭霸王',
    itemCompany: 'YK',
    description: '達到車泊 100 次',
    discountedPrice: '$5,53,000',
    actualPrice: '5,000',
    Progress: 90,
  },
];

export default function CollectionScreen({ navigation }: NavigationProps): JSX.Element {
  const [textInput, setTextInput] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('Home');

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
      title: '這個月內的活動',
      description: '待決定圖片與內頁排版',
      status: { type: true, time: '2022-10-08 05:38 pm' },
    },
    {
      title: '這個月內的活動',
      description: '待決定圖片與內頁排版',
      status: { type: true, time: '2022-10-08 05:38 pm' },
    },
    {
      title: '超出這個月的活動',
      description: '待決定圖片與內頁排版',
      status: { type: false, time: '2022-10-08 05:38 pm' },
    },
    {
      title: '陽明山三天兩夜',
      description: '待決定圖片與內頁排版',
      status: { type: false, time: '2022-10-08 05:38 pm' },
    },
    {
      title: '陽明山三天兩夜',
      description: '待決定圖片與內頁排版',
      status: { type: false, time: '2022-10-08 05:38 pm' },
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
      <Pressable onPress={() => navigation.navigate(MAIN_STACK_POST)}>
        <HStack justifyContent="flex-start" space="4" key={key} px="2">
          <VStack>
            <TrackingIcon
              IconColorLight={status.type ? Colors.LOGO_COLOR_BROWN : 'coolGray.200'}
              IconColorDark={status.type ? 'primary.500' : 'coolGray.400'}
            />
            <Divider
              orientation="vertical"
              _light={{ bg: status.type ? Colors.LOGO_COLOR_BROWN : 'coolGray.200' }}
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
          <Image
            mb="2"
            w="20"
            h="16"
            source={{ uri: 'https://picsum.photos/200' }}
            alt="Alternate Text"
            resizeMode="cover"
          />
        </HStack>
      </Pressable>
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

  function TrendingFundraisersCard(props: { item: Content }) {
    return (
      <Pressable
        borderRadius="lg"
        _light={{
          bg: props.item.Progress == 100 ? Colors.THEME_MAIN_BACKGROUND : 'coolGray.50',
        }}
        _dark={{ bg: 'coolGray.700' }}
        w="100%"
        mb={2}>
        <Box borderRadius="lg">
          <VStack p={3} space={2}>
            <Text
              fontSize="sm"
              fontWeight="medium"
              _light={{
                color: props.item.Progress == 100 ? Colors.LOGO_COLOR_BROWN : 'coolGray.800',
              }}
              _dark={{ color: 'coolGray.50' }}>
              {props.item.itemName}
              {props.item.Progress == 100 && ' (已獲得)'}
            </Text>

            <Progress
              value={props.item.Progress}
              _light={{ bg: Colors.THEME_MAIN_BACKGROUND }}
              _dark={{ bg: 'coolGray.500' }}
              _filledTrack={{ bg: Colors.LOGO_COLOR_BROWN }}
            />

            <HStack alignItems="center" justifyContent="space-between">
              <Text
                fontSize="xs"
                fontWeight="medium"
                _light={{ color: 'coolGray.500' }}
                _dark={{ color: 'coolGray.400' }}>
                {props.item.description}
              </Text>
              {props.item.Progress == 100 && <Text>選擇</Text>}
            </HStack>
          </VStack>
        </Box>
      </Pressable>
    );
  }

  type EquipmentProps = {
    id: number;
    imageUri: string;
    brand: string;
    category: string;
    title: string;
    price: string;
    date: string;
  };
  const equipmentData = [
    {
      id: 1,
      imageUri: 'https://picsum.photos/200',
      brand: 'SnowPeak',
      category: '露營',
      title: '精靈帳',
      price: '$300',
      date: '2000-01-01',
    },
    {
      id: 2,
      imageUri: 'https://picsum.photos/200',
      brand: 'SnowPeak',
      category: '露營',
      title: '天幕',
      price: '$300',
      date: '2000-01-01',
    },
    {
      id: 3,
      imageUri: 'https://picsum.photos/200',
      brand: 'SnowPeak',
      category: '露營',
      title: '桌子',
      price: '$300',
      date: '2000-01-01',
    },
    {
      id: 4,
      imageUri: 'https://picsum.photos/200',
      brand: 'SnowPeak',
      category: '釣魚',
      title: '冰桶',
      price: '$300',
      date: '2000-01-01',
    },
    {
      id: 5,
      imageUri: 'https://picsum.photos/200',
      brand: '品牌',
      category: '分類',
      title: '圖片待用多組輪播',
      price: '這裡是購入金額',
      date: '這裡是購入日期',
    },
  ];

  function EquipmentCard(props: { item: EquipmentProps }) {
    const [selectState, setSelectState] = useState(false);

    return (
      <HStack
        rounded="10"
        px="2"
        py="2"
        mb="2"
        key={'equip_' + props.item.id}
        bg={selectState ? Colors.LOGO_COLOR_WHITE_BACKGROUND : 'white'}>
        <VStack w="80%">
          <Pressable onPress={() => setSelectState(!selectState)}>
            <Text fontSize="sm" color={Colors.LOGO_COLOR_GREEN}>
              {props.item.category}。{props.item.brand}
            </Text>
            <Text fontSize="xl" color={Colors.LOGO_COLOR_BROWN}>
              {props.item.title}
            </Text>
            <Text fontSize="xs" color="coolGray.400">
              金額: {props.item.price}
            </Text>
            <Text fontSize="xs" color="coolGray.400">
              日期: {props.item.date}
            </Text>
          </Pressable>
        </VStack>
        <VStack w="20%">
          <Pressable onPress={() => setSelectState(!selectState)}>
            <Image
              rounded="10"
              source={{ uri: props.item.imageUri }}
              alt="image"
              width="100%"
              height="70"
              resizeMode="cover"
            />
          </Pressable>
        </VStack>
      </HStack>
    );
  }
  const toast = useToast();
  const onSwipeValueChange = (swipeData: { key: any; value: any }) => {
    const { key, value } = swipeData;
    if (value >= 75) {
      navigation.navigate(MAIN_STACK_CREATE_EQUIPMENT);
    }
    if (value <= -75) {
      toast.show({
        description: '詢問是否刪除',
      });
    }
  };

  function Tab_1() {
    return (
      <ScrollView py={4} px={6}>
        <VStack space={5} alignItems="center">
          {locationList.map((props, index) => (
            <Pressable
              key={'location' + index}
              onPress={() => navigation.navigate(MAIN_STACK_LOCATION_DETAILS)}
              width="100%">
              <Box
                borderRadius="2xl"
                bgColor="white"
                key={'pan_' + props.id}
                height={220}
                width="100%">
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
                <HStack flex={1} pt="1" bg="coolGray.50" borderBottomRadius={20}>
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
        </VStack>
      </ScrollView>
    );
  }
  function Tab_2() {
    return (
      <ScrollView py={4} px={4}>
        <Tracking />
      </ScrollView>
    );
  }
  function Tab_3() {
    const [country, setCountry] = React.useState('請選擇分類');
    return (
      <VStack py={2} px={6}>
        <HStack justifyContent="space-between">
          <Stack
            alignItems="flex-start"
            justifyContent="center"
            width="28%"
            backgroundColor={Colors.LOGO_COLOR_WHITE_BACKGROUND}
            borderColor="coolGray.50"
            borderRadius="10"
            borderWidth="0"
            pl="3"
            my="2"
            height="8">
            <RNPickerSelect
              placeholder={{}}
              textInputProps={{ fontSize: 14, color: 'coolGray.400' }}
              value={country}
              onValueChange={(itemValue) => setCountry(itemValue)}
              items={[
                { label: '分類', value: '' },
                { label: '露營', value: '露營' },
                { label: '車泊', value: '車泊' },
                { label: '水上活動', value: '水上活動' },
                { label: '釣魚', value: '釣魚' },
                { label: '登山', value: '登山' },
                { label: '生存', value: '生存' },
                { label: '其他', value: '其他' },
              ]}
            />
          </Stack>
          <VStack width="60%">
            <Input
              isRequired
              backgroundColor={Colors.LOGO_COLOR_WHITE_BACKGROUND}
              borderColor="coolGray.50"
              borderRadius="10"
              borderWidth="0"
              py="2"
              my="2"
              placeholder="搜尋..."
              size="lg"
            />
          </VStack>
          <VStack width="10%" alignItems="center" justifyContent="center">
            <TouchableOpacity onPress={() => navigation.navigate(MAIN_STACK_CREATE_EQUIPMENT)}>
              <Icon size="6" as={MaterialIcons} name="add" color={Colors.LOGO_COLOR_GREEN} />
            </TouchableOpacity>
          </VStack>
        </HStack>
        <SwipeListView
          data={equipmentData}
          renderItem={({ item }) => <EquipmentCard item={item} />}
          renderHiddenItem={(data, rowMap) => (
            <HStack justifyContent="space-between" h="100%">
              <VStack alignItems="center" justifyContent="center">
                <Stack alignItems="center" justifyContent="center">
                  <Icon size="6" as={MaterialIcons} name="create" color={Colors.LOGO_COLOR_WHITE} />
                  <Text color={Colors.LOGO_COLOR_WHITE}>編輯</Text>
                </Stack>
              </VStack>
              <VStack alignItems="center" justifyContent="center">
                <Stack alignItems="center" justifyContent="center">
                  <Icon
                    size="6"
                    as={MaterialIcons}
                    name="delete-outline"
                    color={Colors.LOGO_COLOR_WHITE}
                  />
                  <Text color={Colors.LOGO_COLOR_WHITE}>刪除</Text>
                </Stack>
              </VStack>
            </HStack>
          )}
          leftOpenValue={30}
          rightOpenValue={-30}
          onSwipeValueChange={onSwipeValueChange}
        />
        {/*
          <MasonryList
            showsVerticalScrollIndicator={false}
            numColumns={1}
            data={equipmentData}
            renderItem={({ item }) => <EquipmentCard item={item} />}
            keyExtractor={(item: Offer, index: number) => 'key' + index}
          />
            */}
      </VStack>
    );
  }
  function Tab_4() {
    return (
      <ScrollView py={4}>
        <VStack mx="4" px={{ md: 2 }} space={0} mt="3" alignItems="center">
          {trendingContentList.map((item, index) => {
            return <TrendingFundraisersCard key={index} item={item} />;
          })}
        </VStack>
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
      title: '裝備管理',
      component: <Tab_3 />,
    },
    {
      id: 4,
      title: '成就稱號',
      component: <Tab_4 />,
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
          paddingX={2}
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
              bg: Colors.THEME_MAIN_BACKGROUND,
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
    const [tabName, setTabName] = React.useState(tabs[2].title);
    const [tabChildren, setTabChildren] = useState<React.ReactNode>(tabs[2].component);
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
      <Stack flex={1} _light={{ bg: Colors.THEME_MAIN_BACKGROUND }} _dark={{ bg: 'coolGray.800' }}>
        <Box
          pt={5}
          px={{ md: 8, xl: 35 }}
          py={{ md: 8 }}
          flex={1}
          _light={{ bg: 'white' }}
          _dark={{ bg: 'coolGray.800' }}
          bg="white"
          borderTopLeftRadius="20"
          borderTopRightRadius="20">
          <VStack space="5">
            <Tabs />
          </VStack>
        </Box>
      </Stack>
    </DashboardLayout>
  );
}
