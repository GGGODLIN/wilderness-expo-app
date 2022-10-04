import { Box, Center, HStack } from 'native-base';
import React from 'react';

export default function TopTabs({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <Center padding={3} borderTopWidth={1} borderBottomWidth={1}>
      <HStack borderWidth={1} borderRadius="md">
        {children}
      </HStack>
    </Center>
  );
}
