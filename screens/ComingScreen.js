import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { Linking, Text, TouchableOpacity, View, Image, FlatList, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import avatars from '../assets/avatars';
import { MainActionButton, SecondActionButton } from "../components/ActionButtons";
import { api, dispatchFetchRequest } from "../constants/Backend";
import colors from '../constants/Colors';
import { ListItem, Icon, Header, Card } from '@rneui/themed'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const ComingScreen = ({ navigation, route }) => {

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

    const list = [
        {
            icon: <MaterialCommunityIcons name="campfire" size={40} style={{ color: colors?.InactiveColor }} />,
            title: '好野入門',
            component: <></>,
        },
        {
            icon: <MaterialCommunityIcons name="information-outline" size={40} style={{ color: colors?.InactiveColor }} />,
            title: '常見問題',
            component: <></>,
        },
        {
            icon: <MaterialCommunityIcons name="alert" size={40} style={{ color: colors?.InactiveColor }} />,
            title: '法規相關',
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
            <ScrollView>
                <View style={{ alignItems: 'center', paddingBottom: 10 }}>

                </View>
            </ScrollView>
        </View>
    );
}

export default ComingScreen