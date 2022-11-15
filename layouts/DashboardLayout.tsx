import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Box, VStack, StatusBar, Icon, Text, IconButton, Flex, Center } from 'native-base';
import React from 'react';

import { PROFILE_STACK_NOTIFICATIONS } from '../NavigationNames';
import { Nav } from '../Props';
import Colors from '../constants/Colors';

type DashboardLayoutProps = {
  maxWidth?: number;
  header?: {
    searchbar: boolean;
  };
  mobileHeader?: {
    backButton: boolean;
  };
  title: string;
  subTitle?: string;
  styleMode?: string;
  customIcon?: React.ReactNode;
  customTitle?: React.ReactNode;
  children: React.ReactNode;
  showGroupInfoHeader?: boolean;
  displayBackIcon?: boolean;
  rightPanelMobileHeader?: boolean;
  showBackButton?: boolean;
};

type MainContentProps = DashboardLayoutProps;

type MobileHeaderProps = {
  title: string;
  subTitle?: string;
  backButton?: boolean;
  rightPanel?: boolean;
  customIcon?: React.ReactNode;
  customTitle?: React.ReactNode;
  styleMode?: string;
};

function MainContent(props: MainContentProps) {
  return (
    <Box
      style={{ position: 'absolute', bottom: 0, top: 0, right: 0, left: 0 }}
      maxW={props.maxWidth}
      width="100%">
      {props.children}
    </Box>
  );
}

export function MobileHeader(props: MobileHeaderProps) {
  const navigation = useNavigation<Nav>();
  return (
    <Flex direction="row" zIndex={9} bg={Colors.THEME_MAIN_BACKGROUND} minH={16}>
      {props.backButton && (
        <IconButton
          px={4}
          onPress={() => navigation.goBack()}
          variant="ghost"
          _icon={{ color: Colors.THEME_MAIN_COLOR }}
          icon={<Icon size="5" as={AntDesign} name="left" />}
        />
      )}
      <Box flex={1}>
        {props.customTitle ? (
          <Box position="absolute" top={0} bottom={0} right={0} left={0}>
            {props.customTitle}
          </Box>
        ) : (
          <Center position="absolute" top={0} bottom={0} left={props.backButton ? 0 : 6}>
            <Text fontSize="lg" color={Colors.THEME_MAIN_COLOR}>
              {props.title}
            </Text>
          </Center>
        )}
      </Box>
      {/* right panel */}
      {/* TODO notifaction count */}
      {props.rightPanel && (
        <IconButton
          variant="ghost"
          onPress={() => {
            navigation.navigate(PROFILE_STACK_NOTIFICATIONS);
          }}
          _icon={{ color: Colors.THEME_MAIN_COLOR }}
          icon={<Icon size="5" as={FontAwesome} name="bell" />}
        />
      )}
      {props.customIcon}
    </Flex>
  );
}

export default function DashboardLayout({ maxWidth = 1016, ...props }: DashboardLayoutProps) {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <Box safeAreaTop bg={Colors.THEME_MAIN_BACKGROUND} />
      <VStack flex={1} bg={Colors.THEME_MAIN_BACKGROUND}>
        <MobileHeader
          title={props.title}
          subTitle={props.subTitle}
          backButton={props.showBackButton}
          rightPanel={props.rightPanelMobileHeader}
          customIcon={props.customIcon}
          customTitle={props.customTitle}
        />
        <Box flex={1} safeAreaBottom>
          <MainContent {...props} />
        </Box>
      </VStack>
    </>
  );
}
