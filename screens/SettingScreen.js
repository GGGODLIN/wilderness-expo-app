import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import avatars from '../assets/avatars';
import { MainActionButton, SecondActionButton } from "../components/ActionButtons";
import { api, dispatchFetchRequest } from "../constants/Backend";
import colors from '../constants/Colors';

const SettingScreen = ({ navigation, route }) => {

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

    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: '#fff', borderTopWidth: 2, borderColor: colors?.msgBorderColor }}>
            <View style={{ alignItems: 'center', flex: 1 }}>
                <TouchableOpacity
                    style={{ flex: 0.5, aspectRatio: 1, marginVertical: 20 }}
                    onPress={() => { navigation.navigate('UserNameEditScreen', { userProfile: userProfile, setUserProfile: (data) => setUserProfile(data), isPressAvatar: true }) }}
                >
                    <Avatar
                        rounded
                        source={avatars?.[userProfile?.default_avatar > 0 ? userProfile?.default_avatar : 1]}
                        containerStyle={{
                            borderWidth: 8,
                            borderColor: colors?.msgBorderColor,
                            flex: 1,
                            width: '100%',
                            borderRadius: 100000,
                            padding: 8
                        }}
                        avatarStyle={{ flex: 1, borderRadius: 100000 }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('UserNameEditScreen', { userProfile: userProfile, setUserProfile: (data) => setUserProfile(data) }) }}
                    style={{ borderBottomWidth: 5, borderColor: colors?.msgBorderColor, marginVertical: 10 }}>
                    <Text style={{ fontSize: 32, fontWeight: 'bold' }}>{userProfile?.name ?? '   '}</Text>
                </TouchableOpacity>
                <View style={{ width: '100%', marginVertical: 5 }}>
                    <MainActionButton
                        disabled={!userProfile}
                        title={'修改名稱'}
                        onPress={() => { navigation.navigate('UserNameEditScreen', { userProfile: userProfile, setUserProfile: (data) => setUserProfile(data) }) }} />
                </View>
                {/* <View style={{ width: '100%', marginVertical: 5 }}>
                    <MainActionButton
                        disabled
                        title={'購買'}
                        onPress={() => { }} />
                </View> */}
                {/* <View style={{ width: '100%', marginVertical: 5 }}>
                    <MainActionButton
                        disabled
                        title={'聯絡客服'}
                        onPress={() => { }} />
                </View> */}
                <View style={{ width: '100%', marginVertical: 5 }}>
                    <SecondActionButton
                        title={'初次使用介紹'}
                        onPress={() => { route?.params?.setHadOpenApp?.(false) }} />
                </View>
                <View style={{ width: '100%', marginVertical: 5 }}>
                    <SecondActionButton
                        title={'關於 Echo Square'}
                        onPress={() => { navigation.navigate('Detail') }} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                    <TouchableOpacity
                        style={{ marginHorizontal: 5 }}
                        onPress={() => Linking.openURL('https://echosquare.app')}
                    >
                        <Avatar
                            size={40}
                            rounded
                            source={require('../assets/SocialIcon/icon_site.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginHorizontal: 5 }}
                        onPress={() => Linking.openURL('https://liff.line.me/1645278921-kWRPP32q?accountId=183rijom&openerPlatform=native&openerKey=talkroom%3Aheader')}
                    >
                        <Avatar
                            size={40}
                            rounded
                            source={require('../assets/SocialIcon/icon_line.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginHorizontal: 5 }}
                        onPress={() => Linking.openURL('https://www.facebook.com/EchoSquareApp/')}
                    >
                        <Avatar
                            size={40}
                            rounded
                            source={require('../assets/SocialIcon/icon_facebook.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginHorizontal: 5 }}
                        onPress={() => Linking.openURL('mailto:support@echosquare.app')}
                    >
                        <Avatar
                            size={40}
                            rounded
                            source={require('../assets/SocialIcon/icon_email.png')}
                        />
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}

export default SettingScreen