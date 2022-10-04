import {
  VStack,
  HStack,
  Center,
  Box,
  Text,
  Circle,
  View,
  ScrollView,
  Pressable,
} from 'native-base';
import React from 'react';

import { MAIN_STACK_EVENT_DETAILS } from '../../NavigationNames';
import { NavigationProps } from '../../Props';
import Tab from '../../components/TopTab/Tab';
import TopTabs from '../../components/TopTab/TopTabs';
import GuestLayout from '../../layouts/GuestLayout';

export default function MainTabClubsScreen({ navigation }: NavigationProps): JSX.Element {
  return (
    <GuestLayout>
      <VStack px="4" mt="4" mb="5" space="9">
        <VStack space={0.5}>
          <Text fontSize="20" fontWeight="bold" color="amber.900">
            社團
          </Text>
        </VStack>
      </VStack>
      <VStack style={{ backgroundColor: 'white' }}>
        <TopTabs>
          <Tab label="我的" selected />
          <Tab label="推薦" />
        </TopTabs>
        <View>
          <ScrollView>
            {[...Array(10)].map((_, i) => (
              <Pressable
                key={'eventList' + i + 1}
                onPress={() => navigation.navigate(MAIN_STACK_EVENT_DETAILS)}>
                <HStack space={5} margin={5}>
                  <Circle rounded="full" backgroundColor="gray.200" size="md">
                    {10 + i * 2}
                  </Circle>
                  <HStack alignItems="center">
                    <Text>慢跑社 ({12300 + i})</Text>
                  </HStack>
                </HStack>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </VStack>
    </GuestLayout>
  );
}
