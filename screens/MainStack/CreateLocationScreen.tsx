import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import MasonryList from '@react-native-seoul/masonry-list';
import * as ImagePicker from 'expo-image-picker';
import {
  Button,
  HStack,
  Text,
  Icon,
  Input,
  Pressable,
  Box,
  Center,
  VStack,
  TextArea,
  Image,
  Stack,
  IconButton,
  View,
} from 'native-base';
import React, { useState } from 'react';
import { Keyboard, Dimensions, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { MAIN_STACK_LOCATION_DRAWER } from '../../NavigationNames';
import { NavigationProps } from '../../Props';
import Colors from '../../constants/Colors';
import DashboardLayout from '../../layouts/DashboardLayout';

type OptionListType = {
  planTitle: string;
};

export default function CreateLocationScreen({ navigation }: NavigationProps): JSX.Element {
  type FormData = {
    location: string;
    title: string;
  };
  const [formData, setFormData] = useState<FormData>({
    location: '',
    title: '',
  });

  const [showCountry, setShowCountry] = useState(false);
  const [country, setCountry] = React.useState('');
  const [altitude, setAltitude] = useState('');
  const [recommend, setRecommend] = useState('');
  const [crowded, setCrowded] = useState('');
  const [bugs, setBugs] = useState('');

  type DeactivateForm = {
    reason: string;
    password: string;
  };

  const [deactivateForm, setDeactivateForm] = React.useState<DeactivateForm>({
    reason: '',
    password: '',
  });
  const handleFormUpdate = (name: string, value: string) =>
    setDeactivateForm((prev) => ({ ...prev, [name]: value }));

  const [image, setImage] = useState<string>('');
  const pickImage = async () => {
    const result: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const { reason, password } = deactivateForm;

  type Icon = {
    name: string;
    text: string;
    state: number;
  };
  const icons: Icon[] = [
    {
      name: 'caravan',
      text: '????????????',
      state: 0,
    },
    {
      name: 'caravan',
      text: '????????????',
      state: 0,
    },
    {
      name: 'caravan',
      text: '?????????',
      state: 0,
    },
    {
      name: 'caravan',
      text: '?????????',
      state: 0,
    },
    {
      name: 'caravan',
      text: '??????',
      state: 0,
    },
    {
      name: 'caravan',
      text: '??????',
      state: 0,
    },
    {
      name: 'caravan',
      text: '??????',
      state: 0,
    },
    {
      name: 'caravan',
      text: '??????',
      state: 0,
    },
    {
      name: 'caravan',
      text: '??????',
      state: 0,
    },
    {
      name: 'caravan',
      text: '??????',
      state: 0,
    },
    {
      name: 'caravan',
      text: '??????',
      state: 0,
    },
    {
      name: 'caravan',
      text: '??????',
      state: 0,
    },
    {
      name: 'caravan',
      text: '??????',
      state: 0,
    },
    {
      name: 'caravan',
      text: '??????',
      state: 0,
    },
    {
      name: 'caravan',
      text: '??????',
      state: 0,
    },
    {
      name: 'caravan',
      text: '??????',
      state: 0,
    },
    {
      name: 'caravan',
      text: '??????',
      state: 0,
    },
    {
      name: 'caravan',
      text: '??????',
      state: 0,
    },
    {
      name: 'caravan',
      text: '??????',
      state: 0,
    },
    {
      name: 'caravan',
      text: '??????',
      state: 0,
    },
  ];

  function getFacilityStyle(state: number) {
    if (state === 0) {
      return 'coolGray.200';
    }
    if (state === 1) {
      return 'coolGray.700';
    }
    if (state === 2) {
      return 'red.700';
    }
    return 'coolGray.500';
  }
  function FacilityCard(props: { item: Icon }) {
    const [facilityState, setFacilityState] = useState(props.item.state);

    return (
      <TouchableOpacity
        onPress={() => {
          if (facilityState >= 2) {
            setFacilityState(0);
          } else {
            setFacilityState(facilityState + 1);
          }
        }}>
        <HStack
          key={'icon_' + props.index}
          overflow="visible"
          mx={0}
          mb={0}
          alignItems="center"
          justifyContent="flex-start">
          <IconButton
            variant="unstyled"
            icon={
              <Icon
                as={FontAwesome5}
                name={props.item.name}
                _light={{
                  color: getFacilityStyle(facilityState),
                }}
                size={3}
                textAlign="center"
                alignSelf="center"
              />
            }
          />
          <Text
            fontSize="sm"
            color={getFacilityStyle(facilityState)}
            textAlign="center"
            strikeThrough={facilityState === 2}>
            {props.item.text}
          </Text>
        </HStack>
      </TouchableOpacity>
    );
  }

  return (
    <DashboardLayout title="????????????" showBackButton>
      <ScrollView
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <VStack
          space="0"
          px="4"
          py="4"
          alignItems="flex-start"
          justifyContent="stretch"
          backgroundColor="white">
          <Text
            fontSize="xl"
            fontWeight="bold"
            _light={{ color: 'coolGray.700' }}
            _dark={{ color: 'coolGray.50' }}
            mb={0}>
            ??????
          </Text>
          <Input
            isRequired
            backgroundColor="coolGray.50"
            borderColor="coolGray.50"
            borderRadius="10"
            borderWidth="0"
            py="4"
            my="2"
            placeholder="????????? (???????????????????????????????????????)"
            size="lg"
            defaultValue={formData.location}
            onChangeText={(location: string) => setFormData((prev) => ({ ...prev, location }))}
          />
          <Text
            w="100%"
            fontSize="xl"
            fontWeight="bold"
            _light={{ color: 'coolGray.700' }}
            _dark={{ color: 'coolGray.50' }}
            mt={2}
            mb={1}>
            ??????
          </Text>
          <VStack
            backgroundColor="coolGray.50"
            borderColor="coolGray.50"
            borderRadius="10"
            borderWidth="0"
            py="4"
            px="2"
            my="2"
            w="100%">
            <View ml="1">
              <RNPickerSelect
                placeholder={{}}
                textInputProps={{ fontSize: 14, color: 'coolGray.400' }}
                value={country}
                onValueChange={(itemValue) => setCountry(itemValue)}
                items={[
                  { label: '?????????', value: '' },
                  { label: '?????????', value: '?????????' },
                  { label: '?????????', value: '?????????' },
                  { label: '?????????', value: '?????????' },
                  { label: '?????????', value: '?????????' },
                ]}
              />
            </View>
          </VStack>
          <Text
            fontSize="xl"
            fontWeight="bold"
            _light={{ color: 'coolGray.700' }}
            _dark={{ color: 'coolGray.50' }}
            mb={0}>
            ????????????
          </Text>
          <Input
            isRequired
            backgroundColor="coolGray.50"
            borderColor="coolGray.50"
            borderRadius="10"
            borderWidth="0"
            py="4"
            my="2"
            placeholder="???????????????????????? (??????)"
            size="lg"
            defaultValue={formData.title}
            onChangeText={(title: string) => setFormData((prev) => ({ ...prev, title }))}
          />
          <Text
            fontSize="xl"
            fontWeight="bold"
            _light={{ color: 'coolGray.700' }}
            _dark={{ color: 'coolGray.50' }}
            mb={2}>
            ????????????
          </Text>
          <VStack w="100%" px="3" py="2" mb="2" borderRadius="10" bg="coolGray.50">
            <TextInput
              textAlignVertical="top"
              value={reason}
              onChangeText={(txt) => handleFormUpdate('reason', txt)}
              placeholderTextColor="coolGray.700"
              placeholder="???????????????????????? (??????)"
              multiline
              numberOfLines={4}
              style={{
                width: '100%',
                height: 84,
                textAlignVertical: 'top',
                backgroundColor: 'coolGray.300',
                color: 'coolGray.800',
              }}
            />
          </VStack>
          <Text
            fontSize="xl"
            fontWeight="bold"
            _light={{ color: 'coolGray.700' }}
            _dark={{ color: 'coolGray.50' }}
            mb={0}>
            ??????????????????????????? (???????????????)
          </Text>

          <Center
            width="100%"
            height="116"
            _light={{ borderColor: 'coolGray.300' }}
            _dark={{ borderColor: 'coolGray.700' }}
            borderWidth="1"
            borderStyle="dashed"
            mt={{ base: 3 }}>
            <Pressable alignItems="center" onPress={pickImage}>
              {image === '' ? (
                <>
                  <Icon as={MaterialIcons} name="cloud-upload" color="coolGray.400" size="6" />
                  <Text
                    fontSize="sm"
                    mt="0.5"
                    _light={{ color: 'coolGray.500' }}
                    _dark={{ color: 'coolGray.400' }}>
                    Upload
                  </Text>
                </>
              ) : (
                <Image source={{ uri: image }} width="100" height="100" />
              )}
            </Pressable>
          </Center>
          <Text
            mt="4"
            fontSize="xl"
            fontWeight="bold"
            _light={{ color: 'coolGray.700' }}
            _dark={{ color: 'coolGray.50' }}
            mb={0}>
            ????????????????????????????????????
          </Text>
          <HStack justifyContent="space-between">
            <VStack w="100%">
              <HStack space={6} justifyContent="space-between" alignItems="center" pt={4}>
                <Stack flexWrap="wrap" direction="row" space="2">
                  <MasonryList
                    showsVerticalScrollIndicator={false}
                    numColumns={4}
                    data={icons}
                    renderItem={({ item }) => <FacilityCard item={item} />}
                    keyExtractor={(item: Offer, index: number) => 'key' + index}
                  />
                </Stack>
              </HStack>
            </VStack>
          </HStack>
          <Text
            w="100%"
            fontSize="xl"
            fontWeight="bold"
            _light={{ color: 'coolGray.700' }}
            _dark={{ color: 'coolGray.50' }}
            mt={2}
            mb={1}>
            ??????????????? (??????)
          </Text>
          <VStack
            backgroundColor="coolGray.50"
            borderColor="coolGray.50"
            borderRadius="10"
            borderWidth="0"
            py="4"
            px="2"
            my="2"
            w="100%">
            <View ml="1">
              <RNPickerSelect
                placeholder={{}}
                textInputProps={{ fontSize: 14, color: 'coolGray.400' }}
                value={altitude}
                onValueChange={(itemValue) => setAltitude(itemValue)}
                items={[
                  { label: '?????????', value: '' },
                  { label: '??????', value: '??????' },
                  { label: '??????', value: '??????' },
                  { label: '300????????????', value: '300' },
                  { label: '300??????~500??????', value: '500' },
                  { label: '500??????~800??????', value: '800' },
                  { label: '800??????~1000??????', value: '1000' },
                  { label: '1000????????????', value: '1100' },
                ]}
              />
            </View>
          </VStack>
          <Text
            w="100%"
            fontSize="xl"
            fontWeight="bold"
            _light={{ color: 'coolGray.700' }}
            _dark={{ color: 'coolGray.50' }}
            mt={2}
            mb={1}>
            ????????????????????? (??????)
          </Text>
          <VStack
            backgroundColor="coolGray.50"
            borderColor="coolGray.50"
            borderRadius="10"
            borderWidth="0"
            py="4"
            px="2"
            my="2"
            w="100%">
            <View ml="1">
              <RNPickerSelect
                placeholder={{}}
                textInputProps={{ fontSize: 14, color: 'coolGray.400' }}
                value={crowded}
                onValueChange={(itemValue) => setCrowded(itemValue)}
                items={[
                  { label: '?????????', value: '' },
                  { label: '??????', value: '??????' },
                  { label: '??????', value: '??????' },
                  { label: '??????', value: '??????' },
                ]}
              />
            </View>
          </VStack>
          <Text
            w="100%"
            fontSize="xl"
            fontWeight="bold"
            _light={{ color: 'coolGray.700' }}
            _dark={{ color: 'coolGray.50' }}
            mt={2}
            mb={1}>
            ????????????????????? (??????)
          </Text>
          <VStack
            backgroundColor="coolGray.50"
            borderColor="coolGray.50"
            borderRadius="10"
            borderWidth="0"
            py="4"
            px="2"
            my="2"
            w="100%">
            <View ml="1">
              <RNPickerSelect
                placeholder={{}}
                textInputProps={{ fontSize: 14, color: 'coolGray.400' }}
                value={bugs}
                onValueChange={(itemValue) => setBugs(itemValue)}
                items={[
                  { label: '?????????', value: '' },
                  { label: '?????????', value: '?????????' },
                  { label: '????????????', value: '????????????' },
                  { label: '????????????', value: '????????????' },
                  { label: '???????????????????????????', value: '???????????????????????????' },
                  { label: '???????????????????????????', value: '???????????????????????????' },
                  { label: '?????????', value: '?????????' },
                ]}
              />
            </View>
          </VStack>
          <Center width="100%">
            <Button
              width="100%"
              my="4"
              mb="0"
              mx="2"
              py={3}
              color="white"
              size="lg"
              rounded="full"
              bg={Colors.THEME_MAIN_COLOR}
              _pressed={{ bg: Colors.LOGO_COLOR_GREEN }}
              onPress={() => navigation.navigate(MAIN_STACK_LOCATION_DRAWER)}>
              ??????
            </Button>
          </Center>
          <Text
            mt="2"
            mb="20"
            fontSize="sm"
            fontWeight="normal"
            _light={{ color: 'coolGray.500' }}
            _dark={{ color: 'coolGray.50' }}>
            ??????????????????????????????????????????????????????
          </Text>
        </VStack>
      </ScrollView>
    </DashboardLayout>
  );
}
