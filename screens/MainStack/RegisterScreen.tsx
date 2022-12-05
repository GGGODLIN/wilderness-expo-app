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
            跨出好野人的第一步
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
            註冊會員
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
      <HStack alignItems="flex-end" mb="2">
        <Text fontSize="lg" fontWeight="bold" color="coolGray.700" mb={0} mr={2}>
          設定密碼
        </Text>
      </HStack>
      <Input
        backgroundColor="coolGray.50"
        borderColor="coolGray.50"
        borderRadius="10"
        borderWidth="0"
        py="4"
        mb="2"
        size="lg"
        isRequired
        secureTextEntry={!showPass}
        placeholder="請輸入密碼"
        defaultValue={formData.password}
        onChangeText={(newPassword: string) =>
          setFormData((prev) => ({ ...prev, password: newPassword }))
        }
        InputRightElement={
          <IconButton
            mr="1"
            variant="unstyled"
            icon={
              <Icon
                size="5"
                color="coolGray.400"
                as={MaterialIcons}
                name={showPass ? 'visibility' : 'visibility-off'}
              />
            }
            onPress={() => {
              setShowPass(!showPass);
            }}
          />
        }
      />
      <Input
        backgroundColor="coolGray.50"
        borderColor="coolGray.50"
        borderRadius="10"
        borderWidth="0"
        py="4"
        mb="2"
        size="lg"
        isRequired
        secureTextEntry={!showPass}
        placeholder="請再輸入一次密碼"
        defaultValue={formData.password}
        onChangeText={(newPassword: string) =>
          setFormData((prev) => ({ ...prev, password: newPassword }))
        }
        InputRightElement={
          <IconButton
            mr="1"
            variant="unstyled"
            icon={
              <Icon
                size="5"
                color="coolGray.400"
                as={MaterialIcons}
                name={showPass ? 'visibility' : 'visibility-off'}
              />
            }
            onPress={() => {
              setShowPass(!showPass);
            }}
          />
        }
      />
      <Checkbox
        _dark={{
          value: 'demo',
          _checked: {
            value: 'demo',
            bg: 'primary.700',
            borderColor: 'primary.700',
            _icon: { color: 'white' },
          },
        }}
        _light={{
          value: 'demo',
          _checked: {
            value: 'demo',
            bg: 'primary.900',
            borderColor: 'primary.900',
          },
        }}
        defaultIsChecked
        value="demo"
        accessibilityLabel="Remember me">
        <HStack alignItems="center">
          <Text
            fontSize="sm"
            fontWeight="normal"
            _light={{ color: 'coolGray.800' }}
            _dark={{ color: 'coolGray.400' }}
            pl="2">
            我已閱讀並同意{' '}
          </Text>
          <Link
            href="https://www.google.com.tw/"
            _text={{
              fontSize: 'sm',
              fontWeight: 'bold',
              textDecoration: 'none',
            }}
            _light={{
              _text: {
                color: 'primary.900',
              },
            }}
            _dark={{
              _text: {
                color: 'primary.500',
                fontSize: 'sm',
                fontWeight: 'medium',
              },
            }}>
            使用者條款{' '}
          </Link>
          <Text fontSize="sm" _light={{ color: 'coolGray.800' }} _dark={{ color: 'coolGray.300' }}>
            &{' '}
          </Text>
          <Link
            href="https://www.google.com.tw/"
            _text={{
              fontSize: 'sm',
              fontWeight: 'bold',
              textDecoration: 'none',
            }}
            _light={{
              _text: {
                color: 'primary.900',
              },
            }}
            _dark={{
              _text: {
                color: 'primary.500',
              },
            }}>
            隱私權政策
          </Link>
        </HStack>
      </Checkbox>
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
          註冊
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

export default function RegisterScreen() {
  return (
    <GuestLayout>
      <Box flex="1">
        <SignUpFormComponent />
      </Box>
    </GuestLayout>
  );
}
