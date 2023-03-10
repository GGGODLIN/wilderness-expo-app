import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Box,
  HStack,
  Icon,
  Text,
  VStack,
  FlatList,
  Avatar,
  Image,
  Pressable,
  IconButton,
  Center,
} from 'native-base';
import React from 'react';
import { ImageSourcePropType, Platform } from 'react-native';

import { MAIN_STACK_POST } from '../../NavigationNames';
import { Nav, NavigationProps } from '../../Props';

export type Course = {
  id: number;
  name?: string;
  chapter?: string;
  imageUri: ImageSourcePropType;
};

const PostsList = ({ courses }: { courses: Course[] }) => {
  return (
    <Box px={{ base: 0, md: 0 }} display="flex" flexDirection="row" justifyContent="space-between">
      {courses.map((item) => {
        return <Card course={item} />;
      })}
    </Box>
  );
};

const Card = ({ course }: { course: Course }) => {
  const navigation = useNavigation<Nav>();

  return (
    <Box overflow="hidden" rounded="lg" width={{ base: '45%', md: '334' }} key={course.id}>
      <Pressable
        onPress={() => navigation.navigate(MAIN_STACK_POST)}
        key={'postList_' + course.id + 1}>
        <Image height="112" source={course.imageUri} alt="Alternate Text" />
        <HStack
          _light={{ bg: 'coolGray.100' }}
          _dark={{ bg: 'coolGray.700' }}
          p="3"
          justifyContent="space-between"
          alignItems="flex-start">
          <VStack>
            <Text
              fontSize="xs"
              _light={{ color: 'coolGray.900' }}
              _dark={{ color: 'coolGray.100' }}
              fontWeight="medium">
              {course.chapter}
            </Text>
            <Text
              fontSize="sm"
              fontWeight="bold"
              _light={{ color: 'coolGray.900' }}
              _dark={{ color: 'coolGray.100' }}>
              {course.name}
            </Text>
            <HStack space="2" alignItems="center">
              <Text
                fontSize="xs"
                textAlign="center"
                _light={{ color: 'coolGray.800' }}
                _dark={{ color: 'coolGray.300' }}>
                921 ??????
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </Pressable>
    </Box>
  );
};

export default PostsList;
