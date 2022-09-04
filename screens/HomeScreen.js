import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { Linking, Text, TouchableOpacity, View, Image, FlatList, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import avatars from '../assets/avatars';
import { MainActionButton, SecondActionButton } from "../components/ActionButtons";
import { api, dispatchFetchRequest } from "../constants/Backend";
import colors from '../constants/Colors';
import { ListItem, Icon, Header, Card, Divider } from '@rneui/themed'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';


const HomeScreen = ({ navigation, route }) => {

    const [userProfile, setUserProfile] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            getUserProfile()

            return () => { };
        }, [])
    );


    const getUserProfile = () => {
        dispatchFetchRequest(
            api.user.userProfile,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            },
            response => {
                response.json().then(data => {
                    setUserProfile(data?.data)
                })
            },
            response => {
                response.text().then(data => {
                    console.warn('getUserProfileFail', data)
                })
            }
        ).then()
    }

    const iconSize = 32;
    const iconStyle = { color: colors?.InactiveColor };
    const indexLinkList = [
        {
            icon: <FontAwesome name="caravan" size={iconSize} style={iconStyle} />,
            title: '車泊熱點',
            component: <></>,
        },
        {
            icon: <FontAwesome name="snowboarding" size={iconSize} style={iconStyle} />,
            title: '滑水秘境',
            component: <></>,
        },
        {
            icon: <FontAwesome name="campground" size={iconSize} style={iconStyle} />,
            title: '熱門營地',
            component: <></>,
        },
        {
            icon: <FontAwesome name="fish" size={iconSize} style={iconStyle} />,
            title: '釣魚熱區',
            component: <></>,
        },
        {
            icon: <FontAwesome name="icons" size={iconSize} style={iconStyle} />,
            title: '熱門文章',
            component: <></>,
        },
        {
            icon: <FontAwesome name="drumstick-bite" size={iconSize} style={iconStyle} />,
            title: '露營美食',
            component: <></>,
        },
        {
            icon: <FontAwesome name="map-signs" size={iconSize} style={iconStyle} />,
            title: '好野入門',
            component: <></>,
        },
        {
            icon: <FontAwesome name="question-circle" size={iconSize} style={iconStyle} />,
            title: '常見問題',
            component: <></>,
        },
    ]

    const Item = ({ item }) => {
        return (
            <View style={{ alignItems: 'center', paddingLeft: 15, paddingRight: 15, paddingTop: 20, paddingBottom: 0 }}>
                <TouchableOpacity>
                    <View style={{ alignItems: 'center', paddingTop: 0, paddingBottom: 10 }}>
                        {item.icon}
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Text style={{ color: colors?.InactiveColor, fontSize: 18 }}>{item.title}</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };
    
    const articles = [
        {
            title: 'abcdefgabcdefgabcdefgabcdefg',
            date: '2022-09-01',
            image: '../assets/images/pexels-uriel-mont-6271392.jpg',
        },
    ];
      
    return (
        <View style={{ flex: 1, padding: 0, backgroundColor: '#fff', borderTopWidth: 2, borderColor: colors?.InactiveColor }}>
            <View style={{ alignItems: 'center', paddingBottom: 10 }}>
                <Image
                    resizeMode="cover"
                    style={{ width: '100%', height: '100%', maxHeight: 200 }}
                    source={require('../assets/images/pexels-uriel-mont-6271392.jpg')}
                />
                <FlatList
                    data={indexLinkList}
                    numColumns={4}
                    renderItem={Item}
                    keyExtractor={(item) => item.alt}
                />
            </View>
            <ScrollView>
                <View style={{ alignItems: 'center', paddingBottom: 10 }}>
                    <Card style={{ width: '100%', padding: 0 }}>
                        <Card.Title>熱門文章</Card.Title>
                        <Card.Divider />

                    </Card>
                    <Card style={{ width: '100%', padding: 0 }}>
                        <Card.Title>熱門地點</Card.Title>
                        <Card.Divider />

                    </Card>
                </View>
            </ScrollView>
        </View>
    );
}

export default HomeScreen