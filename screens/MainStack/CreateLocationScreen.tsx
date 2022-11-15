import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
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
} from 'native-base';
import React, { useState } from 'react';

import { MAIN_STACK_POST } from '../../NavigationNames';
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
    email: string;
    password: string;
    birthday?: Date;
  };
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

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
    active: boolean;
  };
  const icons: Icon[] = [
    {
      name: 'caravan',
      text: '收費營地',
      active: true,
    },
    {
      name: 'caravan',
      text: '公共營地',
      active: false,
    },
    {
      name: 'caravan',
      text: '露營車',
      active: false,
    },
    {
      name: 'caravan',
      text: '露營車',
      active: false,
    },
    {
      name: 'caravan',
      text: '無提供',
      active: false,
    },
    {
      name: 'caravan',
      text: '有提供',
      active: true,
    },
  ];

  return (
    <DashboardLayout title="新增地點" showBackButton>
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
            地點名稱
          </Text>
          <Input
            isRequired
            backgroundColor="white"
            borderColor="white"
            borderTopWidth="0"
            borderRightWidth="0"
            borderLeftWidth="0"
            borderBottomColor="coolGray.100"
            borderBottomWidth="2"
            py="4"
            mb="2"
            placeholder="怎麼稱呼這個地方 (必填)"
            size="lg"
            defaultValue={formData.email}
            onChangeText={(email: string) => setFormData((prev) => ({ ...prev, email }))}
            style={{
              backgroundColor: 'white',
              borderColor: 'white',
              borderBottomColor: 'coolGray.900',
            }}
          />
          <Text
            fontSize="xl"
            fontWeight="bold"
            _light={{ color: 'coolGray.700' }}
            _dark={{ color: 'coolGray.50' }}
            mb={2}>
            地點介紹
          </Text>
          <TextArea
            mb="4"
            bg="white"
            fontSize="14"
            lineHeight="21"
            textAlignVertical="top"
            placeholderTextColor="coolGray.500"
            _light={{ color: 'coolGray.800' }}
            _dark={{ color: 'coolGray.50' }}
            value={reason}
            onChangeText={(txt) => handleFormUpdate('reason', txt)}
            placeholder="如何描述這個地方 (必填)"
            h="84"
            autoCompleteType={undefined}
          />
          <Text
            fontSize="xl"
            fontWeight="bold"
            _light={{ color: 'coolGray.700' }}
            _dark={{ color: 'coolGray.50' }}
            mb={0}>
            選擇幾張好看的照片 (場景照優先)
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
          <Text
            mt="4"
            fontSize="xl"
            fontWeight="bold"
            _light={{ color: 'coolGray.700' }}
            _dark={{ color: 'coolGray.50' }}
            mb={0}>
            選擇此地點提供與未提供的設施
          </Text>
          <HStack justifyContent="space-between">
            <VStack w="100%">
              <HStack space={6} justifyContent="space-between" alignItems="center" pt={4}>
                <Stack flexWrap="wrap" direction="row" space="2">
                  {icons.map((item, index) => (
                    <HStack
                      key={'icon_' + index}
                      overflow="visible"
                      mx={0}
                      mb={2}
                      alignItems="center"
                      justifyContent="center">
                      <IconButton
                        variant="unstyled"
                        icon={
                          <Icon
                            as={FontAwesome5}
                            name={item.name}
                            _light={{
                              color: item.active ? 'coolGray.500' : 'coolGray.200',
                            }}
                            _dark={{ color: 'coolGray.50' }}
                            size={4}
                            textAlign="center"
                            alignSelf="center"
                          />
                        }
                      />
                      <Text
                        fontSize={{ base: 'sm', md: 'sm' }}
                        _light={{ color: item.active ? 'coolGray.800' : 'coolGray.300' }}
                        _dark={{ color: { base: 'coolGray.50', md: 'coolGray.400' } }}
                        textAlign="center">
                        {item.text}
                      </Text>
                    </HStack>
                  ))}
                </Stack>
                {/*
                <FlatList
                  nestedScrollEnabled
                  numColumns={4}
                  data={icons}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item, index }) => (
                    <HStack
                      key={'icon_' + index}
                      overflow="visible"
                      mx={2}
                      mb={4}
                      alignItems="center"
                      justifyContent="center">
                      <IconButton
                        variant="unstyled"
                        icon={
                          <Icon
                            as={FontAwesome5}
                            name={item.name}
                            _light={{
                              color: item.active ? 'coolGray.500' : 'coolGray.200',
                            }}
                            _dark={{ color: 'coolGray.50' }}
                            size={4}
                            textAlign="center"
                            alignSelf="center"
                          />
                        }
                      />
                      <Text
                        fontSize={{ base: 'sm', md: 'sm' }}
                        _light={{ color: item.active ? 'coolGray.800' : 'coolGray.300' }}
                        _dark={{ color: { base: 'coolGray.50', md: 'coolGray.400' } }}
                        textAlign="center">
                        {item.text}
                      </Text>
                    </HStack>
                  )}
                  keyExtractor={(item, index) => 'home-post-key-' + index}
                />
                      */}
              </HStack>
            </VStack>
          </HStack>
          <Button
            variant="solid"
            size="lg"
            mt="5"
            style={{ backgroundColor: Colors.LOGO_COLOR_BROWN }}
            onPress={() => navigation.navigate(MAIN_STACK_POST)}>
            送出
          </Button>
          <Text
            mt="2"
            fontSize="sm"
            fontWeight="normal"
            _light={{ color: 'coolGray.500' }}
            _dark={{ color: 'coolGray.50' }}
            mb={0}>
            若審核成功將會通知您，並標記為貢獻者
          </Text>
        </VStack>
      </Box>
    </DashboardLayout>
  );
}
