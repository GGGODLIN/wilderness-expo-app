import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import MasonryList from '@react-native-seoul/masonry-list';
import * as ImagePicker from 'expo-image-picker';
import {
  Button,
  HStack,
  Text,
  Icon,
  Input,
  Pressable,
  Box,
  Center,
  VStack,
  TextArea,
  Image,
  Stack,
  IconButton,
  CheckIcon,
} from 'native-base';
import React, { useState } from 'react';
import { Keyboard, Dimensions, ScrollView, TouchableOpacity, TextInput } from 'react-native';

import { MAIN_STACK_LOCATION_DRAWER, MAIN_STACK_COLLECTION } from '../../NavigationNames';
import { NavigationProps } from '../../Props';
import Colors from '../../constants/Colors';
import DashboardLayout from '../../layouts/DashboardLayout';

type OptionListType = {
  planTitle: string;
};

const planOptionsList1: OptionListType[] = [
  {
    planTitle: '優先曝光給社團內成員',
  },
  {
    planTitle: '其他說明',
  },
  {
    planTitle: '其他說明',
  },
  {
    planTitle: '其他說明',
  },
];
const planOptionsList2: OptionListType[] = [
  {
    planTitle: '優先曝光給所有好友',
  },
  {
    planTitle: '其他說明',
  },
  {
    planTitle: '其他說明',
  },
  {
    planTitle: '其他說明',
  },
];

export default function CreateLocationScreen({ navigation }: NavigationProps): JSX.Element {
  type FormData = {
    location: string;
    title: string;
  };
  const [formData, setFormData] = useState<FormData>({
    location: '',
    title: '',
  });

  const [showCountry, setShowCountry] = useState(false);
  const [showAltitude, setShowAltitude] = useState(false);
  const [showRecommend, setShowRecommend] = useState(false);
  const [showCrowded, setShowCrowded] = useState(false);
  const [country, setCountry] = React.useState('');
  const [altitude, setAltitude] = useState('');
  const [recommend, setRecommend] = useState('');
  const [crowded, setCrowded] = useState('');

  function PlanDescriptionItem({ planTitle }: { planTitle: string }) {
    return (
      <HStack space="3" w={{ base: '100%', md: '50%' }} mb="5">
        <Icon
          size={6}
          as={MaterialIcons}
          name="check-circle"
          _light={{
            color: 'amber.900',
          }}
          _dark={{
            color: 'primary.500',
          }}
        />
        <Text
          flex={1}
          fontSize="sm"
          _light={{
            color: 'coolGray.800',
          }}
          _dark={{ color: 'coolGray.50' }}
          fontWeight="normal"
          lineHeight="21">
          {planTitle}
        </Text>
      </HStack>
    );
  }

  function PlanOption() {
    return (
      <Box>
        <HStack alignItems="center" mt={{ base: 7, md: 8 }} mb={5} space={1.5}>
          <Text
            _light={{ color: 'primary.900' }}
            _dark={{ color: 'primary.500' }}
            fontSize="xl"
            fontWeight="bold">
            50% off
          </Text>
          <Text
            _light={{ color: 'coolGray.500' }}
            _dark={{ color: 'coolGray.400' }}
            fontSize="sm"
            fontWeight="medium">
            Until Sunday, June 25th
          </Text>
        </HStack>
        <HStack flexWrap="wrap">
          {planOptionsList1.map((plan, index) => (
            <PlanDescriptionItem key={index} {...plan} />
          ))}
        </HStack>
      </Box>
    );
  }

  function TabItem({
    tabName,
    currentTab,
    handleTabChange,
  }: {
    tabName: string;
    currentTab: string;
    handleTabChange: (tabTitle: string) => void;
  }) {
    const getCurrentTabStyle = () => {
      return tabName === currentTab
        ? {
            borderRadius: 'lg',
            _light: {
              bg: Colors.LOGO_COLOR_BROWN,
              color: 'coolGray.50',
            },
            _dark: {
              bg: 'primary.500',
              color: 'coolGray.50',
            },
          }
        : {
            _light: {
              bg: 'warning.50',
              color: 'coolGray.500',
            },
            _dark: {
              bg: 'coolGray.700',
              color: 'coolGray.400',
            },
          };
    };
    return (
      <Pressable onPress={() => handleTabChange(tabName)} flex={1}>
        <Text
          textAlign="center"
          fontSize="lg"
          fontWeight="medium"
          letterSpacing="0.4"
          {...getCurrentTabStyle()}
          py={4}>
          {tabName}
        </Text>
      </Pressable>
    );
  }

  function OptionSection() {
    const [tabName, setTabName] = React.useState('社團活動');

    return (
      <>
        <HStack mt={5} alignItems="center" width="100%" borderRadius="sm" overflow="hidden">
          <TabItem
            tabName="社團活動"
            currentTab={tabName}
            handleTabChange={(tab) => setTabName(tab)}
          />
          <TabItem
            tabName="個人活動"
            currentTab={tabName}
            handleTabChange={(tab) => setTabName(tab)}
          />
        </HStack>
        {tabName === '社團活動' ? (
          <Box>
            <HStack alignItems="center" mt={{ base: 7, md: 8 }} mb={5} space={1.5}>
              <Text
                _light={{ color: 'amber.900' }}
                _dark={{ color: 'primary.500' }}
                fontSize="xl"
                fontWeight="bold">
                在社團內舉辦活動
              </Text>
              <Text
                _light={{ color: 'coolGray.500' }}
                _dark={{ color: 'coolGray.400' }}
                fontSize="sm"
                fontWeight="medium">
                號召團員們參加
              </Text>
            </HStack>
            <HStack flexWrap="wrap">
              {planOptionsList1.map((plan, index) => (
                <PlanDescriptionItem key={index} {...plan} />
              ))}
            </HStack>
            <Text
              _light={{ color: 'coolGray.500' }}
              _dark={{ color: 'coolGray.400' }}
              fontSize="sm"
              fontWeight="medium">
              審核是否通過依據該社團管理員決定
            </Text>
          </Box>
        ) : tabName === '個人活動' ? (
          <Box>
            <HStack alignItems="center" mt={{ base: 7, md: 8 }} mb={5} space={1.5}>
              <Text
                _light={{ color: 'amber.900' }}
                _dark={{ color: 'primary.500' }}
                fontSize="xl"
                fontWeight="bold">
                舉辦個人活動
              </Text>
              <Text
                _light={{ color: 'coolGray.500' }}
                _dark={{ color: 'coolGray.400' }}
                fontSize="sm"
                fontWeight="medium">
                邀請你的朋友們參加
              </Text>
            </HStack>
            <HStack flexWrap="wrap">
              {planOptionsList2.map((plan, index) => (
                <PlanDescriptionItem key={index} {...plan} />
              ))}
            </HStack>
          </Box>
        ) : (
          <></>
        )}
      </>
    );
  }
  type DeactivateForm = {
    reason: string;
    password: string;
  };

  const [deactivateForm, setDeactivateForm] = React.useState<DeactivateForm>({
    reason: '',
    password: '',
  });
  const handleFormUpdate = (name: string, value: string) =>
    setDeactivateForm((prev) => ({ ...prev, [name]: value }));

  const [image, setImage] = useState<string>('');
  const pickImage = async () => {
    const result: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const { reason, password } = deactivateForm;

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
    <DashboardLayout title="新增/管理裝備" showBackButton>
      {showCountry && (
        <VStack
          position="absolute"
          bg="white"
          bottom={0}
          left={0}
          w="100%"
          h="240"
          pb="30"
          px="6"
          shadow={2}
          zIndex={9}
          flex={1}
          justifyContent="center">
          <Picker
            mode="dialog"
            style={{ height: 100, flex: 1 }}
            accessibilityLabel="選擇分類"
            placeholder="選擇分類"
            selectedValue={country}
            onValueChange={(itemValue, itemIndex) => {
              setCountry(itemValue);
            }}>
            <Picker.Item label="露營" value="露營" />
            <Picker.Item label="車泊" value="車泊" />
            <Picker.Item label="水上活動" value="水上活動" />
            <Picker.Item label="釣魚" value="釣魚" />
            <Picker.Item label="親子" value="親子" />
            <Picker.Item label="其他" value="其他" />
          </Picker>
          <Button
            py={3}
            color="white"
            size="lg"
            rounded="full"
            bg={Colors.THEME_MAIN_COLOR}
            _pressed={{ bg: Colors.LOGO_COLOR_GREEN }}
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
          h="240"
          pb="30"
          px="6"
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
            <Picker.Item label="不確定" value="" />
            <Picker.Item label="海邊" value="海邊" />
            <Picker.Item label="平地" value="平地" />
            <Picker.Item label="300公尺以下" value="300" />
            <Picker.Item label="300公尺~500公尺" value="500" />
            <Picker.Item label="500公尺~800公尺" value="800" />
            <Picker.Item label="800公尺~1000公尺" value="1000" />
            <Picker.Item label="1000公尺以上" value="1100" />
          </Picker>
          <Button
            py={3}
            color="white"
            size="lg"
            rounded="full"
            bg={Colors.THEME_MAIN_COLOR}
            _pressed={{ bg: Colors.LOGO_COLOR_GREEN }}
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
          h="240"
          pb="30"
          px="6"
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
            py={3}
            color="white"
            size="lg"
            rounded="full"
            bg={Colors.THEME_MAIN_COLOR}
            _pressed={{ bg: Colors.LOGO_COLOR_GREEN }}
            onPress={() => {
              setShowCrowded(false);
            }}>
            選擇
          </Button>
        </VStack>
      )}
      <ScrollView
        onPress={() => {
          Keyboard.dismiss();
          setShowCountry(false);
        }}>
        <VStack
          space="0"
          px="4"
          py="4"
          alignItems="flex-start"
          justifyContent="stretch"
          backgroundColor="white">
          <Text
            w="100%"
            fontSize="xl"
            fontWeight="bold"
            _light={{ color: 'coolGray.700' }}
            _dark={{ color: 'coolGray.50' }}
            mt={2}
            mb={1}
            onPress={() => setShowCountry(!showCountry)}>
            分類
          </Text>
          <VStack
            backgroundColor="coolGray.50"
            borderColor="coolGray.50"
            borderRadius="10"
            borderWidth="0"
            py="4"
            px="2"
            my="2"
            w="100%">
            <Text w="100%" onPress={() => setShowCountry(!showCountry)}>
              {country}
            </Text>
          </VStack>
          <Text
            fontSize="xl"
            fontWeight="bold"
            _light={{ color: 'coolGray.700' }}
            _dark={{ color: 'coolGray.50' }}
            mb={0}>
            標題
          </Text>
          <Input
            isRequired
            backgroundColor="coolGray.50"
            borderColor="coolGray.50"
            borderRadius="10"
            borderWidth="0"
            py="4"
            my="2"
            placeholder="請輸入標題 (必填)"
            size="lg"
            defaultValue={formData.location}
            onChangeText={(location: string) => setFormData((prev) => ({ ...prev, location }))}
          />
          <Text
            fontSize="xl"
            fontWeight="bold"
            _light={{ color: 'coolGray.700' }}
            _dark={{ color: 'coolGray.50' }}
            mb={0}>
            品牌
          </Text>
          <Input
            isRequired
            backgroundColor="coolGray.50"
            borderColor="coolGray.50"
            borderRadius="10"
            borderWidth="0"
            py="4"
            my="2"
            placeholder="請輸入品牌 (選填)"
            size="lg"
            defaultValue={formData.location}
            onChangeText={(location: string) => setFormData((prev) => ({ ...prev, location }))}
          />
          <Text
            fontSize="xl"
            fontWeight="bold"
            _light={{ color: 'coolGray.700' }}
            _dark={{ color: 'coolGray.50' }}
            mb={0}>
            日期
          </Text>
          <Input
            isRequired
            backgroundColor="coolGray.50"
            borderColor="coolGray.50"
            borderRadius="10"
            borderWidth="0"
            py="4"
            my="2"
            placeholder="可輸入購入日期或取得日期"
            size="lg"
            defaultValue={formData.title}
            onChangeText={(title: string) => setFormData((prev) => ({ ...prev, title }))}
          />
          <Text
            fontSize="xl"
            fontWeight="bold"
            _light={{ color: 'coolGray.700' }}
            _dark={{ color: 'coolGray.50' }}
            mb={2}>
            其他
          </Text>
          <VStack w="100%" px="3" py="2" mb="2" borderRadius="10" bg="coolGray.50">
            <TextInput
              textAlignVertical="top"
              value={reason}
              onChangeText={(txt) => handleFormUpdate('reason', txt)}
              placeholderTextColor="coolGray.700"
              placeholder="其他需要紀錄的內容"
              multiline
              numberOfLines={4}
              style={{
                width: '100%',
                height: 84,
                textAlignVertical: 'top',
                backgroundColor: 'coolGray.300',
                color: 'coolGray.800',
              }}
            />
          </VStack>
          <Text
            fontSize="xl"
            fontWeight="bold"
            _light={{ color: 'coolGray.700' }}
            _dark={{ color: 'coolGray.50' }}
            mb={0}>
            選擇幾張好看的照片
          </Text>

          <Center
            width="100%"
            height="116"
            _light={{ borderColor: 'coolGray.300' }}
            _dark={{ borderColor: 'coolGray.700' }}
            borderWidth="1"
            borderStyle="dashed"
            mt={{ base: 3 }}>
            <Pressable alignItems="center" onPress={pickImage}>
              {image === '' ? (
                <>
                  <Icon as={MaterialIcons} name="cloud-upload" color="coolGray.400" size="6" />
                  <Text
                    fontSize="sm"
                    mt="0.5"
                    _light={{ color: 'coolGray.500' }}
                    _dark={{ color: 'coolGray.400' }}>
                    Upload
                  </Text>
                </>
              ) : (
                <Image source={{ uri: image }} width="100" height="100" />
              )}
            </Pressable>
          </Center>

          <Center width="100%">
            <Button
              width="100%"
              my="4"
              mb="20"
              mx="2"
              py={3}
              color="white"
              size="lg"
              rounded="full"
              bg={Colors.THEME_MAIN_COLOR}
              _pressed={{ bg: Colors.LOGO_COLOR_GREEN }}
              onPress={() => navigation.navigate(MAIN_STACK_COLLECTION)}>
              送出
            </Button>
          </Center>
        </VStack>
      </ScrollView>
    </DashboardLayout>
  );
}
