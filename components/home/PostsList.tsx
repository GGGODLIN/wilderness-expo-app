import { MaterialIcons } from '@expo/vector-icons';
import {
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

export type Course = {
  id: number;
  name?: string;
  chapter?: string;
  imageUri: ImageSourcePropType;
};

const PostsList = ({ courses }: { courses: Course[] }) => {
  return (
    <VStack px={{ base: 0, md: 0 }} space={4}>
      {courses.map((item) => {
        return (
          <Pressable>
            <Center>
              <Card course={item} />
            </Center>
          </Pressable>
        );
      })}
    </VStack>
  );
};

const Card = ({ course }: { course: Course }) => {
  return (
    <Box overflow="hidden" rounded="lg" width={{ base: '80', md: '334' }}>
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
              123 人來過這裡
            </Text>
          </HStack>
        </VStack>
        <IconButton
          _light={{
            bg: 'primary.900',
          }}
          _dark={{
            bg: 'primary.700',
          }}
          rounded="full"
          variant="unstyled"
          icon={<Icon as={MaterialIcons} name="location-on" color="coolGray.50" size={5} />}
        />
      </HStack>
    </Box>
  );
};

export default PostsList;
