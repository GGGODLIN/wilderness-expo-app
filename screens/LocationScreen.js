import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Dimensions, Linking, Text, TouchableOpacity, View, Image, FlatList, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import avatars from '../assets/avatars';
import { api, dispatchFetchRequest } from "../constants/Backend";
import colors from '../constants/Colors';
import { ListItem, Icon, Header, Card, Divider, SpeedDial } from '@rneui/themed'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import MasonryList from '@react-native-seoul/masonry-list';
import MapView from 'react-native-maps';

const LocationScreen = ({ navigation, route }) => {

    const [open, setOpen] = React.useState(false);

    return (
        <View style={{ flex: 1, padding: 0, backgroundColor: '#fff', borderTopWidth: 2, borderColor: colors?.InactiveColor }}>
            <View style={{ alignItems: 'center', paddingBottom: 20 }}>
                <MapView 
                    style={styles.map} 
                    initialRegion={{
                        latitude: 23.166826, 
                        longitude: 121.180767,
                        latitudeDelta: 3,
                        longitudeDelta: 3,
                    }}
                />
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
                        onPress={() => console.log('Add Something')}
                        color='#333'
                    />
                    <SpeedDial.Action
                        icon={{ name: 'delete', color: '#fff' }}
                        title="Delete"
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