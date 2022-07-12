import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, AppState, AsyncStorage, FlatList, Platform, StyleSheet, Text, TextInput, TouchableOpacity, unstable_batchedUpdates, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Avatar } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { MsgCard } from '../components/MsgCard';
import { api, dispatchFetchRequest } from "../constants/Backend";
import colors from '../constants/Colors';
import { secondToMinute } from '../helpers/dateTimeHelper';

const HomeScreen = ({ navigation }) => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [broadcastTypes, setBroadcastTypes] = useState(null);
    const [broadcastOptions, setBroadcastOptions] = useState(null);
    const [userMsg, setUserMsg] = useState(null);
    const [userBroadcastTypeId, setUserBroadcastTypeId] = useState(1);
    const [userBroadcastOptionId, setUserBroadcastOptionId] = useState(1);
    const [userDistance, setUserDistance] = useState(50);
    const [normalData, setNormalData] = useState(null);
    const [normalDataNextUrl, setNormalDataNextUrl] = useState(null);
    const [normalDataPrevUrl, setNormalDataPrevUrl] = useState(null);
    const [pinnedData, setPinnedData] = useState(null);
    const [pinnedDataNextUrl, setPinnedDataNextUrl] = useState(null);
    const [pinnedDataOpen, setPinnedDataOpen] = useState(false);
    const [settingOpen, setSettingOpen] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [userStrengthAmount, setUserStrengthAmount] = useState({ amount: 0, max_amount: 0, flag: true });
    const [getStrengthCountdown, setGetStrengthCountdown] = useState(300);
    const [strengths, setStrengths] = useState(0);
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [msgViewHeight, setMsgViewHeight] = useState(0);
    const [appStateVisible, setAppStateVisible] = useState('active');
    const [multiline, setmultiline] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [showGotoBottom, setShowGotoBottom] = useState(false);

    const userMsgTextInputRef = useRef(null);
    const normalMsgScrollViewRef = useRef(null);
    const pinnedMsgScrollViewRef = useRef(null);

    useFocusEffect(
        React.useCallback(() => {
            (async () => {
                let getStrengthTime = await AsyncStorage.getItem('getStrengthTime')
                if (!!getStrengthTime) {
                    let passedTime = new Date() - new Date(JSON.parse(getStrengthTime))
                    if (passedTime > 300000) {
                        postStrengths()
                    } else {
                        getUserProfile()
                    }
                } else {
                    getUserProfile()
                }
                let { status } = await Location.requestPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }

                let location = await getCurrentPosition();
                setLocation(location);
            })();

            const timerID = setInterval(
                () => {
                    (async () => {
                        let { status } = await Location.requestPermissionsAsync();
                        if (status !== 'granted') {
                            setErrorMsg('Permission to access location was denied');
                            return;
                        }

                        let location = await getCurrentPosition();
                        setLocation(location);

                    })();
                },
                10000
            );
            return () => { clearInterval(timerID) };
        }, [])
    );

    useEffect(() => {
        AppState.addEventListener('change', (nextAppState) => {
            setAppStateVisible(nextAppState)
        });

        return () => {
            AppState.removeEventListener('change', (nextAppState) => {
                setAppStateVisible(nextAppState)
            });
        };
    }, []);


    useEffect(() => {
        let countdownTimer = null;
        if (appStateVisible === 'active') {
            (async () => {

                let countdown = 300
                let getStrengthTime = await AsyncStorage.getItem('getStrengthTime')
                if (!!getStrengthTime) {
                    let passedTime = new Date() - new Date(JSON.parse(getStrengthTime))
                    if (passedTime > 300000) {
                        countdown = 300
                        postStrengths()
                    } else {
                        countdown = 300 - Math.floor(passedTime / 1000)
                    }
                } else {
                    postStrengths()
                }
                countdown = JSON.parse(countdown)
                countdownTimer = setInterval(
                    () => {

                        if (userStrengthAmount?.amount < userStrengthAmount?.max_amount) {
                            if (countdown > 0) {
                                setGetStrengthCountdown(countdown)
                                countdown = countdown - 1
                            } else if (countdown == 0) {
                                postStrengths()
                                setGetStrengthCountdown(countdown)
                                countdown = countdown - 1
                            } else {

                            }
                        } else {
                            setGetStrengthCountdown(0)
                        }

                    },
                    1000
                );

            })();
        }
        return () => {
            clearInterval(countdownTimer);
        };
    }, [userStrengthAmount?.flag, appStateVisible]);

    const postStrengths = () => {
        dispatchFetchRequest(
            api.user.postStrengths,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            },
            response => {
                response.json().then(data => {
                    AsyncStorage.setItem('getStrengthTime', JSON.stringify(new Date()))
                    setUserStrengthAmount({ amount: data?.data?.amount, max_amount: data?.data?.max_amount, flag: !userStrengthAmount?.flag })
                    getUserProfile()
                })
            },
            response => {
                response.text().then(data => {
                    console.warn('postStrengthsFail', data)
                })
                if (response.status === 408) {
                    postStrengths()
                }
            }
        ).then()
    }

    const getUserProfile = (isAfterPostMsg = false) => {
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
                    if (isAfterPostMsg && (data?.data?.strength?.max_amount > data?.data?.strength?.amount) && (data?.data?.strength?.max_amount === userStrengthAmount?.amount)) {
                        AsyncStorage.setItem('getStrengthTime', JSON.stringify(new Date()))
                    }

                    setUserStrengthAmount({ amount: data?.data?.strength?.amount, max_amount: data?.data?.strength?.max_amount, flag: !userStrengthAmount?.flag })
                })
            },
            response => {
                response.text().then(data => {
                    console.warn('getUserProfileFail', data)
                })
            }
        ).then()
    }


    const getCurrentPosition = async () => {
        try {
            let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High })
            return location
        } catch (error) {
            console.warn(error)
            await getCurrentPosition()
        }
    }

    useEffect(() => {
        handleGetBroadcastTypes()
        handleGetBroadcastOptions()
    }, []);

    useEffect(() => {
        if (!!broadcastTypes && !!location && !normalDataPrevUrl) {
            handleGetBroadcast(broadcastTypes, location)
        }
    }, [location, broadcastTypes]);

    const handleGetBroadcastTypes = () => {

        dispatchFetchRequest(
            api.user.broadcastTypes,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            },
            response => {
                response.json().then(data => {
                    setBroadcastTypes(data?.data)
                })
            },
            response => {
                response.text().then(data => {
                    console.warn('handleGetBroadcastTypesFail', data)
                })
            }
        ).then()
    }

    const handleGetBroadcastOptions = () => {
        dispatchFetchRequest(
            api.user.broadcastOptions,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            },
            response => {
                response.json().then(data => {
                    setBroadcastOptions(data?.data)
                })
            },
            response => {
                response.text().then(data => {
                    console.warn('handleGetBroadcastOptionsFail', data)
                })
            }
        ).then()
    }

    const handleGetBroadcast = (broadcastTypes, location) => {
        dispatchFetchRequest(
            `${api.user.broadcasts}?latitude=${location?.coords?.latitude}&longitude=${location?.coords?.longitude}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                },
            },
            response => {
                response.json().then(data => {
                    unstable_batchedUpdates(() => {
                        setNormalData(data?.data)
                        setNormalDataNextUrl(data?.links?.next)
                        setNormalDataPrevUrl(data?.links?.prev)
                        setRefreshing(false)
                        setShowGotoBottom(false)
                    })
                    normalMsgScrollViewRef?.current?.scrollToIndex({ index: 0, viewPosition: 1 })

                })
            },
            response => {
                response.text().then(data => {
                    console.warn('handleGetBroadcastFail', data, response.url)
                })
            }
        ).then()

        dispatchFetchRequest(
            `${api.user.broadcasts}?broadcast_type_id=${broadcastTypes?.[1]?.id}&latitude=${location?.coords?.latitude}&longitude=${location?.coords?.longitude}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                },
            },
            response => {
                response.json().then(data => {
                    unstable_batchedUpdates(() => {
                        setPinnedData(data?.data)
                        setPinnedDataNextUrl(data?.links?.next)
                    })

                })
            },
            response => {
                response.text().then(data => {
                    console.warn('handleGetBroadcast2Fail', data, response.url)
                })
            }
        ).then()
    }

    const getMoreNormalBroadcast = (url, scrollToIndex = 0) => {
        if (!!url) {
            dispatchFetchRequest(
                url,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    },
                },
                response => {
                    response.json().then(data => {
                        unstable_batchedUpdates(() => {
                            setNormalData(data?.data)
                            setNormalDataNextUrl(data?.links?.next)
                            setNormalDataPrevUrl(data?.links?.prev)
                            setRefreshing(false)
                        })

                        normalMsgScrollViewRef?.current?.scrollToIndex({ index: scrollToIndex, viewPosition: 1 })
                    })
                },
                response => {
                    response.text().then(data => {
                        console.warn('getMoreNormalBroadcastFail', data, response.url)
                    })
                }
            ).then()
        }
    }

    const getMorePinnedBroadcast = (url) => {
        if (!!url) {
            dispatchFetchRequest(
                url,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    },
                },
                response => {
                    response.json().then(data => {
                        unstable_batchedUpdates(() => {
                            setPinnedData(pinnedData?.concat(data?.data))
                            setPinnedDataNextUrl(data?.links?.next)
                        })
                    })
                },
                response => {
                    response.text().then(data => {
                        console.warn('getMorePinnedBroadcastFail', data, response.url)
                    })
                }
            ).then()
        }
    }

    const handlePostBroadcast = (content, broadcastTypeId = 1, latitude, longitude, distance, broadcastOptionId = 1) => {
        let request = {
            content: content,
            broadcast_type_id: broadcastTypeId,
            latitude: latitude,
            longitude: longitude,
            distance: distance,
        }
        if (broadcastTypeId == 2) {
            request.broadcast_option_id = broadcastOptionId
        }

        userMsgTextInputRef.current?.blur()
        let tempUserMsg = userMsg
        setUserMsg('')
        dispatchFetchRequest(
            api.user.broadcasts,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(request)
            },
            response => {
                response.json().then(data => {
                    handleGetBroadcast(broadcastTypes, location)
                    unstable_batchedUpdates(() => {
                        getUserProfile(true)
                        setSettingOpen(false)
                    })
                })
            },
            response => {
                response.text().then(data => {
                    console.warn('handlePostBroadcastFail', data, response.url)
                    Alert.alert(
                        `發送失敗，請重試`,
                        ` `,
                        [
                            {
                                text: `確認`,
                                onPress: () => setUserMsg(tempUserMsg)
                            },

                        ]
                    )
                })
            }
        ).then()
    }

    useEffect(() => {
        getStrengths(userDistance, userBroadcastTypeId, userBroadcastTypeId === 1 ? null : userBroadcastOptionId)
    }, [userDistance, userBroadcastTypeId, userBroadcastOptionId]);

    const getStrengths = (distance, broadcast_type_id, broadcast_option_id = null) => {
        setStrengths(-1)
        dispatchFetchRequest(
            `${api.user.getStrengths}?distance=${!!distance ? distance : 0}&broadcast_type_id=${broadcast_type_id}&broadcast_option_id=${broadcast_option_id ?? ''}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                },
            },
            response => {
                response.json().then(data => {
                    setStrengths(data?.data?.to_be_consumed_strength)
                })
            },
            response => {
                response.text().then(data => {
                    console.warn('getStrengthsFail', data, response.url)
                })
            }
        ).then()
    }

    const handleOpenPinnedMsg = (flag) => {
        setPinnedDataOpen(flag)
    }

    const fitDistance = (distance) => {
        if (distance < 50) {
            if (location?.coords?.accuracy > distance) {
                return Math.ceil(location?.coords?.accuracy)
            }
            else {
                return 50
            }
        } else if (distance > 500000) {
            return 500000
        } else {
            if (location?.coords?.accuracy > distance) {
                return Math.ceil(location?.coords?.accuracy)
            }
            else {
                return distance
            }

        }
    }
    useEffect(() => {
        setUserDistance(fitDistance(userDistance))
    }, [settingOpen]);

    const handleRefresh = () => {
        if (!!normalDataPrevUrl) {
            getMoreNormalBroadcast(normalDataPrevUrl, 19)
        } else {
            handleGetBroadcast(broadcastTypes, location)
        }
    }

    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: '#fff', paddingBottom: 20 }}>

            <View
                style={{ flex: 1 }}
                onLayout={(e) => setMsgViewHeight(e?.nativeEvent?.layout?.height)}
            >
                {(!!pinnedData && (pinnedData?.length > 0)) && <Animatable.View
                    transition='height'
                    style={[{ flexGrow: 1, flexShrink: 0, borderColor: colors?.msgBorderColor, borderWidth: 5, position: 'absolute', width: '100%', zIndex: 100, backgroundColor: '#fff' },
                    (pinnedDataOpen ? { height: msgViewHeight, minHeight: 130 } : { height: 130, minHeight: 130 })
                    ]}>
                    {pinnedDataOpen ?
                        <FlatList
                            scrollToOverflowEnabled={false}
                            ref={pinnedMsgScrollViewRef}
                            keyExtractor={(item) => `pinnedMsg_${item?.id}`}
                            data={!!pinnedData ? [...pinnedData].reverse() : []}
                            renderItem={({ item, index, separators }) => <MsgCard data={item} isTop />}
                            style={{ flex: 1 }}
                            onEndReachedThreshold={0.3}
                            onEndReached={info => {
                                if (!!pinnedDataNextUrl)
                                    getMorePinnedBroadcast(pinnedDataNextUrl)
                            }}
                            ListFooterComponent={!!pinnedDataNextUrl ? <Text style={{ textAlign: 'center' }}>載入中...</Text> : null}
                        />
                        :
                        <View style={{ flex: 1 }}>
                            {!pinnedData ?
                                <View style={{ alignItems: 'center' }}>
                                    <Text>Loading...</Text>
                                </View> :
                                (pinnedData?.length === 0) ?
                                    <View style={{ alignItems: 'center' }}>
                                        <Text>No Data</Text>
                                    </View> :
                                    <MsgCard data={pinnedData?.[0]} isTop limitContent />
                            }
                        </View>
                    }
                    <TouchableOpacity
                        onPress={() => handleOpenPinnedMsg(!pinnedDataOpen)}
                        style={{
                            alignItems: 'center'
                        }}>
                        <Ionicons name={pinnedDataOpen ? "chevron-up" : "chevron-down"} size={24} color={colors?.msgBorderColor} />
                    </TouchableOpacity>

                </Animatable.View>}
                <FlatList
                    ref={normalMsgScrollViewRef}
                    initialNumToRender={10}
                    inverted
                    style={{ flex: 1, marginTop: (!!pinnedData && (pinnedData?.length > 0)) ? 130 : 0, marginHorizontal: 5 }}
                    data={normalData ?? []}
                    renderItem={({ item, index, separators }) => <MsgCard data={item} />}
                    onEndReachedThreshold={0.001}
                    onEndReached={info => {
                        if (!!normalDataNextUrl)
                            getMoreNormalBroadcast(normalDataNextUrl)
                    }}
                    ListFooterComponent={!!normalDataNextUrl ? <Text style={{ textAlign: 'center', height: 50 }}>載入中...</Text> : null}
                    onRefresh={() => { setRefreshing(true); handleRefresh() }}
                    refreshing={refreshing}
                    onMomentumScrollBegin={() => setShowGotoBottom(true)}
                    onMomentumScrollEnd={(e) => {
                        if (e?.nativeEvent?.contentOffset?.y <= 0) {
                            setShowGotoBottom(false)
                        }
                    }}
                />
                {(!showGotoBottom && !normalDataPrevUrl) || <Animatable.View
                    animation="fadeIn"
                    style={{ width: 40, height: 40, position: 'absolute', right: 0, bottom: 0 }}
                >
                    <TouchableOpacity
                        onPress={() => { setRefreshing(true); normalMsgScrollViewRef?.current?.scrollToIndex({ index: 0, viewPosition: 1, animated: false }); handleGetBroadcast(broadcastTypes, location) }}
                    >
                        <Avatar
                            size={40}
                            rounded
                            source={require('../assets/goToBottom.png')}
                            imageProps={{ opacity: 0.8 }}
                        />
                    </TouchableOpacity>

                </Animatable.View>}
            </View>
            <View style={{ marginTop: 10 }}>
                {settingOpen &&
                    <View style={{ backgroundColor: '#e7e7e7', marginBottom: 10, padding: 15 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ textAlign: 'center' }}>廣播種類</Text>
                            </View>
                            <View style={{ flex: 3, flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <RNPickerSelect
                                        onValueChange={(value) => setUserBroadcastTypeId(value)}
                                        style={pickerSelectStyles('#fff')}
                                        useNativeAndroidPickerStyle={false}
                                        placeholder={{}}
                                        value={userBroadcastTypeId}
                                        items={broadcastTypes?.map((item) => ({ label: item?.name, value: item?.id }))}
                                        Icon={() => {
                                            return (
                                                <Ionicons name='caret-down' size={16} color={'#000'} style={{ position: 'absolute', top: -9, right: 0, borderWidth: 0 }} />
                                            )
                                        }}
                                    />
                                </View>
                                {userBroadcastTypeId === 2 && <View style={{ flex: 2, marginLeft: 5 }}>
                                    <RNPickerSelect
                                        onValueChange={(value) => setUserBroadcastOptionId(value)}
                                        style={pickerSelectStyles('#fff')}
                                        useNativeAndroidPickerStyle={false}
                                        placeholder={{}}
                                        value={userBroadcastOptionId}
                                        items={broadcastOptions?.map((item) => ({ label: item?.name, value: item?.id }))}
                                        Icon={() => {
                                            return (
                                                <Ionicons name='caret-down' size={16} color={'#000'} style={{ position: 'absolute', top: -9, right: 0, borderWidth: 0 }} />
                                            )
                                        }}
                                    />
                                </View>}
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ textAlign: 'center' }}>發送距離</Text>
                            </View>
                            <TouchableOpacity
                                style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => {
                                    setUserDistance(fitDistance(userDistance))
                                    navigation.navigate('MapScreen', { location: location, distance: fitDistance(userDistance), setUserDistance: (data) => setUserDistance(data) })
                                }}
                            >
                                <View style={{ flex: 1, marginRight: 20, flexDirection: 'row', alignItems: 'center' }}>
                                    <View
                                        style={[
                                            pickerSelectStyles('#fff')?.inputAndroid,
                                            { flex: 1 }
                                        ]}
                                        onPress={() => {
                                            setUserDistance(fitDistance(userDistance))
                                            navigation.navigate('MapScreen', { location: location, distance: fitDistance(userDistance), setUserDistance: (data) => setUserDistance(data) })
                                        }}
                                    >
                                        <View style={[pickerSelectStyles('#fff')?.inputAndroid, { alignItems: 'center', justifyContent: 'center' }]}>
                                            <Text>{userDistance}</Text>
                                        </View>

                                    </View>
                                    <Text style={{ marginLeft: 10 }}>{'公尺'}</Text>
                                </View>
                                <View
                                    style={{ marginRight: 5 }}

                                >
                                    <FontAwesome name="map-marker" size={24} color="black" />
                                </View>
                            </TouchableOpacity>

                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ textAlign: 'center' }}>本次消耗</Text>
                            </View>
                            <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
                                <View style={[pickerSelectStyles('#fff')?.inputAndroid, { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
                                    <Text style={{ color: strengths > userProfile?.strength?.amount ? 'red' : '#000' }}>{strengths === -1 ? '- -' : strengths}</Text>
                                    <Text style={{ color: '#000' }}> / {userProfile?.strength?.amount}</Text>
                                </View>
                                {(getStrengthCountdown % 300 === 0) || <View style={[pickerSelectStyles('#222222')?.inputAndroid, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 7, paddingHorizontal: 14 }]}>
                                    <Text style={{ color: '#fff' }}>{secondToMinute(getStrengthCountdown)?.min}:{secondToMinute(getStrengthCountdown)?.sec}</Text>
                                </View>}
                            </View>

                        </View>
                    </View>}
                <View style={{ flexDirection: 'row', backgroundColor: '#fff' }}>
                    <TouchableOpacity
                        disabled={!location}
                        onPress={() => setSettingOpen(!settingOpen)}
                        style={{
                            backgroundColor: (!location) ? colors?.disableColor : colors?.mainActionColor,
                            aspectRatio: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <MaterialCommunityIcons name="bullhorn" size={24} color={'#fff'} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, marginHorizontal: 10 }}>
                        <TextInput
                            ref={userMsgTextInputRef}
                            onChangeText={(text) => {
                                const lines = text.split("\n")
                                if (lines.length <= 3) {
                                    setUserMsg(text)
                                }
                            }}
                            onSubmitEditing={() => { }}
                            value={userMsg}
                            placeholder={`本次消耗 ${strengths === -1 ? '- -' : strengths} / ${userProfile?.strength?.amount ?? 0}`}
                            placeholderTextColor={'#727272'}
                            maxLength={200}
                            multiline={!!multiline}
                            onFocus={() => { setmultiline(true); setTimeout(() => userMsgTextInputRef?.current?.focus(), 10) }}
                            onBlur={() => {
                                if (!userMsg)
                                    setmultiline(false)
                            }}
                            style={[
                                {
                                    textAlign: 'left',
                                    paddingVertical: 0,
                                    paddingHorizontal: 10,
                                    borderWidth: 1,
                                    borderColor: colors?.mainActionColor,
                                    height: Platform.OS === 'ios' ? 40 : 40,
                                    textAlignVertical: "center",
                                },
                            ]}
                        />
                    </View>
                    <TouchableOpacity
                        disabled={!location || !userMsg || submitDisabled || (strengths < 0 || strengths > userProfile?.strength?.amount)}
                        onPress={() => handlePostBroadcast(userMsg, userBroadcastTypeId, location?.coords?.latitude, location?.coords?.longitude, userDistance, userBroadcastOptionId)}
                        style={{
                            backgroundColor: (!location || !userMsg || submitDisabled || (strengths < 0 || strengths > userProfile?.strength?.amount)) ? colors?.disableColor : colors?.mainActionColor,
                            aspectRatio: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Ionicons name="send" size={24} color="#fff" />
                    </TouchableOpacity>

                </View>
            </View>

        </View>
    );
}

export default HomeScreen

const pickerSelectStyles = (color) => {
    return StyleSheet.create({
        inputIOS: {
            fontSize: 16,
            paddingVertical: 5,
            paddingHorizontal: 5,
            //borderRadius: 4,
            backgroundColor: color,
            color: '#000'
        },
        inputAndroid: {
            fontSize: 16,
            paddingHorizontal: 5,
            paddingVertical: 5,
            backgroundColor: color,
            color: '#000'
        },
        iconContainer: {
            top: Platform.OS === 'ios' ? 15 : 20,
            right: 5,
        }
    });
}