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
  useBreakpointValue,
  FlatList,
  ScrollView,
  Divider,
  Image,
  Card,
} from 'native-base';
import React, { useState } from 'react';
import { ImageSourcePropType, Platform, useWindowDimensions } from 'react-native';

import { NavigationProps } from '../../Props';
import { Carousel } from '../../components/Carousel';
import LocationList from '../../components/explore/LocationList';
import PostsList from '../../components/home/PostsList';
import Colors from '../../constants/Colors';
import DashboardLayout from '../../layouts/DashboardLayout';

type ProductProps = {
  imageUri: ImageSourcePropType;
  title: string;
  description: string;
  number: string;
};

const itemList: ProductProps[] = [
  {
    imageUri: require('../../assets/images/views/view_9.jpg'),
    title: 'HERE&NOW',
    description: '秘境分享',
    number: '200',
  },
  {
    imageUri: require('../../assets/images/views/view_3.jpg'),
    title: 'Marks & Spencer',
    description: '達成第 20 露啦',
    number: '639',
  },
  {
    imageUri: require('../../assets/images/views/view_7.jpg'),
    title: 'CENWELL',
    description: '動態內容',
    number: '399',
  },
  {
    imageUri: require('../../assets/images/views/view_4.jpg'),
    title: 'U.S. Polo Assn. Kids',
    description: '動態內容',
    number: '849',
  },
  {
    imageUri: require('../../assets/images/views/view_2.jpg'),
    title: 'Cherry Crumble',
    description: '動態內容',
    number: '899',
  },
  {
    imageUri: require('../../assets/images/views/view_1.jpg'),
    title: 'BonOrganik',
    description: '動態內容',
    number: '259',
  },
  {
    imageUri: require('../../assets/images/views/view_9.jpg'),
    title: 'HERE&NOW',
    description: '秘境分享',
    number: '200',
  },
  {
    imageUri: require('../../assets/images/views/view_3.jpg'),
    title: 'Marks & Spencer',
    description: '達成第 20 露啦',
    number: '639',
  },
  {
    imageUri: require('../../assets/images/views/view_7.jpg'),
    title: 'CENWELL',
    description: '動態內容',
    number: '399',
  },
  {
    imageUri: require('../../assets/images/views/view_4.jpg'),
    title: 'U.S. Polo Assn. Kids',
    description: '動態內容',
    number: '849',
  },
  {
    imageUri: require('../../assets/images/views/view_2.jpg'),
    title: 'Cherry Crumble',
    description: '動態內容',
    number: '899',
  },
  {
    imageUri: require('../../assets/images/views/view_1.jpg'),
    title: 'BonOrganik',
    description: '動態內容',
    number: '259',
  },
];

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
  type CarousalTye = {
    imageUri: ImageSourcePropType;
    name: string;
  };
  const trending: CarousalTye[] = [
    {
      imageUri: require('../../assets/images/views/view_9.jpg'),
      name: 'Story Seeds',
    },
    {
      imageUri: require('../../assets/images/views/view_9.jpg'),
      name: 'Dare to lead',
    },
    {
      imageUri: require('../../assets/images/views/view_9.jpg'),
      name: 'Artificial Intelligence',
    },
    {
      imageUri: require('../../assets/images/views/view_9.jpg'),
      name: 'Angular',
    },
    {
      imageUri: require('../../assets/images/views/view_9.jpg'),
      name: 'AR/VR',
    },
  ];

  function MainPostList() {
    const noColumn = useBreakpointValue({
      base: 2,
      sm: 3,
      md: 3,
      lg: 5,
      xl: 5,
    });
    const { height } = useWindowDimensions();
    return (
      <Box
        px={{ base: 2.5, md: '22' }}
        py={{ base: '14', md: '22' }}
        rounded={{ md: 'sm' }}
        _light={{ bg: 'white' }}
        _dark={{ bg: 'coolGray.800' }}
        alignItems="center">
        <FlatList
          nestedScrollEnabled
          numColumns={noColumn}
          data={itemList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <Card {...item} />}
          key={noColumn}
          keyExtractor={(item, index) => 'key' + index}
        />
        <Text>元件載入有問題</Text>
      </Box>
    );
  }

  function Carousal({ itemList, heading }: { itemList: CarousalTye[]; heading: string }) {
    const Separator = () => <Box w="4" flex="1" />;
    return (
      <VStack space={4} mt={5}>
        <HStack justifyContent="space-between" px={{ base: 4, md: 8 }}>
          <Text
            fontSize="md"
            fontWeight="bold"
            _dark={{ color: 'coolGray.50' }}
            _light={{ color: 'coolGray.800' }}>
            {heading}
          </Text>
          <Pressable>
            <Text
              _dark={{ color: 'primary.500' }}
              _light={{ color: 'primary.900' }}
              fontSize="sm"
              fontWeight="medium">
              檢視更多
            </Text>
          </Pressable>
        </HStack>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          px={{ base: 4, md: 8 }}
          mr={{ base: 4, md: 0 }}
          data={itemList}
          keyExtractor={(_, index) => `trending-${index}`}
          ItemSeparatorComponent={Separator}
          renderItem={({ item }) => (
            <Pressable borderRadius="sm">
              <Image
                borderTopRadius="sm"
                source={item.imageUri}
                alt={item.name}
                w={{ base: 192, md: 224 }}
                h={112}
              />
            </Pressable>
          )}
        />
      </VStack>
    );
  }

  function Tab_1() {
    return (
      <>
        <Carousal itemList={trending} heading="推薦" />
        <ScrollView py={4}>
          <MainPostList />
        </ScrollView>
      </>
    );
  }
  function Tab_2() {
    return (
      <ScrollView py={4}>
        <Text>元件載入有問題</Text>
      </ScrollView>
    );
  }
  function Tab_3() {
    return (
      <ScrollView py={4}>
        <Text>元件載入有問題</Text>
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

  const CarouselLayout = () => {
    const noColumn = useBreakpointValue({
      base: 2,
      sm: 3,
      md: 3,
      lg: 5,
      xl: 5,
    });

    return (
      <Box
        px={{ base: '0', md: 0 }}
        py={{ base: '0', md: 0 }}
        _light={{ bg: 'transparent' }}
        _dark={{ bg: 'transparent' }}
        height={{ base: 40, md: 20 }}>
        <FlatList
          horizontal
          numColumns={noColumn}
          data={itemList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <VStack>
              <Image source={item.imageUri} />
              <Text>{item.description}</Text>
            </VStack>
          )}
          key={noColumn}
          keyExtractor={(item, index) => 'key' + index}
        />
      </Box>
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
