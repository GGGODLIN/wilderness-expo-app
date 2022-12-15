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

export default function EditProfileScreen({ navigation }: NavigationProps): JSX.Element {
  const FormComponent = () => {
    const toast = useToast();
    const navigation = useNavigation<Nav>();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false); //TIME PICKER

    type FormData = {
      email: string;
      nick: string;
      description: string;
    };
    const [formData, setFormData] = useState<FormData>({
      email: '',
      nick: '',
      description: '',
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
            defaultValue={formData.email}
            onChangeText={(email: string) => setFormData((prev) => ({ ...prev, email }))}
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
            defaultValue={formData.nick}
            onChangeText={(nick: string) => setFormData((prev) => ({ ...prev, nick }))}
          />
          <HStack alignItems="flex-end">
            <Text fontSize="lg" fontWeight="bold" color="coolGray.700" mb={0} mr={2}>
              個人簡介
            </Text>
            <Text fontSize="sm" fontWeight="normal" color="coolGray.500">
              選填
            </Text>
          </HStack>
          <VStack w="100%" px="3" py="2" mb="2" borderRadius="10" bg="coolGray.50">
            <TextInput
              textAlignVertical="top"
              value={formData.description}
              onChangeText={(description: string) =>
                setFormData((prev) => ({ ...prev, description }))
              }
              placeholderTextColor="coolGray.700"
              placeholder="如何描述這個地方 (必填)"
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
