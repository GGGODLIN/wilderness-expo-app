import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import {
  Button,
  HStack,
  Text,
  Icon,
  Input,
  Pressable,
  Box,
  Center,
  ScrollView,
  VStack,
  Select,
  TextArea,
} from 'native-base';
import React, { useState } from 'react';
import { Platform } from 'react-native';

import { MAIN_STACK_POST } from '../../../NavigationNames';
import { NavigationProps } from '../../../Props';
import NativeMap from '../../../components/NativeMap';
import Colors from '../../../constants/Colors';
import DashboardLayout from '../../../layouts/DashboardLayout';

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

export default function PostReportScreen({ navigation }: NavigationProps): JSX.Element {
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

  const { reason, password } = deactivateForm;
  return (
    <DashboardLayout title="檢舉" showBackButton>
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
            mb={2}>
            請輸入原因
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
            placeholder="內文 (必填)"
            h="84"
            autoCompleteType={undefined}
          />
          <Button
            variant="solid"
            size="lg"
            mt="auto"
            style={{ backgroundColor: Colors.LOGO_COLOR_BROWN }}
            onPress={() => navigation.navigate(MAIN_STACK_POST)}>
            送出
          </Button>
        </VStack>
      </Box>
    </DashboardLayout>
  );
}
