import { AntDesign, MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import {
  HStack,
  Icon,
  Text,
  VStack,
  Button,
  ScrollView,
  Hidden,
  Divider,
  Input,
  Image,
  Pressable,
  Flex,
  Circle,
  Center,
  Box,
  IconButton,
  useBreakpointValue,
  FlatList,
  Link,
} from 'native-base';
import React from 'react';
import { ImageSourcePropType, Platform, useWindowDimensions } from 'react-native';

import { MAIN_STACK_POST } from '../../NavigationNames';
import { NavigationProps } from '../../Props';
import { Carousel } from '../../components/Carousel';
import Tab from '../../components/TopTab/Tab';
import Categories from '../../components/home/Categories';
import PostsList from '../../components/home/PostsList';
import Colors from '../../constants/Colors';
import DashboardLayout from '../../layouts/DashboardLayout';
import GuestLayout from '../../layouts/GuestLayout';

type Icon = {
  name: string;
  text: string;
};

const trendingCourses = [
  {
    id: 1,
    name: 'Artificial Intelligence',
    imageUri: require('../../assets/theme/trending1.png'),
  },
  {
    id: 2,
    name: 'Machine Learning',
    imageUri: require('../../assets/theme/trending2.png'),
  },
  {
    id: 3,
    name: 'AWS SysOps Associate',
    imageUri: require('../../assets/theme/trending3.png'),
  },

  {
    id: 4,
    name: 'Angular Training Course',
    imageUri: require('../../assets/theme/chair.jpeg'),
  },
  {
    id: 5,
    name: 'Artificial Intelligence',
    imageUri: require('../../assets/theme/trending1.png'),
  },
];
const resumedCourses = [
  {
    id: 1,
    chapter: 'test',
    name: 'test',
    imageUri: require('../../assets/images/views/view_3.jpg'),
  },
  {
    id: 2,
    chapter: 'test',
    name: 'test',
    imageUri: require('../../assets/images/views/view_3.jpg'),
  },
  {
    id: 3,
    chapter: 'test',
    name: 'test',
    imageUri: require('../../assets/images/views/view_3.jpg'),
  },
  {
    id: 4,
    chapter: 'test',
    name: 'test',
    imageUri: require('../../assets/images/views/view_3.jpg'),
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
          require('../../assets/images/views/view_9.jpg'),
          require('../../assets/images/views/view_10.jpg'),
          require('../../assets/images/views/view_15.jpg'),
          require('../../assets/images/views/view_11.jpg'),
          require('../../assets/images/views/view_12.jpg'),
          require('../../assets/images/views/view_13.jpg'),
          require('../../assets/images/views/view_14.jpg'),
        ]}
        height={{ base: 40, md: 20 }}
        activeIndicatorBgColor="coolGray.500"
        inactiveIndicatorBgColor="coolGray.300"
      />
    </Box>
  );
};

const icons: Icon[] = [
  {
    name: 'caravan',
    text: '車泊熱點',
  },
  {
    name: 'snowboarding',
    text: 'SUP 秘境',
  },
  {
    name: 'campground',
    text: '熱門營地',
  },
  {
    name: 'grin-tongue-squint',
    text: '親子營區',
  },
];
const icons2: Icon[] = [
  {
    name: 'comments',
    text: '熱門討論',
  },
  {
    name: 'drumstick-bite',
    text: '露營美食',
  },
  {
    name: 'mountain',
    text: '好野入門',
  },
  {
    name: 'info',
    text: '常見問題',
  },
];

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

export default function HomeScreen({ route, navigation }: NavigationProps): JSX.Element {
  function Card(props: ProductProps) {
    const { width: windowWidth } = useWindowDimensions();
    return (
      <Box
        width={{
          base: windowWidth / 2 - 22,
          sm: windowWidth / 3 - 22,
          md: windowWidth / 3 - 56,
          lg: windowWidth / 5 - 56,
          xl: '173',
        }}
        p="0"
        borderRadius="sm"
        m={{ base: '1.5', md: '2.5' }}>
        <Pressable onPress={() => navigation.navigate(MAIN_STACK_POST)}>
          <Link href="" borderRadius="sm" overflow="hidden">
            <Image
              w="100%"
              h="170"
              source={props.imageUri}
              alt="Alternate Text"
              resizeMode="cover"
            />
          </Link>
          <Text
            mt="2"
            fontSize="xs"
            _light={{ color: 'coolGray.500' }}
            _dark={{ color: 'coolGray.400' }}>
            {props.description}
          </Text>
          <HStack mt="1" w="100%" justifyContent="space-between">
            <Text fontSize="xs" _light={{ color: 'coolGray.600' }} _dark={{ color: 'coolGray.50' }}>
              {props.number} likes
            </Text>
            <IconButton
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
        </Pressable>
      </Box>
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
      </Box>
    );
  }

  return (
    <DashboardLayout
      title="玩野覓境"
      displayMenuButton
      displayScreenTitle={false}
      displayAlternateMobileHeader
      rightPanelMobileHeader>
      <ScrollView>
        <CarouselLayout />
        <Box pt={4}>
          <HStack space={6} justifyContent="center">
            {icons.map((item, idx) => {
              return (
                <VStack key={'icon_' + idx} overflow="visible">
                  <Center
                    _light={{ bg: Colors.LOGO_COLOR_WHITE_BACKGROUND }}
                    _dark={{ bg: 'coolGray.700' }}
                    rounded="full"
                    w={{ base: 16, md: 14 }}
                    h={{ base: 16, md: 14 }}>
                    <IconButton
                      variant="unstyled"
                      icon={
                        <Icon
                          as={FontAwesome5}
                          name={item.name}
                          _light={{ color: Colors.LOGO_COLOR_GREEN }}
                          _dark={{ color: 'coolGray.50' }}
                          size={8}
                          textAlign="center"
                          alignSelf="center"
                        />
                      }
                    />
                  </Center>
                  <Text
                    pt={2}
                    fontSize={{ base: 'sm', md: 'sm' }}
                    _light={{ color: { base: 'coolGray.800', md: 'coolGray.500' } }}
                    _dark={{ color: { base: 'coolGray.50', md: 'coolGray.400' } }}
                    textAlign="center">
                    {item.text}
                  </Text>
                </VStack>
              );
            })}
          </HStack>
          <HStack space={6} justifyContent="center" pt={3} pb={4}>
            {icons2.map((item, idx) => {
              return (
                <VStack key={'icon2_' + idx}>
                  <Center
                    _light={{ bg: Colors.LOGO_COLOR_WHITE_BACKGROUND }}
                    _dark={{ bg: 'coolGray.700' }}
                    rounded="full"
                    w={{ base: 16, md: 14 }}
                    h={{ base: 16, md: 14 }}>
                    <IconButton
                      variant="unstyled"
                      icon={
                        <Icon
                          as={FontAwesome5}
                          name={item.name}
                          _light={{ color: Colors.LOGO_COLOR_GREEN }}
                          _dark={{ color: 'coolGray.50' }}
                          size={8}
                          textAlign="center"
                        />
                      }
                    />
                  </Center>
                  <Text
                    pt={2}
                    fontSize={{ base: 'sm', md: 'sm' }}
                    _light={{ color: { base: 'coolGray.800', md: 'coolGray.500' } }}
                    _dark={{ color: { base: 'coolGray.50', md: 'coolGray.400' } }}
                    textAlign="center">
                    {item.text}
                  </Text>
                </VStack>
              );
            })}
          </HStack>
          {/*
        <VStack _light={{ bg: 'white' }} _dark={{ bg: 'coolGray.800' }} space="0">
          <Categories icons={icons} />
        </VStack>
        <VStack _light={{ bg: 'white' }} _dark={{ bg: 'coolGray.800' }} space="0">
          <Categories icons={icons2} />
        </VStack>
        */}
        </Box>
        {/*
        {[...Array(1)].map((_, i) => (
          <PostsList key={i} courses={resumedCourses} />
        ))}
        */}
        {/*
        <Box
          px={{ base: 2.5, md: '22' }}
          py={{ base: '14', md: '22' }}
          rounded={{ md: 'sm' }}
          _light={{ bg: 'white' }}
          _dark={{ bg: 'coolGray.800' }}
          alignItems="center">
          {itemList.map((item, i) => (
            <Card
              imageUri={item.imageUri}
              title={item.title}
              description={item.description}
              number={item.number}
            />
          ))}
        </Box>
        */}
        <MainPostList />
      </ScrollView>
    </DashboardLayout>
  );
}
