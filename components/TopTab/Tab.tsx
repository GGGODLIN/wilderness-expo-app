import { Box, Pressable } from 'native-base';
import React from 'react';
import { GestureResponderEvent } from 'react-native';

export default function Tab({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}): JSX.Element {
  return (
    <Pressable onPress={onPress}>
      <Box
        paddingX={5}
        paddingY={1}
        bg={selected ? 'black' : null}
        _text={{
          color: selected ? 'white' : null,
        }}>
        {label}
      </Box>
    </Pressable>
  );
}
