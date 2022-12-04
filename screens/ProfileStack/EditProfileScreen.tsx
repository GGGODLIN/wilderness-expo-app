import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
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
  useToast,
} from 'native-base';
import React, { useState } from 'react';
import { Keyboard, Dimensions, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
  MAIN_STACK_POST_DRAWER,
  MAIN_STACK_PROFILE,
  PROFILE_STACK_EDIT_PROFILE,
} from '../../NavigationNames';
import { Nav, NavigationProps } from '../../Props';
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

export default function EditProfileScreen({ navigation }: NavigationProps): JSX.Element {
  const FormComponent = () => {
    const toast = useToast();
    const navigation = useNavigation<Nav>();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false); //TIME PICKER

    type FormData = {
      title: string;
      email: string;
      password: string;
    };
    const [formData, setFormData] = useState<FormData>({
      title: '',
      email: '',
      password: '',
    });

    return (
      <VStack>
        <VStack mt={0} space={2}>
          <HStack alignItems="flex-end">
            <Text fontSize="lg" fontWeight="bold" color="coolGray.700" mb={0} mr={2}>
              Email
            </Text>
            <Text fontSize="sm" fontWeight="normal" color="coolGray.500">
              必填
            </Text>
          </HStack>
          <Input
            type="email"
            maxLength={70}
            isRequired
            backgroundColor="coolGray.50"
            borderColor="coolGray.50"
            borderRadius="10"
            borderWidth="0"
            py="4"
            mb="2"
            placeholder="請輸入電子郵件"
            size="lg"
            defaultValue={formData.title}
            onChangeText={(title: string) => setFormData((prev) => ({ ...prev, title }))}
          />
          <HStack alignItems="flex-end">
            <Text fontSize="lg" fontWeight="bold" color="coolGray.700" mb={0} mr={2}>
              暱稱
            </Text>
            <Text fontSize="sm" fontWeight="normal" color="coolGray.500">
              必填
            </Text>
          </HStack>
          <Input
            maxLength={70}
            isRequired
            backgroundColor="coolGray.50"
            borderColor="coolGray.50"
            borderRadius="10"
            borderWidth="0"
            py="4"
            mb="2"
            placeholder="請輸入暱稱"
            size="lg"
            defaultValue={formData.title}
            onChangeText={(title: string) => setFormData((prev) => ({ ...prev, title }))}
          />

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
              onPress={() => navigation.goBack()}>
              儲存
            </Button>
          </Center>
        </VStack>
      </VStack>
    );
  };

  return (
    <DashboardLayout title="修改資料" showBackButton>
      <KeyboardAwareScrollView bounces={false}>
        <VStack px="4" py="5" bg="white" space="6" flex={1} minHeight="700">
          <FormComponent />
        </VStack>
      </KeyboardAwareScrollView>
    </DashboardLayout>
  );
}
