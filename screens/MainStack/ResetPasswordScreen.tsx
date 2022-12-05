import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  Button,
  Checkbox,
  Image,
  HStack,
  VStack,
  Text,
  Link,
  Input,
  Icon,
  Hidden,
  Center,
  FormControl,
  IInputProps,
  Box,
  useTheme,
  useColorMode,
  Pressable,
  IconButton,
} from 'native-base';
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { MAIN_STACK_LOGIN, MAIN_TAB_HOME } from '../../NavigationNames';
import { Nav } from '../../Props';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import Colors from '../../constants/Colors';
import GuestLayout from '../../layouts/GuestLayout';

function MobileHeader() {
  const navigation = useNavigation<Nav>();
  return (
    <Hidden from="md">
      <VStack px="4" mt="4" mb="5" space="9">
        <HStack space="2" alignItems="center">
          <Pressable
            onPress={() => {
              navigation.navigate(MAIN_STACK_LOGIN);
            }}>
            <Icon
              alignItems="center"
              justifyContent="center"
              size="6"
              as={MaterialIcons}
              name="keyboard-backspace"
              color={Colors.LOGO_COLOR_BROWN}
            />
          </Pressable>

          <Text color={Colors.LOGO_COLOR_BROWN} fontSize="lg">
            登入
          </Text>
        </HStack>
        <VStack space={0.5}>
          <Text fontSize="3xl" fontWeight="bold" color="amber.900">
            忘記密碼
          </Text>
          <Text
            fontSize="md"
            fontWeight="normal"
            _dark={{
              color: 'coolGray.50',
            }}
            _light={{
              color: Colors.LOGO_COLOR_BROWN,
            }}>
            填寫必要資訊後重設密碼
          </Text>
        </VStack>
      </VStack>
    </Hidden>
  );
}

function SideContainerWeb() {
  return (
    <Center
      flex="1"
      _light={{ bg: 'primary.900' }}
      _dark={{ bg: 'primary.700' }}
      borderTopLeftRadius={{ md: 'md' }}
      borderBottomLeftRadius={{ md: 'md' }}>
      <Image
        h="24"
        size="80"
        alt="NativeBase Startup+ "
        resizeMode="contain"
        source={require('./images/logo.png')}
      />
    </Center>
  );
}
const FormInput = ({
  children,
  ...props
}: IInputProps & {
  label?: string;
  labelBGColor?: string;
  labelColor?: string;
  containerWidth?: string | number;
  children?: JSX.Element | JSX.Element[];
}) => (
  <VStack mb="6">
    <FloatingLabelInput {...props} />
    {children}
  </VStack>
);
const SignUpForm = () => {
  const navigation = useNavigation<Nav>();
  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  type FormData = {
    email: string;
    password: string;
    confirmPassword: string;
  };
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  return (
    <FormControl>
      <HStack alignItems="flex-end" mb="2">
        <Text fontSize="lg" fontWeight="bold" color="coolGray.700" mb={0} mr={2}>
          Email
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
      <Center width="100%">
        <Button
          width="100%"
          mt="10"
          my="4"
          mb="20"
          mx="2"
          py={3}
          color="white"
          size="lg"
          rounded="full"
          bg={Colors.THEME_MAIN_COLOR}
          _pressed={{ bg: Colors.LOGO_COLOR_GREEN }}
          onPress={() => {
            navigation.navigate(MAIN_TAB_HOME);
          }}>
          送出
        </Button>
      </Center>
    </FormControl>
  );
};

function SignUpFormComponent() {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: Colors.THEME_MAIN_BACKGROUND,
      }}
      bounces={false}>
      <MobileHeader />
      <Box
        flex="1"
        px={{ base: 4, md: 8 }}
        py="8"
        _light={{ bg: 'white' }}
        _dark={{ bg: 'coolGray.800' }}
        justifyContent="space-between"
        borderTopRightRadius={{ base: '2xl', md: 'md' }}
        borderBottomRightRadius={{ base: '0', md: 'md' }}
        borderTopLeftRadius={{ base: '2xl', md: '0' }}>
        <SignUpForm />
      </Box>
    </KeyboardAwareScrollView>
  );
}

export default function ResetPasswordScreen() {
  return (
    <GuestLayout>
      <Box flex="1">
        <SignUpFormComponent />
      </Box>
    </GuestLayout>
  );
}
