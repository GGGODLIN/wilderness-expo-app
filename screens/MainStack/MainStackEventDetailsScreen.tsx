import Ionicons from '@expo/vector-icons/Ionicons';
import { Box, Center, HStack, VStack, Text, Heading, View, ScrollView } from 'native-base';
import React from 'react';

import { NavigationProps } from '../../Props';

export default function MainStackEventDetailsScreen({ navigation }: NavigationProps): JSX.Element {
  return (
    <VStack>
      <ScrollView>
        <View>
          <VStack space={5} margin={5}>
            <Heading>45245</Heading>
            <Text bold fontSize="lg">
              資訊
            </Text>
            <HStack>
              <Ionicons name="person" size={20} color="gray" />
              <VStack>
                <Text>452452</Text>
                <Text>45254</Text>
              </VStack>
            </HStack>
            <HStack>
              <Ionicons name="calendar" size={20} color="gray" />
              <VStack>
                <Text>2022-09-10</Text>
                <Text>09:00 ~ 11:30</Text>
              </VStack>
            </HStack>
            <HStack>
              <Ionicons name="map" size={20} color="gray" />
              <VStack>
                <Text>452542</Text>
                <Text>45245254</Text>
              </VStack>
            </HStack>
            <HStack>
              <Ionicons name="car" size={20} color="gray" />
              <VStack>
                <Text>
                  停車場{'\n'}
                  場地無提供停車位{'\n'}
                  附近有付費停車場
                </Text>
              </VStack>
            </HStack>
            <HStack>
              <Ionicons name="cash" size={20} color="gray" />
              <VStack>
                <Text>452542</Text>
              </VStack>
            </HStack>
            <Text bold fontSize="lg">
              注意事項
            </Text>
            <Text>
              1. AAA{'\n'}
              2. BBB{'\n'}
              3. CCC{'\n'}
              4. DDD
            </Text>
          </VStack>
        </View>
      </ScrollView>
    </VStack>
  );
}
