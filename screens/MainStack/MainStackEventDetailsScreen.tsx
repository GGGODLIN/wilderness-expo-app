import Ionicons from '@expo/vector-icons/Ionicons';
import { Box, Center, HStack, VStack, Text, Heading, View, ScrollView } from 'native-base';
import React from 'react';

import { NavigationProps } from '../../Props';

export default function MainStackEventDetailsScreen({ navigation }: NavigationProps): JSX.Element {
  return (
    <VStack>
      <Center padding={3} borderTopWidth={1} borderBottomWidth={1}>
        <HStack borderWidth={1} borderRadius="md">
          <Box paddingX={5} paddingY={1}>
            資訊
          </Box>
          <Box paddingX={5} paddingY={1}>
            動態
          </Box>
          <Box paddingX={5} paddingY={1}>
            參加者
          </Box>
          <Box paddingX={5} paddingY={1}>
            訊息
          </Box>
        </HStack>
      </Center>
      <ScrollView>
        <View>
          <VStack space={5} margin={5}>
            <Heading>大熊高爾夫早場</Heading>
            <Text bold fontSize="lg">
              活動資訊
            </Text>
            <HStack>
              <Ionicons name="person" size={20} color="gray" />
              <VStack>
                <Text>主辦人</Text>
                <Text>ABC大大</Text>
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
                <Text>桃園球場</Text>
                <Text>桃園市森林區大條馬路711號</Text>
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
                <Text>
                  $1,000 / 每人{'\n'}
                  午餐加訂便當者 + $100{'\n'}
                  續攤下午茶者請勾下午茶
                </Text>
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
