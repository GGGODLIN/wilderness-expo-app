import { useNavigation } from '@react-navigation/native';
import {
  Box,
  VStack,
  Button,
  Image,
  Center,
  Hidden,
  Text,
  Modal,
  HStack,
  Radio,
  Link,
  useDisclose,
} from 'native-base';
import React from 'react';
import { ImageBackground } from 'react-native';

import {
  MAIN_STACK_LOGIN,
  MAIN_STACK_REGISTER,
  MAIN_STACK_RESET_PASSWORD,
  MAIN_STACK_TABS,
} from '../../NavigationNames';
import { Nav } from '../../Props';
import Colors from '../../constants/Colors';
import GuestLayout from '../../layouts/GuestLayout';

export default function CoverScreen() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclose(true);

  function ActionButtons() {
    const navigation = useNavigation<Nav>();

    return (
      <VStack space={4} mt={10} px="20%">
        <Button
          py={3}
          color="white"
          size="lg"
          rounded="full"
          bg={Colors.THEME_MAIN_COLOR}
          _pressed={{ bg: Colors.LOGO_COLOR_GREEN }}
          onPress={() => {
            navigation.navigate(MAIN_STACK_TABS);
          }}>
          開始
        </Button>
      </VStack>
    );
  }
  function HeaderLogo() {
    return (
      <Box alignItems="center" justifyContent="center" mx="20%">
        <Image alt="玩野秘境" resizeMode="contain" source={require('../../assets/logo.png')} />
      </Box>
    );
  }

  return (
    <Center w="100%" flex={1} bg={Colors.LOGO_COLOR_WHITE_BACKGROUND}>
      <Box
        maxW="500"
        w="100%"
        height={{ md: '544' }}
        px={{ base: 4, md: 8 }}
        bg={{ md: 'primary.900' }}
        justifyContent="center">
        <HeaderLogo />
        <ActionButtons />
      </Box>
    </Center>
  );
}
