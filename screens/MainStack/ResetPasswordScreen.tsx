import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  VStack,
  Box,
  HStack,
  Icon,
  Text,
  Button,
  Image,
  Center,
  Hidden,
  useColorModeValue,
  useColorMode,
  useTheme,
  Pressable,
} from 'native-base';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { MAIN_STACK_LOGIN } from '../../NavigationNames';
import { Nav } from '../../Props';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import GuestLayout from '../../layouts/GuestLayout';

function Header() {
  const navigation = useNavigation<Nav>();
  return (
    <HStack space="2" px="1" py="4" alignItems="center" style={{ backgroundColor: '#fcd34d' }}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon
          alignItems="center"
          justifyContent="center"
          size="6"
          as={MaterialIcons}
          name="keyboard-backspace"
          color="amber.900"
        />
      </Pressable>
      <Text color="amber.900" fontSize="lg">
        Forgot Password
      </Text>
    </HStack>
  );
}

function SideContainerWeb() {
  const key = useColorModeValue('1', '2');

  return (
    <Center
      flex={{ md: 1 }}
      pt={{ base: 9, md: '190' }}
      pb={{ base: '52', md: '190' }}
      px={{ base: 4, md: '50' }}
      _light={{ bg: { base: 'white', md: 'primary.900' } }}
      _dark={{ bg: { base: 'coolGray.800', md: 'primary.700' } }}
      borderTopLeftRadius={{ md: 'md' }}
      borderBottomLeftRadius={{ md: 'md' }}>
      <Image
        resizeMode="contain"
        height={40}
        width={56}
        key={key}
        _light={{ source: require('./images/WebLightMode.png') }}
        _dark={{ source: require('./images/WebDarkMode.png') }}
        alt="Alternate Text"
      />
    </Center>
  );
}
function MobileScreenImage() {
  const key = useColorModeValue('1', '2');

  return (
    <Center
      py={{ base: 12, md: '190' }}
      px={{ base: 4, md: 12 }}
      _light={{ bg: { base: 'white', md: 'primary.900' } }}
      _dark={{ bg: { base: 'coolGray.800', md: 'primary.700' } }}
      borderTopRightRadius={{ md: 'md' }}
      borderBottomRightRadius={{ md: 'md' }}
      mb="-0.5">
      <Image
        resizeMode="contain"
        height={40}
        width={56}
        key={key}
        _light={{ source: require('./images/MobileLightMode.png') }}
        _dark={{ source: require('./images/MobileDarkMode.png') }}
        alt="Alternate Text"
      />
    </Center>
  );
}

export default function ForgotPassword() {
  const navigation = useNavigation<Nav>();
  const [text, setText] = React.useState('');
  const { colorMode } = useColorMode();
  const { colors } = useTheme();

  return (
    <>
      <GuestLayout>
        <Box _light={{ bg: 'white' }} _dark={{ bg: 'coolGray.800' }} flex={1}>
          <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ flex: 1, backgroundColor: '#fcd34d' }}
            bounces={false}
            enableOnAndroid>
            <VStack
              flexDirection={{ md: 'row' }}
              flex={1}
              _light={{ bg: 'primary.900' }}
              _dark={{ bg: 'coolGray.900' }}>
              <Hidden from="md">
                <Header />
              </Hidden>
              <Hidden till="md">
                <SideContainerWeb />
              </Hidden>
              <Hidden from="md">
                <MobileScreenImage />
              </Hidden>
              <Box
                pt={{ base: '0', md: '8' }}
                pb="8"
                px={{ base: '4', md: '8' }}
                _light={{ bg: 'white' }}
                _dark={{ bg: 'coolGray.800' }}
                flex="1"
                borderTopRightRadius={{ md: 'md' }}
                borderBottomRightRadius={{ md: 'md' }}>
                <Box flex={1} justifyContent="space-between">
                  <Box>
                    <VStack space={4} alignItems={{ md: 'left', base: 'center' }}>
                      <Text
                        fontSize={{ base: 'xl', md: '2xl' }}
                        fontWeight="bold"
                        _dark={{ color: 'coolGray.50' }}
                        _light={{ color: 'coolGray.800' }}
                        textAlign={{ base: 'center', md: 'left' }}>
                        忘記密碼?
                      </Text>
                      <Text
                        _light={{ color: 'coolGray.800' }}
                        _dark={{ color: 'coolGray.400' }}
                        fontSize="sm"
                        fontWeight="normal"
                        textAlign={{ base: 'center', md: 'left' }}>
                        請填寫您註冊時使用的行動電話或 Email
                        ，我們將會寄送一封信件給您，請點擊信件中的連結來重設密碼。
                      </Text>
                    </VStack>
                    <VStack space="8" mt="9">
                      <FloatingLabelInput
                        isRequired
                        label="行動電話 或 Email"
                        labelColor={colors.coolGray[400]}
                        labelBGColor={colorMode === 'light' ? 'white' : colors.coolGray[800]}
                        defaultValue={text}
                        onChangeText={(txt: string) => setText(txt)}
                      />
                      <Button
                        variant="solid"
                        size="lg"
                        onPress={() => {
                          navigation.navigate(MAIN_STACK_LOGIN);
                        }}
                        style={{ backgroundColor: '#d97706' }}>
                        送出
                      </Button>
                    </VStack>
                  </Box>
                </Box>
              </Box>
            </VStack>
          </KeyboardAwareScrollView>
        </Box>
      </GuestLayout>
    </>
  );
}
