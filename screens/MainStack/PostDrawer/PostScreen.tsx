import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  Box,
  HStack,
  Icon,
  Text,
  VStack,
  Avatar,
  Image,
  ScrollView,
  Pressable,
  Button,
  Stack,
  Link,
  Hidden,
  IconButton,
  useColorModeValue,
  useTheme,
  FormControl,
  Divider,
  TextArea,
} from 'native-base';
import React, { useState } from 'react';
import type { ImageSourcePropType } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Nav, NavigationProps } from '../../../Props';
import { Carousel } from '../../../components/Carousel';
import FloatingLabelInput from '../../../components/FloatingLabelInput';
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
    <VStack mt={{ base: 4, md: 6 }} space={{ base: 6, md: 8 }}>
      {reviews.map((item, idx) => {
        return (
          <VStack key={idx} space="3">
            <HStack space="2">
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

const sizeOptions: SizesType[] = [
  {
    size: 'New Born',
  },
  {
    size: 'Tiny Baby',
  },
  {
    size: '0-3 M',
  },
];

const AddToCartButton = () => {
  const [favorite, setFavorite] = useState(false);
  const [star, setStar] = useState(false);

  return (
    <HStack
      space="4"
      alignItems="center"
      px={4}
      p={2}
      style={{ backgroundColor: Colors.LOGO_COLOR_WHITE_BACKGROUND }}>
      <Text
        fontSize="sm"
        fontWeight="medium"
        color={useColorModeValue('coolGray.500', 'coolGray.400')}
        lineHeight="30"
        my={2}>
        500 likes
      </Text>
      <IconButton
        mx={0}
        py={2}
        onPress={() => setFavorite(!favorite)}
        variant="light"
        _light={{
          bg: Colors.LOGO_COLOR_WHITE_BACKGROUND,
        }}
        _dark={{
          bg: 'coolGray.700',
        }}
        icon={
          <Icon
            size="6"
            name={favorite ? 'favorite' : 'favorite-border'}
            as={MaterialIcons}
            _dark={{ color: 'primary.500' }}
            _light={{ color: Colors.LOGO_COLOR_BROWN }}
          />
        }
      />
      <IconButton
        mx={0}
        py={2}
        onPress={() => setStar(!star)}
        variant="light"
        _light={{
          bg: Colors.LOGO_COLOR_WHITE_BACKGROUND,
        }}
        _dark={{
          bg: 'coolGray.700',
        }}
        icon={
          <Icon
            size="7"
            name={star ? 'star' : 'star-border'}
            as={MaterialIcons}
            _dark={{ color: 'primary.500' }}
            _light={{ color: Colors.LOGO_COLOR_BROWN }}
          />
        }
      />
      <Button
        flex={1}
        size="lg"
        variant="solid"
        _light={{
          bg: Colors.LOGO_COLOR_GREEN,
        }}
        _dark={{
          bg: 'coolGray.700',
        }}>
        說點什麼
      </Button>
    </HStack>
  );
};

function SizeOptions({ options }: { options: SizesType[] }) {
  return (
    <HStack space="2" alignItems="center">
      {options.map((item, index) => {
        return (
          <Button
            p={3}
            key={index + ''}
            variant="unstyled"
            _text={{
              _light: { color: 'coolGray.800' },
              _dark: { color: 'coolGray.50' },
              fontSize: 'sm',
              fontWeight: 'normal',
            }}
            _light={{
              bg: 'primary.50',
              _hover: { bg: 'primary.200' },
              _pressed: { bg: 'primary.300' },
            }}
            _dark={{
              bg: 'coolGray.700',
              _hover: { bg: 'coolGray.600' },
              _pressed: { bg: 'coolGray.500' },
            }}>
            {item.size}
          </Button>
        );
      })}
    </HStack>
  );
}
function SizeChart({ options }: { options: SizesType[] }) {
  return (
    <VStack space="3">
      <HStack alignItems="center">
        <Text
          fontSize="sm"
          fontWeight="normal"
          _dark={{ color: 'coolGray.50' }}
          _light={{ color: 'coolGray.800' }}
          lineHeight="21">
          Select Size
        </Text>
        <Text
          fontSize="sm"
          fontWeight="normal"
          _light={{ color: 'coolGray.500' }}
          _dark={{ color: 'coolGray.400' }}
          lineHeight="21">
          (Age Group)
        </Text>
        <Link
          ml="auto"
          _text={{ textDecoration: 'none' }}
          _light={{
            _text: {
              color: 'primary.900',
            },
          }}
          _dark={{
            _text: {
              color: 'primary.500',
            },
          }}
          lineHeight="21">
          Size Chart
        </Link>
      </HStack>
      <SizeOptions options={options} />
    </VStack>
  );
}
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
function Description({ productDescription }: { productDescription: string }) {
  return (
    <Text
      mt="4"
      fontSize="sm"
      fontWeight="normal"
      lineHeight="21"
      _light={{ color: 'coolGray.800' }}
      _dark={{ color: 'coolGray.50' }}>
      {productDescription}
    </Text>
  );
}

const CarouselLayout = () => {
  return (
    <Box
      px={{ base: '0', md: 0 }}
      py={{ base: '0', md: 0 }}
      _light={{ bg: 'transparent' }}
      _dark={{ bg: 'transparent' }}
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

  const confirmPassLabelBGColor = useColorModeValue('white', colors.coolGray[800]);

  const handleFormUpdate = (name: string, value: string) =>
    setDeactivateForm((prev) => ({ ...prev, [name]: value }));

  return (
    <Box
      px={{ base: 4, md: 60, lg: 140 }}
      py={{ base: 4, md: 8 }}
      rounded={{ md: 'sm' }}
      _light={{ bg: 'white' }}
      _dark={{ bg: 'coolGray.800' }}
      flex={1}>
      <Divider my={4} />
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
      variant="unstyled"
      colorScheme="light"
      py={0}
      icon={
        <Icon
          size="5"
          name="navicon"
          as={FontAwesome}
          _dark={{
            color: 'coolGray.200',
          }}
          _light={{
            color: Colors.LOGO_COLOR_BROWN,
          }}
        />
      }
      onPress={() => {
        navigation.openDrawer();
      }}
    />
  );
}

function CustomTitle() {
  return (
    <VStack space="0">
      <HStack space="2">
        <Avatar height="6" width="6" source={require('../../../assets/images/views/view_9.jpg')} />
        <VStack space="0" alignItems="center">
          <Text
            fontSize="sm"
            fontWeight="medium"
            py={1}
            _dark={{ color: 'coolGray.50' }}
            _light={{ color: 'coolGray.700' }}>
            作者名稱
          </Text>
        </VStack>
      </HStack>
    </VStack>
  );
}

export default function MainStackPostScreen({ navigation }: NavigationProps): JSX.Element {
  return (
    <DashboardLayout
      title="動態內頁"
      displaySidebar={false}
      header={{ searchbar: false }}
      customIcon={<CustomIcon />}
      customTitle={<CustomTitle />}
      showBackButton>
      <KeyboardAwareScrollView style={{ flex: 1 }} bounces={false}>
        <Stack px={{ base: '0', md: '8' }} py={{ base: '0', md: '8' }}>
          <CarouselLayout />
        </Stack>
        <Stack
          px={{ base: '4', md: '8' }}
          py={{ base: '0', md: '8' }}
          flex={1}
          rounded={{ md: 'sm' }}
          _light={{ bg: 'white' }}
          _dark={{ bg: 'coolGray.800' }}
          direction={{ base: 'column', md: 'row' }}>
          <ProductInfo productInfo={postDetail} />

          <Divider
            mt="5"
            _light={{
              color: 'coolGray.200',
            }}
            _dark={{
              color: 'coolGray.700',
            }}
          />
          <Reviews />
        </Stack>
        <LeaveMessage />
      </KeyboardAwareScrollView>
      <AddToCartButton />
    </DashboardLayout>
  );
}
