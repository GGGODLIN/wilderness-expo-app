import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  Button,
  HStack,
  VStack,
  Text,
  Link,
  Checkbox,
  Divider,
  Image,
  useColorModeValue,
  IconButton,
  Icon,
  Center,
  Hidden,
  Box,
  FormControl,
  IInputProps,
  Input,
} from 'native-base';
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
  MAIN_STACK_REGISTER,
  MAIN_STACK_RESET_PASSWORD,
  MAIN_STACK_TABS,
} from '../../NavigationNames';
import { Nav } from '../../Props';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import Colors from '../../constants/Colors';
import GuestLayout from '../../layouts/GuestLayout';

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

const SignInForm = () => {
  const navigation = useNavigation<Nav>();
  type FormData = {
    email: string;
    password: string;
  };
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [showPass, setShowPass] = React.useState(false);

  return (
    <FormControl>
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
      <HStack justifyContent="space-between" mb="10">
        <Link
          _text={{
            fontSize: 'sm',
            fontWeight: 'bold',
            textDecoration: 'none',
          }}
          color={Colors.LOGO_COLOR_GREEN}
          onPress={() => {
            navigation.navigate(MAIN_STACK_REGISTER);
          }}>
          註冊新帳號
        </Link>
        <Link
          ml="auto"
          _text={{
            fontSize: { base: 'sm', md: 'xs' },
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
          }}
          onPress={() => {
            navigation.navigate(MAIN_STACK_RESET_PASSWORD);
          }}>
          忘記密碼?
        </Link>
      </HStack>
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
          onPress={() => {
            navigation.navigate(MAIN_STACK_TABS);
          }}>
          登入
        </Button>
      </Center>
    </FormControl>
  );
};

const SignInComponent = () => {
  const navigation = useNavigation<Nav>();
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      style={{ flex: 1, backgroundColor: Colors.THEME_MAIN_BACKGROUND }}
      bounces={false}>
      <MobileHeader />
      <Box
        px="4"
        py="6"
        flex={1}
        _light={{ bg: 'white' }}
        _dark={{ bg: 'coolGray.800' }}
        borderTopLeftRadius={{ base: '2xl', md: 0 }}
        borderTopRightRadius={{ base: '2xl', md: 'md' }}
        borderBottomRightRadius={{ base: 'none', md: 'md' }}>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          _light={{ color: 'coolGray.800' }}
          _dark={{ color: 'coolGray.50' }}
          mb={4}>
          登入會員
        </Text>
        <SignInForm />
      </Box>
    </KeyboardAwareScrollView>
  );
};

function MobileHeader() {
  return (
    <Hidden from="md">
      <VStack px="4" mt="4" mb="5" space="9">
        <VStack space={0.5}>
          <Center>
            <Image
              h="10"
              w="56"
              alt="玩野覓境"
              resizeMode="contain"
              source={require('../../assets/logo.png')}
            />
          </Center>
        </VStack>
      </VStack>
    </Hidden>
  );
}

export default function LoginScreen() {
  return (
    <GuestLayout>
      <SignInComponent />
    </GuestLayout>
  );
}
