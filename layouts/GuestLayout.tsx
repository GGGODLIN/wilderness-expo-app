import { Box, StatusBar, Center, Stack } from 'native-base';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Colors from '../constants/Colors';

type GuestLayoutProps = {
  children: React.ReactNode;
};

export default function GuestLayout(props: GuestLayoutProps) {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <Box
        safeAreaTop
        _light={{ bg: Colors.LOGO_COLOR_WHITE_BACKGROUND }}
        _dark={{ bg: 'coolGray.900' }}
      />
      <Center
        flex="1"
        my="auto"
        p={{ md: 8 }}
        _dark={{ bg: 'coolGray.900' }}
        _light={{ bg: { md: Colors.LOGO_COLOR_WHITE, base: Colors.LOGO_COLOR_WHITE } }}>
        <Stack
          w="100%"
          maxW={{ md: '1016' }}
          flex={{ base: '1', md: undefined }}
          direction={{ base: 'column', md: 'row' }}>
          {props.children}
        </Stack>
      </Center>
    </>
  );
}
