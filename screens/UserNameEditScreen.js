import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import avatars from '../assets/avatars';
import { MainActionButton } from "../components/ActionButtons";
import { api, dispatchFetchRequest } from "../constants/Backend";
import colors from '../constants/Colors';

const UserNameEditScreen = ({ navigation, route }) => {

    const [userName, setUserName] = useState(route?.params?.userProfile?.name)
    const [defaultAvatar, setDefaultAvatar] = useState(route?.params?.userProfile?.default_avatar > 0 ? route?.params?.userProfile?.default_avatar : 1)


    const updateUserProfile = (userName, defaultAvatar) => {
        let request = { name: userName, default_avatar: defaultAvatar }
        dispatchFetchRequest(
            api.user.updateUserProfile,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(request)
            },
            response => {
                response.json().then(data => {
                    route?.params?.setUserProfile({ ...route?.params?.userProfile, name: userName, default_avatar: defaultAvatar })
                    navigation.goBack()
                })
            },
            response => {
                response.text().then(data => {
                    console.warn('updateUserProfileFail', data)
                })
            }
        ).then()
    }

    const getByteLength = (val) => {
        let len = 0;
        for (let i = 0; i < val.length; i++) {
            let a = val.charAt(i);
            if (a.match(/[^\x00-\xff]/ig) != null) {
                len += 2;
            } else {
                len += 1;
            }
        }
        return len;
    }

    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: '#fff', borderTopWidth: 2, borderColor: colors?.msgBorderColor }}>
            <View
                style={{ flex: 1, aspectRatio: 1, alignSelf: 'center', maxHeight: 200 }}
            >
                <Avatar
                    rounded
                    source={avatars?.[defaultAvatar]}
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
            </View>
            <View style={{ alignItems: 'center' }}>

                <View style={{ marginHorizontal: 10, width: '100%' }}>
                    <TextInput
                        autoFocus={!route?.params?.isPressAvatar}
                        enablesReturnKeyAutomatically
                        onChangeText={(text) => {
                            if (getByteLength(text) <= 20) {
                                setUserName(text)
                            }
                        }}
                        value={typeof (userName) == 'number' ? userMsg.toString() : userName}
                        placeholder={''}
                        placeholderTextColor={'#727272'}
                        style={[
                            {
                                width: '100%',
                                textAlign: 'center',
                                paddingVertical: 10,
                                paddingHorizontal: 10,
                                borderBottomWidth: 1,
                                borderColor: colors?.mainActionColor,
                                fontSize: 32
                            }
                        ]}
                    />
                </View>
                <View style={{ width: '100%', marginVertical: 5 }}>
                    <MainActionButton
                        disabled={!userName}
                        title={'確認修改'}
                        onPress={() => { updateUserProfile(userName, defaultAvatar) }} />
                </View>

            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {Object.keys(avatars)?.map?.((item) => {
                    return (
                        <TouchableOpacity
                            style={{ width: '20%', aspectRatio: 1 }}
                            onPress={() => setDefaultAvatar(item)}
                        >
                            <View style={{ aspectRatio: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Avatar
                                    size={item == defaultAvatar ? 56 : 52}
                                    rounded
                                    source={avatars?.[item]}
                                    containerStyle={{
                                        borderWidth: item == defaultAvatar ? 5 : 5,
                                        borderColor: item == defaultAvatar ? colors?.msgBorderColor : colors?.disableColor,
                                        padding: 5
                                    }}
                                />
                            </View>
                        </TouchableOpacity>
                    )
                })}

            </View>
        </View>
    );
}

export default UserNameEditScreen