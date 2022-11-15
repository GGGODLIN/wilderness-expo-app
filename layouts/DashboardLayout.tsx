import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Box, VStack, StatusBar, HStack, Icon, Text, IconButton, Badge } from 'native-base';
import { position } from 'native-base/lib/typescript/theme/styled-system';
import React, { useState } from 'react';

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
  const [bell, setBell] = useState(true);

  return (
    <Box px="0" pt="2" pb="0" zIndex={9} bg={Colors.THEME_MAIN_BACKGROUND}>
      <HStack space="2" justifyContent="space-between">
        <HStack flex="1" space="2" justifyContent="space-between" alignItems="center">
          <HStack alignItems="center" space="1" mb={!props.customTitle ? 2 : 0}>
            {props.backButton && (
              <IconButton
                m="0"
                p="0"
                pl="3"
                onPress={() => navigation.goBack()}
                variant="ghost"
                colorScheme="light"
                _icon={{ color: Colors.THEME_MAIN_COLOR }}
                icon={<Icon size="5" as={AntDesign} name="left" />}
              />
            )}
            <VStack>
              {props.customTitle ? (
                props.customTitle
              ) : (
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  marginLeft={props.backButton ? 0 : 5}
                  color={Colors.THEME_MAIN_COLOR}>
                  {props.title}
                </Text>
              )}
              {props.subTitle ? (
                <Text color="coolGray.50" fontSize="sm" fontWeight="normal">
                  {props.subTitle}
                </Text>
              ) : undefined}
            </VStack>
          </HStack>
          {/* right panel */}
          <HStack space="0">
            {props.rightPanel && (
              <Box alignItems="center">
                <VStack alignItems="center">
                  {/*
                    <Badge
                      colorScheme="danger"
                      rounded="full"
                      mb={-4}
                      mr={1}
                      zIndex={1}
                      variant="solid"
                      alignSelf="flex-end"
                      _text={{
                        fontSize: 12,
                      }}>
                      9
                    </Badge>
                    */}
                  <IconButton
                    m="0"
                    p="0"
                    pb="2"
                    pr="6"
                    variant="unstyled"
                    colorScheme="dark"
                    onPress={() => {
                      navigation.navigate(PROFILE_STACK_NOTIFICATIONS);
                      setBell(!bell);
                    }}
                    icon={
                      <Icon
                        size="5"
                        name="bell"
                        as={FontAwesome}
                        color={bell ? Colors.THEME_MAIN_COLOR : 'coolGray.400'}
                      />
                    }
                  />
                </VStack>
              </Box>
            )}
            {props.customIcon}
          </HStack>
        </HStack>
      </HStack>
    </Box>
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
