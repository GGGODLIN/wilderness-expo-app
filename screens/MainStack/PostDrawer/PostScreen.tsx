import { MaterialIcons, FontAwesome, AntDesign, Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  Box,
  HStack,
  Icon,
  Text,
  VStack,
  Avatar,
  Button,
  Stack,
  Link,
  IconButton,
  useColorModeValue,
  useTheme,
  FormControl,
  Divider,
  TextArea,
  Center,
  Pressable,
  Flex,
} from 'native-base';
import React, { useState } from 'react';
import type { ImageSourcePropType } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { MAIN_STACK_PROFILE, MAIN_STACK_LOCATION_DRAWER } from '../../../NavigationNames';
import { Nav, NavigationProps } from '../../../Props';
import { Carousel } from '../../../components/Carousel';
import Colors from '../../../constants/Colors';
import DashboardLayout from '../../../layouts/DashboardLayout';

type SizesType = {
  size: string;
};

type ProductType = {
  title: string;
  category: string;
  rate: string;
  rating: number;
  datetime: string;
  description: string;
};
type ReviewsType = {
  imageUrl: ImageSourcePropType;
  name: string;
  time: string;
  review: string;
};

const postDetail: ProductType = {
  title: '挑戰秘境最深處',
  category: 'Mother care',
  rate: '500',
  rating: 4.9,
  datetime: '2022-12-30',
  description: '臨時湊成團的瀑布挑戰\n太\n太\n太驚險了',
};

const reviews: ReviewsType[] = [
  {
    imageUrl: require('../../../assets/theme/trending1.png'),
    name: '水亮亮',
    time: '剛剛',
    review: '下次也要去!',
  },
  {
    imageUrl: require('../../../assets/theme/trending1.png'),
    name: '車老大',
    time: '2022-10-30',
    review: '我的天啊',
  },
];

function Reviews() {
  return (
    <VStack bg={Colors.LOGO_COLOR_WHITE_BACKGROUND}>
      {reviews.map((item, idx) => {
        return (
          <VStack key={idx} mt="4" bg="white" rounded={10} px={4} py={4}>
            <HStack space="2" alignItems="center">
              <Avatar height="6" width="6" source={item.imageUrl} />
              <VStack space="1">
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  _dark={{ color: 'coolGray.50' }}
                  _light={{ color: 'coolGray.800' }}>
                  {item.name}
                </Text>
              </VStack>
              <Text
                fontSize="sm"
                ml="auto"
                _light={{ color: 'coolGray.500' }}
                _dark={{ color: 'coolGray.400' }}>
                {item.time}
              </Text>
            </HStack>
            <Text
              mt="2"
              alignItems="center"
              _light={{ color: 'coolGray.800' }}
              _dark={{ color: 'coolGray.50' }}
              fontSize="sm">
              {item.review}
            </Text>
          </VStack>
        );
      })}
    </VStack>
  );
}

const ActionButton = () => {
  const navigation = useNavigation<Nav>();

  return (
    <VStack mb="10">
      <HStack px="4" pt="2" pb="1" justifyContent="space-between">
        <Pressable
          onPress={() => {
            navigation.navigate(MAIN_STACK_LOCATION_DRAWER);
          }}>
          <HStack justifyContent="space-between">
            <HStack width="70%">
              <Icon
                mr="2"
                size="6"
                name="enviroment"
                as={AntDesign}
                color={Colors.LOGO_COLOR_GREEN}
              />
              <Text fontSize="sm" fontWeight="medium" py={1} color={Colors.LOGO_COLOR_GREEN}>
                枕頭山營地
              </Text>
            </HStack>
            <HStack width="30%" alignItems="flex-end" justifyContent="flex-end">
              <Text fontSize="sm" fontWeight="medium" py={1} color={Colors.LOGO_COLOR_GREEN}>
                123 公里
              </Text>
            </HStack>
          </HStack>
        </Pressable>
      </HStack>
    </VStack>
  );
};

function ProductInfo({ productInfo }: { productInfo: ProductType }) {
  const textColorA = useColorModeValue('coolGray.800', 'coolGray.50');
  const textColorB = useColorModeValue('coolGray.500', 'coolGray.400');

  return (
    <Box mb={4}>
      <HStack alignItems="center" space="1" mt={{ base: 4, md: 0 }} mb={4}>
        <Text fontSize="xl" color={textColorA} fontWeight="bold">
          {productInfo.title}
        </Text>
        <Text fontSize="sm" fontWeight="normal" color={textColorB} lineHeight="21" ml="auto">
          {productInfo.datetime}
        </Text>
      </HStack>
      <Text fontSize="md" fontWeight="normal" color={textColorB} lineHeight="24">
        {productInfo.description}
      </Text>
    </Box>
  );
}

const CarouselLayout = () => {
  return (
    <Box
      px={{ base: '0', md: 0 }}
      py={{ base: '0', md: 0 }}
      bg="white"
      height={{ base: 300, md: 20 }}>
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
        height={{ base: 300, md: 20 }}
        activeIndicatorBgColor="coolGray.500"
        inactiveIndicatorBgColor="coolGray.300"
      />
    </Box>
  );
};

function LeaveMessage() {
  type DeactivateForm = {
    reason: string;
    password: string;
  };

  const { colors } = useTheme();

  const [deactivateForm, setDeactivateForm] = React.useState<DeactivateForm>({
    reason: '',
    password: '',
  });

  const { reason, password } = deactivateForm;

  const handleFormUpdate = (name: string, value: string) =>
    setDeactivateForm((prev) => ({ ...prev, [name]: value }));

  return (
    <Box rounded="10" bg="white" flex={1} px="4" py="4" mt="4" mb="10">
      <Box>
        <FormControl>
          <VStack space="0">
            <HStack space="2">
              <Avatar
                height="6"
                width="6"
                source={require('../../../assets/images/views/view_9.jpg')}
              />
              <VStack space="0" alignItems="center">
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  py={1}
                  _dark={{ color: 'coolGray.50' }}
                  _light={{ color: 'coolGray.700' }}>
                  使用者名稱
                </Text>
              </VStack>
            </HStack>
          </VStack>
          <VStack space="3" mt="2">
            <TextArea
              fontSize="14"
              lineHeight="21"
              textAlignVertical="top"
              placeholderTextColor={useColorModeValue('coolGray.500', 'coolGray.400')}
              _light={{ color: 'coolGray.800' }}
              _dark={{ color: 'coolGray.50' }}
              value={reason}
              onChangeText={(txt) => handleFormUpdate('reason', txt)}
              placeholder="留言..."
              h="84"
              autoCompleteType={undefined}
            />
          </VStack>
          <Box mt="0">
            <Text
              mt={{ base: '4', md: '6' }}
              fontSize="sm"
              _light={{ color: 'coolGray.500' }}
              _dark={{ color: 'coolGray.400' }}
              lineHeight="21">
              說明:
            </Text>
          </Box>
        </FormControl>
      </Box>
    </Box>
  );
}

function CustomIcon() {
  const navigation = useNavigation<Nav>();
  return (
    <IconButton
      variant="ghost"
      px={4}
      onPress={() => {
        navigation.openDrawer();
      }}
      icon={<Icon size="5" name="navicon" as={FontAwesome} />}
      _icon={{ color: Colors.LOGO_COLOR_BROWN }}
    />
  );
}

/* NEW VERSION 2022/11/15 */
function CustomTitle() {
  const navigation = useNavigation<Nav>();
  return (
    <Pressable
      height="100%"
      onPress={() => {
        navigation.navigate(MAIN_STACK_PROFILE);
      }}>
      <Flex height="100%" direction="row" alignItems="center">
        <Avatar
          mr={3}
          ml={1}
          size={8}
          source={require('../../../assets/images/views/view_9.jpg')}
        />
        <Text
          flex={1}
          fontSize="sm"
          fontWeight="medium"
          py={1}
          _dark={{ color: 'coolGray.50' }}
          _light={{ color: 'coolGray.700' }}>
          作者名稱
        </Text>
        <Box>
          <Box
            borderWidth="1"
            borderColor={Colors.LOGO_COLOR_BROWN}
            borderRadius="xl"
            px="2"
            py="1">
            <Text fontSize="xs" fontWeight="normal" color={Colors.LOGO_COLOR_BROWN}>
              打卡 125 次
            </Text>
          </Box>
        </Box>
      </Flex>
    </Pressable>
  );
}

export default function PostScreen({ navigation }: NavigationProps): JSX.Element {
  const [favorite, setFavorite] = useState(false);
  const [star, setStar] = useState(false);
  const [like, setLike] = useState(false);
  const [location, setLocation] = useState(false);

  return (
    <DashboardLayout
      title="動態內頁"
      header={{ searchbar: false }}
      customIcon={<CustomIcon />}
      customTitle={<CustomTitle />}
      showBackButton>
      <KeyboardAwareScrollView style={{ flex: 1 }} bounces={false}>
        <Stack bg="white">
          <CarouselLayout />
        </Stack>
        <Stack bg="white" px="4">
          <ProductInfo productInfo={postDetail} />
          <Text
            fontSize="sm"
            fontWeight="medium"
            color={useColorModeValue('coolGray.500', 'coolGray.400')}
            lineHeight="30"
            my={2}>
            500 個人喜歡這篇
          </Text>
        </Stack>
        <HStack
          space="4"
          alignItems="center"
          px={4}
          p={2}
          style={{ backgroundColor: Colors.THEME_MAIN_BACKGROUND }}>
          <Button
            flex={1}
            variant="solid"
            bg={like ? Colors.LOGO_COLOR_BROWN : Colors.LOGO_COLOR_GREEN}
            _pressed={{ bg: Colors.LOGO_COLOR_GREEN }}
            onPress={() => setLike(!like)}>
            {like ? '喜歡' : '收回'}
          </Button>
          <Button
            flex={1}
            variant="solid"
            bg={favorite ? Colors.LOGO_COLOR_BROWN : Colors.LOGO_COLOR_GREEN}
            _pressed={{ bg: Colors.LOGO_COLOR_GREEN }}
            onPress={() => setFavorite(!favorite)}>
            {favorite ? '收藏此篇' : '取消收藏'}
          </Button>
          <Button
            flex={1}
            variant="solid"
            bg={star ? Colors.LOGO_COLOR_BROWN : Colors.LOGO_COLOR_GREEN}
            _pressed={{ bg: Colors.LOGO_COLOR_GREEN }}
            onPress={() => setStar(!star)}>
            {star ? '關注作者' : '取消關注'}
          </Button>
          <Button
            flex={1}
            variant="solid"
            bg={location ? Colors.LOGO_COLOR_BROWN : Colors.LOGO_COLOR_GREEN}
            _pressed={{ bg: Colors.LOGO_COLOR_GREEN }}
            onPress={() => setLocation(!location)}>
            {location ? '收藏地點' : '移除地點'}
          </Button>
        </HStack>
        <Stack bg={Colors.LOGO_COLOR_WHITE_BACKGROUND} px="2">
          <Reviews />
          <LeaveMessage />
        </Stack>
      </KeyboardAwareScrollView>
      <ActionButton />
    </DashboardLayout>
  );
}
