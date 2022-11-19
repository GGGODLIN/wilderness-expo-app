import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import MasonryList from '@react-native-seoul/masonry-list';
import {
  HStack,
  Text,
  Icon,
  Pressable,
  Box,
  Center,
  Stack,
  VStack,
  Fab,
  useBreakpointValue,
  FlatList,
  ScrollView,
  Image,
  Avatar,
  IconButton,
} from 'native-base';
import React, { useState } from 'react';
import { ImageSourcePropType, Platform, useWindowDimensions, TouchableOpacity } from 'react-native';

import { MAIN_STACK_CREATE_POST, MAIN_STACK_POST } from '../../../NavigationNames';
import { NavigationProps } from '../../../Props';
import Colors from '../../../constants/Colors';
import DashboardLayout from '../../../layouts/DashboardLayout';

type PostProps = {
  imageRes: string;
  imageUri: ImageSourcePropType;
  title: string;
  description: string;
  number: string;
};

const itemList: PostProps[] = [
  {
    imageRes: 'https://picsum.photos/200',
    imageUri: require('../../../assets/images/views/view_9.jpg'),
    title: 'HERE&NOW',
    description: '秘境分享\n第二行\n第三行',
    number: '200',
  },
  {
    imageRes: 'https://picsum.photos/200',
    imageUri: require('../../../assets/images/views/view_3.jpg'),
    title: 'Marks & Spencer',
    description: '達成第 20 露啦',
    number: '639',
  },
  {
    imageRes: 'https://picsum.photos/200',
    imageUri: require('../../../assets/images/views/view_7.jpg'),
    title: 'CENWELL',
    description: '動態內容動態內容動態內容動態內容動態內容動態內容',
    number: '399',
  },
  {
    imageRes: 'https://picsum.photos/200',
    imageUri: require('../../../assets/images/views/view_4.jpg'),
    title: 'U.S. Polo Assn. Kids',
    description: '動態內容',
    number: '849',
  },
  {
    imageRes: 'https://picsum.photos/200',
    imageUri: require('../../../assets/images/views/view_2.jpg'),
    title: 'Cherry Crumble',
    description: '動態內容',
    number: '899',
  },
  {
    imageRes: 'https://picsum.photos/200',
    imageUri: require('../../../assets/images/views/view_1.jpg'),
    title: 'BonOrganik',
    description: '動態內容',
    number: '259',
  },
  {
    imageRes: 'https://picsum.photos/200',
    imageUri: require('../../../assets/images/views/view_9.jpg'),
    title: 'HERE&NOW',
    description: '秘境分享',
    number: '200',
  },
  {
    imageRes: 'https://picsum.photos/200',
    imageUri: require('../../../assets/images/views/view_3.jpg'),
    title: 'Marks & Spencer',
    description: '達成第 20 露啦',
    number: '639',
  },
  {
    imageRes: 'https://picsum.photos/200',
    imageUri: require('../../../assets/images/views/view_7.jpg'),
    title: 'CENWELL',
    description: '動態內容',
    number: '399',
  },
  {
    imageRes: 'https://picsum.photos/200',
    imageUri: require('../../../assets/images/views/view_4.jpg'),
    title: 'U.S. Polo Assn. Kids',
    description: '動態內容',
    number: '849',
  },
  {
    imageRes: 'https://picsum.photos/200',
    imageUri: require('../../../assets/images/views/view_2.jpg'),
    title: 'Cherry Crumble',
    description: '動態內容',
    number: '899',
  },
  {
    imageRes: 'https://picsum.photos/200',
    imageUri: require('../../../assets/images/views/view_1.jpg'),
    title: 'BonOrganik',
    description: '動態內容',
    number: '259',
  },
  {
    imageRes: 'https://picsum.photos/200',
    imageUri: require('../../../assets/images/views/view_7.jpg'),
    title: 'CENWELL',
    description: '動態內容',
    number: '399',
  },
  {
    imageRes: 'https://picsum.photos/200',
    imageUri: require('../../../assets/images/views/view_4.jpg'),
    title: 'U.S. Polo Assn. Kids',
    description: '動態內容',
    number: '849',
  },
  {
    imageRes: 'https://picsum.photos/200',
    imageUri: require('../../../assets/images/views/view_2.jpg'),
    title: 'Cherry Crumble',
    description: '動態內容',
    number: '899',
  },
  {
    imageRes: 'https://picsum.photos/200',
    imageUri: require('../../../assets/images/views/view_1.jpg'),
    title: 'BonOrganik',
    description: '動態內容',
    number: '259',
  },
];
export default function CommunityScreen({ navigation }: NavigationProps): JSX.Element {
  const [textInput, setTextInput] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('Home');

  const locationList = [
    {
      id: 1,
      chapter: '南投縣',
      name: '露營地ABC',
      imageUri: require('../../../assets/images/views/view_1.jpg'),
    },
    {
      id: 2,
      chapter: '南投縣',
      name: '露營地ABC',
      imageUri: require('../../../assets/images/views/view_1.jpg'),
    },
    {
      id: 3,
      chapter: '南投縣',
      name: '露營地ABC',
      imageUri: require('../../../assets/images/views/view_1.jpg'),
    },
    {
      id: 4,
      chapter: '南投縣',
      name: '露營地ABC',
      imageUri: require('../../../assets/images/views/view_1.jpg'),
    },
  ];
  const postsList = [
    {
      id: 1,
      chapter: '露營地A',
      name: '第一次露營就上手',
      imageUri: require('../../../assets/images/views/view_9.jpg'),
    },
    {
      id: 2,
      chapter: '露營地B',
      name: '美食讀',
      imageUri: require('../../../assets/images/views/view_12.jpg'),
    },
    {
      id: 3,
      chapter: '露營地B',
      name: '露營美食',
      imageUri: require('../../../assets/images/views/view_7.jpg'),
    },
    {
      id: 4,
      chapter: '露營地B',
      name: '露營地ABC',
      imageUri: require('../../../assets/images/views/view_2.jpg'),
    },
  ];
  type CarousalTye = {
    imageUri: ImageSourcePropType;
    name: string;
  };
  const trending: CarousalTye[] = [
    {
      imageUri: { uri: 'https://picsum.photos/200' },
      name: 'Story Seeds',
    },
    {
      imageUri: { uri: 'https://picsum.photos/200' },
      name: 'Dare to lead',
    },
    {
      imageUri: { uri: 'https://picsum.photos/200' },
      name: 'Artificial Intelligence',
    },
    {
      imageUri: { uri: 'https://picsum.photos/200' },
      name: 'Angular',
    },
    {
      imageUri: { uri: 'https://picsum.photos/200' },
      name: 'AR/VR',
    },
  ];

  function PostCard(props: { item: PostProps }) {
    return (
      <TouchableOpacity onPress={() => navigation.navigate(MAIN_STACK_POST)}>
        <Box p="0" borderRadius="sm" m="2" mb="3">
          <Image
            w="100%"
            h="170"
            source={{ uri: props.item.imageRes }}
            alt="Alternate Text"
            resizeMode="cover"
          />
          <Text
            mt="2"
            fontSize="xs"
            _light={{ color: 'coolGray.500' }}
            _dark={{ color: 'coolGray.400' }}>
            {props.item.description}
          </Text>
          <HStack mt="1" w="100%" justifyContent="flex-start" alignItems="center">
            <Avatar
              height="5"
              width="5"
              source={{
                uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
              }}
            />
            <HStack space="0" alignItems="flex-start" justifyContent="flex-start">
              <Text
                fontSize="sm"
                fontWeight="medium"
                py={1}
                mx={2}
                _dark={{ color: 'coolGray.50' }}
                _light={{ color: 'coolGray.700' }}>
                {props.item.title}
              </Text>
            </HStack>
            <IconButton
              ml="auto"
              p={0}
              icon={
                <Icon
                  size="4"
                  _light={{ color: 'primary.900' }}
                  _dark={{ color: 'primary.500' }}
                  as={MaterialIcons}
                  name="favorite-border"
                />
              }
            />
          </HStack>
        </Box>
      </TouchableOpacity>
    );
  }

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
        px="2"
        py="2"
        rounded={{ md: 'sm' }}
        _light={{ bg: 'white' }}
        _dark={{ bg: 'coolGray.800' }}
        alignItems="center">
        <MasonryList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={itemList}
          renderItem={({ item }) => <PostCard item={item} />}
          keyExtractor={(item, index) => 'key' + index}
        />
      </Box>
    );
  }

  function Carousal({ itemList, heading }: { itemList: CarousalTye[]; heading: string }) {
    const Separator = () => <Box w="4" flex="1" />;
    return (
      <VStack space={0} mt={0} px={2} mb={2}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
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
        <ScrollView py={2}>
          <MainPostList />
        </ScrollView>
      </>
    );
  }
  function Tab_2() {
    return (
      <ScrollView py={2}>
        <MainPostList />
      </ScrollView>
    );
  }
  function Tab_3() {
    return (
      <ScrollView py={2}>
        <MainPostList />
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
          paddingX={5}
          paddingY={1}
          fontSize="lg"
          fontWeight="medium"
          letterSpacing="0.4"
          _light={{
            color: tabName === currentTab ? 'coolGray.700' : 'coolGray.400',
          }}>
          {tabName}
        </Text>
        {tabName === currentTab ? (
          <Box
            _light={{
              bg: Colors.LOGO_COLOR_BROWN,
            }}
            _dark={{
              bg: 'amber.900',
            }}
            h="0.5"
            mb="2"
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
            mb="2"
          />
        )}
      </Pressable>
    );
  }
  function Tabs() {
    const [tabName, setTabName] = React.useState(tabs[0].title);
    const [tabChildren, setTabChildren] = useState<React.ReactNode>(tabs[0].component);
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

  return (
    <DashboardLayout title="社群">
      <Stack flex={1} _light={{ bg: Colors.THEME_MAIN_BACKGROUND }} _dark={{ bg: 'coolGray.800' }}>
        <VStack mx="3" mb="2">
          <Carousal itemList={trending} heading="推薦" />
        </VStack>
        <Box
          pt={5}
          px="2"
          py="8"
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
        <Fab
          zIndex={99}
          renderInPortal={false}
          bg={Colors.LOGO_COLOR_BROWN}
          colorScheme="light"
          shadow={2}
          size="sm"
          icon={<Icon color="white" as={AntDesign} name="form" size="4" />}
          onPress={() => {
            navigation.navigate(MAIN_STACK_CREATE_POST);
          }}
        />
      </Stack>
    </DashboardLayout>
  );
}
