import { MaterialIcons } from '@expo/vector-icons';
import {
  faCampground,
  faCaravan,
  faComment,
  faFish,
  faDrumstickBite,
  faGrinTongueSquint,
  faInfo,
  faMountain,
  faSnowboarding,
  faFutbol,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import MasonryList from '@react-native-seoul/masonry-list';
import {
  HStack,
  Icon,
  Text,
  Stack,
  VStack,
  ScrollView,
  Image,
  Pressable,
  Box,
  IconButton,
  useBreakpointValue,
  Avatar,
  Center,
} from 'native-base';
import React from 'react';
import { ImageSourcePropType, useWindowDimensions, TouchableOpacity } from 'react-native';

import { MAIN_STACK_POST } from '../../../NavigationNames';
import { NavigationProps } from '../../../Props';
import { Carousel } from '../../../components/Carousel';
import Colors from '../../../constants/Colors';
import DashboardLayout from '../../../layouts/DashboardLayout';

type Icon = {
  name: string;
  text: string;
};

const trendingCourses = [
  {
    id: 1,
    name: 'Artificial Intelligence',
    imageUri: require('../../../assets/theme/trending1.png'),
  },
  {
    id: 2,
    name: 'Machine Learning',
    imageUri: require('../../../assets/theme/trending2.png'),
  },
  {
    id: 3,
    name: 'AWS SysOps Associate',
    imageUri: require('../../../assets/theme/trending3.png'),
  },

  {
    id: 4,
    name: 'Angular Training Course',
    imageUri: require('../../../assets/theme/chair.jpeg'),
  },
  {
    id: 5,
    name: 'Artificial Intelligence',
    imageUri: require('../../../assets/theme/trending1.png'),
  },
];
const resumedCourses = [
  {
    id: 1,
    chapter: 'test',
    name: 'test',
    imageUri: require('../../../assets/images/views/view_3.jpg'),
  },
  {
    id: 2,
    chapter: 'test',
    name: 'test',
    imageUri: require('../../../assets/images/views/view_3.jpg'),
  },
  {
    id: 3,
    chapter: 'test',
    name: 'test',
    imageUri: require('../../../assets/images/views/view_3.jpg'),
  },
  {
    id: 4,
    chapter: 'test',
    name: 'test',
    imageUri: require('../../../assets/images/views/view_3.jpg'),
  },
];

const CarouselLayout = () => {
  return (
    <Box
      px={{ base: '0', md: 0 }}
      py={{ base: '0', md: 0 }}
      _light={{ bg: 'transparent' }}
      _dark={{ bg: 'transparent' }}
      height={{ base: 40, md: 20 }}>
      <Carousel
        images={[
          require('../../../assets/images/views/view_9.jpg'),
          require('../../../assets/images/views/view_10.jpg'),
          require('../../../assets/images/views/view_15.jpg'),
          require('../../../assets/images/views/view_11.jpg'),
          require('../../../assets/images/views/view_12.jpg'),
          require('../../../assets/images/views/view_13.jpg'),
          require('../../../assets/images/views/view_14.jpg'),
        ]}
        height={{ base: 40, md: 20 }}
        activeIndicatorBgColor="coolGray.500"
        inactiveIndicatorBgColor="coolGray.300"
      />
    </Box>
  );
};

const icons = [
  {
    icon: faCaravan,
    text: '車泊熱點',
  },
  {
    icon: faSnowboarding,
    text: 'SUP 秘境',
  },
  {
    icon: faCampground,
    text: '熱門營地',
  },
  {
    icon: faFutbol,
    text: '親子營區',
  },
];
const icons2 = [
  {
    icon: faFish,
    text: '釣魚特區',
  },
  {
    icon: faDrumstickBite,
    text: '露營美食',
  },
  {
    icon: faMountain,
    text: '好野入門',
  },
  {
    icon: faInfo,
    text: '常見問題',
  },
];

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

export default function HomeScreen({ route, navigation }: NavigationProps): JSX.Element {
  function PostCard(props: { item: PostProps }) {
    return (
      <TouchableOpacity onPress={() => navigation.navigate(MAIN_STACK_POST)}>
        <Box p="0" borderRadius="10" m="2" mb="3" bg="coolGray.100">
          <Image
            borderTopLeftRadius="10"
            borderTopRightRadius="10"
            w="100%"
            h="170"
            source={{ uri: props.item.imageRes }}
            alt="Alternate Text"
            resizeMode="cover"
          />
          <Text
            mt="2"
            mx="2"
            fontSize="xs"
            _light={{ color: 'coolGray.500' }}
            _dark={{ color: 'coolGray.400' }}>
            {props.item.description}
          </Text>
          <HStack mt="1" px="2" pb="2" w="100%" justifyContent="flex-start" alignItems="center">
            <Avatar
              height="5"
              width="5"
              source={{
                uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
              }}
            />
            <HStack space="0" alignItems="flex-start" justifyContent="flex-start">
              <Text
                fontSize="xs"
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

  const noColumn = useBreakpointValue({
    base: 2,
    sm: 3,
    md: 3,
    lg: 5,
    xl: 5,
  });
  function MainPostList() {
    type Offer = {
      imageRes: string;
      discount: string;
      type: string;
    };
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
        px="0"
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
          keyExtractor={(item: Offer, index: number) => 'key' + index}
        />
      </Box>
    );
  }

  function CustomTitle() {
    return (
      <Center height="100%">
        <Image
          height="50%"
          alt="玩野秘境"
          resizeMode="contain"
          source={require('../../../assets/logo.png')}
        />
      </Center>
    );
  }

  return (
    <DashboardLayout title="玩野覓境" customTitle={<CustomTitle />}>
      <Stack flex={1} _light={{ bg: Colors.THEME_MAIN_BACKGROUND }} _dark={{ bg: 'coolGray.800' }}>
        <Box
          pt={5}
          px="0"
          py="0"
          flex={1}
          _light={{ bg: 'white' }}
          _dark={{ bg: 'coolGray.800' }}
          bg="white"
          borderTopLeftRadius="20"
          borderTopRightRadius="20">
          <ScrollView>
            <Box pt={0}>
              <HStack space={6} justifyContent="center" pt="1">
                {icons.map((item, idx) => {
                  return (
                    <TouchableOpacity key={'icon_' + idx}>
                      <VStack>
                        <IconButton
                          w={16}
                          h={16}
                          borderRadius="full"
                          colorScheme="dark"
                          icon={
                            <FontAwesomeIcon
                              icon={item.icon}
                              color={Colors.LOGO_COLOR_GREEN}
                              size={28}
                            />
                          }
                          bg={Colors.THEME_MAIN_BACKGROUND}
                        />
                        <Text
                          pt={2}
                          fontWeight="bold"
                          fontSize={{ base: 'sm', md: 'sm' }}
                          _light={{ color: { base: 'coolGray.500', md: 'coolGray.500' } }}
                          _dark={{ color: { base: 'coolGray.50', md: 'coolGray.400' } }}
                          textAlign="center">
                          {item.text}
                        </Text>
                      </VStack>
                    </TouchableOpacity>
                  );
                })}
              </HStack>
              <HStack space={6} justifyContent="center" pt={4} pb={6}>
                {icons2.map((item, idx) => {
                  return (
                    <TouchableOpacity key={'icon_' + idx}>
                      <VStack>
                        <IconButton
                          w={16}
                          h={16}
                          borderRadius="full"
                          colorScheme="dark"
                          icon={
                            <FontAwesomeIcon
                              icon={item.icon}
                              color={Colors.LOGO_COLOR_GREEN}
                              size={28}
                            />
                          }
                          bg={Colors.THEME_MAIN_BACKGROUND}
                        />
                        <Text
                          pt={2}
                          fontWeight="bold"
                          fontSize={{ base: 'sm', md: 'sm' }}
                          _light={{ color: { base: 'coolGray.500', md: 'coolGray.500' } }}
                          _dark={{ color: { base: 'coolGray.50', md: 'coolGray.400' } }}
                          textAlign="center">
                          {item.text}
                        </Text>
                      </VStack>
                    </TouchableOpacity>
                  );
                })}
              </HStack>
            </Box>
            <VStack px="4">
              <CarouselLayout />
            </VStack>
            <VStack px="2">
              <MainPostList />
            </VStack>
          </ScrollView>
        </Box>
      </Stack>
    </DashboardLayout>
  );
}
