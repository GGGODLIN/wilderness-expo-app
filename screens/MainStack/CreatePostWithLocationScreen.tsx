import { MaterialIcons } from '@expo/vector-icons';
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
} from 'native-base';
import React, { useState } from 'react';
import { Keyboard, Dimensions, ScrollView, TouchableOpacity, TextInput } from 'react-native';

import { MAIN_STACK_POST_DRAWER } from '../../NavigationNames';
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

export default function CreatePostWithLocationScreen({ navigation }: NavigationProps): JSX.Element {
  type FormData = {
    title: string;
    content: string;
    birthday?: Date;
  };
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
  });

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

  const { reason, password } = deactivateForm;
  return (
    <DashboardLayout title="打卡" showBackButton>
      <ScrollView
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <Box
          px={{ md: 0, xl: 35 }}
          py={{ md: 8 }}
          flex={1}
          _light={{ bg: 'white' }}
          _dark={{ bg: 'coolGray.800' }}>
          <VStack space="0" px="4" py="4">
            <Text
              fontSize="xl"
              fontWeight="bold"
              _light={{ color: 'coolGray.700' }}
              _dark={{ color: 'coolGray.50' }}
              mb={0}>
              位置
            </Text>
            <Input
              readonly
              editable={false}
              backgroundColor="coolGray.50"
              borderColor="coolGray.50"
              borderRadius="10"
              borderWidth="0"
              py="4"
              my="2"
              placeholder=""
              value="好風景營地"
              size="lg"
            />
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
              defaultValue={formData.title}
              onChangeText={(title: string) => setFormData((prev) => ({ ...prev, title }))}
            />
            <Text
              fontSize="xl"
              fontWeight="bold"
              _light={{ color: 'coolGray.700' }}
              _dark={{ color: 'coolGray.50' }}
              mb={2}>
              分享內容
            </Text>
            <VStack w="100%" px="3" py="2" mb="2" borderRadius="10" bg="coolGray.50">
              <TextInput
                textAlignVertical="top"
                value={reason}
                onChangeText={(txt) => handleFormUpdate('reason', txt)}
                placeholderTextColor="coolGray.700"
                placeholder="想要分享的內容"
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
                onPress={() => navigation.navigate(MAIN_STACK_POST_DRAWER)}>
                發表
              </Button>
            </Center>
          </VStack>
        </Box>
      </ScrollView>
    </DashboardLayout>
  );
}
