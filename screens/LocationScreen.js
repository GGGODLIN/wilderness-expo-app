import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Dimensions, Linking, Text, TouchableOpacity, View, Image, FlatList, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import avatars from '../assets/avatars';
import { api, dispatchFetchRequest } from "../constants/Backend";
import colors from '../constants/Colors';
import { ListItem, Icon, Header, Card, Divider, SpeedDial, Tab, TabView } from '@rneui/themed'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';

const LocationScreen = ({ navigation, route }) => {

    const [open, setOpen] = React.useState(false);

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [address, setAddress] = useState(null);
    // const [getLocation, setGetLocation] = useState(false);
  
    const getLocation = () => {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
        }
  
        Location.setGoogleApiKey(apiKey);
  
        console.log(status);
  
        let { coords } = await Location.getCurrentPositionAsync();
  
        setLocation(coords);
  
        console.log(coords);
  
        if (coords) {
          let { longitude, latitude } = coords;
  
          let regionName = await Location.reverseGeocodeAsync({
            longitude,
            latitude,
          });
          setAddress(regionName[0]);
          console.log(regionName, 'nothing');
        }
  
        // console.log();
      })();
    };

    const locationMarkers = [
        {
            latlng: [23.0,121.0],
            title: '車泊熱點',
            description: '車泊熱點',
            component: <></>,
        },
    ]

    const [index, setIndex] = React.useState(0);

    return (
        <View style={{ flex: 1, padding: 0, backgroundColor: '#fff', borderTopWidth: 2, borderColor: colors?.InactiveColor }}>
              <Tab
                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={{
                  backgroundColor: 'white',
                  height: 3,
                }}
              >
                <Tab.Item
                  title="地圖"
                  titleStyle={{ fontSize: 12, color: 'white' }}
                  icon={{ name: 'map-sharp', type: 'ionicon', color: 'white' }}
                  containerStyle={(active) => ({
                    backgroundColor: active ? colors?.ActiveColor : colors?.InactiveColor,
                  })}
                />
                <Tab.Item
                  title="附近"
                  titleStyle={{ fontSize: 12, color: 'white' }}
                  icon={{ name: 'navigate-circle-outline', type: 'ionicon', color: 'white' }}
                  containerStyle={(active) => ({
                    backgroundColor: active ? colors?.ActiveColor : colors?.InactiveColor,
                  })}
                />
                <Tab.Item
                  title="私藏"
                  titleStyle={{ fontSize: 12, color: 'white' }}
                  icon={{ name: 'heart-outline', type: 'ionicon', color: 'white' }}
                  containerStyle={(active) => ({
                    backgroundColor: active ? colors?.ActiveColor : colors?.InactiveColor,
                  })}
                />
              </Tab>

              <TabView value={index} onChange={setIndex} animationType="spring">
                <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
                  <MapView 
                      style={styles.map} 
                      initialRegion={{
                          latitude: 23.166826, 
                          longitude: 121.180767,
                          latitudeDelta: 3,
                          longitudeDelta: 3,
                      }}
                      showsUserLocation={true}
                  >
                    <Marker
                        coordinate={{latitude: 23.0,
                        longitude: 121.0}}
                        title={"title"}
                        description={"description"}
                    />
                    <Marker
                        coordinate={{latitude: 23.166826,
                        longitude: 121.180767}}
                        title={"title"}
                        description={"description"}
                    />
                  </MapView>
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
                  <Text h1>Favorite</Text>
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'green', width: '100%' }}>
                  <Text h1>Cart</Text>
                </TabView.Item>
              </TabView>
            <View style={{ alignItems: 'center', paddingBottom: 20 }}>

              
            </View>

                <SpeedDial
                    isOpen={open}
                    icon={{ name: 'menu', color: '#fff' }}
                    openIcon={{ name: 'close', color: '#fff' }}
                    onOpen={() => setOpen(!open)}
                    onClose={() => setOpen(!open)}
                    color='#333'
                    top={10}
                    style={[{ left: 0, top: 0 }]}
                >
                    <SpeedDial.Action
                        icon={{ name: 'add', color: '#fff' }}
                        title="新增地點"
                        onPress={() => getLocation()}
                        color='#333'
                    />
                    <SpeedDial.Action
                        icon={{ name: 'thumb-up', color: '#fff' }}
                        title="打卡"
                        onPress={() => console.log('Delete Something')}
                        color='#333'
                    />
                    <SpeedDial.Action
                        icon={{ name: 'filter-alt', color: '#fff' }}
                        title="篩選"
                        onPress={() => console.log('Delete Something')}
                        color='#333'
                    />
                </SpeedDial>
        </View>
    );
}

const styles = StyleSheet.create({
    articles: {
      flexDirection: 'row',
      marginBottom: 6,
      alignItems: 'center', 
      padding: 10,
      paddingBottom: 10,
    },
    image: {
      width: 70,
      height: 70,
      margin: 1,
    },
    title: {
      fontSize: 16,
      marginTop: 5,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default LocationScreen