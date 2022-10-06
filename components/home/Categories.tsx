import { FontAwesome5 } from '@expo/vector-icons';
import { Box, Icon, Text, VStack, FlatList, Center, IconButton } from 'native-base';
import React from 'react';

import Colors from '../../constants/Colors';
type Icon = {
  name: string;
  text: string;
};
type IconType = { icons: Icon[] };

const Categories = ({ icons }: IconType) => {
  return (
    <VStack px={{ base: 4, md: 8 }} py={4}>
      {/*
      <Text
        _dark={{ color: 'coolGray.50' }}
        _light={{ color: 'coolGray.800' }}
        fontSize="md"
        fontWeight="bold">
        Categories
      </Text>
  */}
      <FlatList
        mt={0}
        data={icons}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <Box w="4" />}
        renderItem={({ item }) => (
          <VStack space="2" alignItems="center">
            <Center
              _light={{ bg: Colors.LOGO_COLOR_WHITE_BACKGROUND }}
              _dark={{ bg: 'coolGray.700' }}
              rounded="full"
              w={{ base: 16, md: 14 }}
              h={{ base: 16, md: 14 }}>
              <IconButton
                variant="unstyled"
                icon={
                  <Icon
                    as={FontAwesome5}
                    name={item.name}
                    _light={{ color: Colors.LOGO_COLOR_GREEN }}
                    _dark={{ color: 'coolGray.50' }}
                    size={8}
                    textAlign="center"
                  />
                }
              />
            </Center>
            <Text
              fontSize={{ base: 'sm', md: 'sm' }}
              _light={{ color: { base: 'coolGray.800', md: 'coolGray.500' } }}
              _dark={{ color: { base: 'coolGray.50', md: 'coolGray.400' } }}
              textAlign="center">
              {item.text}
            </Text>
          </VStack>
        )}
      />
    </VStack>
  );
};

export default Categories;
