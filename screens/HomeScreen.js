import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Linking, Text, TouchableOpacity, View, Image, FlatList, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import avatars from '../assets/avatars';
import { MainActionButton, SecondActionButton } from "../components/ActionButtons";
import { api, dispatchFetchRequest } from "../constants/Backend";
import colors from '../constants/Colors';
import { ListItem, Icon, Header, Card, Divider } from '@rneui/themed'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import MasonryList from '@react-native-seoul/masonry-list';

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
    const titleStyle = { color: '#666666', fontSize: 16 };
    const indexLinkList = [
        {
            icon: <FontAwesome name="caravan" size={iconSize} style={iconStyle} />,
            title: '車泊熱點',
            component: <></>,
        },
        {
            icon: <FontAwesome name="snowboarding" size={iconSize} style={iconStyle} />,
            title: 'SUP秘境',
            component: <></>,
        },
        {
            icon: <FontAwesome name="campground" size={iconSize} style={iconStyle} />,
            title: '熱門營地',
            component: <></>,
        },
        {
            icon: <FontAwesome name="fish" size={iconSize} style={iconStyle} />,
            title: '親子營區',
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

    const indexLinkListItem = ({ item }) => {
        return (
            <View style={{ alignItems: 'center', paddingLeft: 15, paddingRight: 15, paddingTop: 20, paddingBottom: 0 }}>
                <TouchableOpacity>
                    <View style={{ alignItems: 'center', paddingTop: 0, paddingBottom: 10 }}>
                        {item.icon}
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Text style={titleStyle}>{item.title}</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };
    
    const indexArticleList = [
        {
            title: '第 16 露分享',
            date: '2022-09-01',
            image: require('../assets/images/pexels-uriel-mont-6271392.jpg'),
            countViews: 125, 
        },
        {
            title: '太平山露營分享',
            date: '2022-09-01',
            image: require('../assets/images/pexels-uriel-mont-6271392.jpg'),
            countViews: 6521, 
        },
        {
            title: '太平山露營分享',
            date: '2022-09-01',
            image: require('../assets/images/pexels-uriel-mont-6271392.jpg'),
            countViews: 6521, 
        },
    ];

    const indexWaterfallList = [
        {
            title: '露營分享1',
            date: '2022-09-01',
            image: require('../assets/images/views/view_1.jpg'),
            countViews: 125,
            component: <></>,
        },
        {
            title: '露營分享2',
            date: '2022-09-01',
            image: require('../assets/images/views/view_2.jpg'),
            countViews: 6521, 
            component: <></>,
        },
        {
            title: '露營分享3',
            date: '2022-09-01',
            image: require('../assets/images/views/view_3.jpg'),
            countViews: 6521, 
            component: <></>,
        },
        {
            title: '露營分享',
            date: '2022-09-01',
            image: require('../assets/images/views/view_4.jpg'),
            countViews: 6521, 
            component: <></>,
        },
        {
            title: '露營分享',
            date: '2022-09-01',
            image: require('../assets/images/views/view_5.jpg'),
            countViews: 6521, 
            component: <></>,
        },
        {
            title: '露營分享',
            date: '2022-09-01',
            image: require('../assets/images/views/view_6.jpg'),
            countViews: 6521, 
            component: <></>,
        },
        {
            title: '露營分享',
            date: '2022-09-01',
            image: require('../assets/images/views/view_7.jpg'),
            countViews: 6521, 
            component: <></>,
        },
        {
            title: '露營分享',
            date: '2022-09-01',
            image: require('../assets/images/views/view_8.jpg'),
            countViews: 6521, 
            component: <></>,
        },
        {
            title: '露營分享',
            date: '2022-09-01',
            image: require('../assets/images/views/view_9.jpg'),
            countViews: 6521, 
            component: <></>,
        },
        {
            title: '露營分享',
            date: '2022-09-01',
            image: require('../assets/images/views/view_10.jpg'),
            countViews: 6521, 
            component: <></>,
        },



    ]

    const indexWaterfallListItem = ({ item }) => {
        return (
            <View style={{ marginBottom: 10 }}>
                <View style={{ alignItems: 'center', paddingBottom: 10 }}>
                    <Image
                        style={{ width: 100, height: 100 }}
                        source={item.image}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent:'space-between', alignItems: 'left', paddingLeft: 10 }}>
                    <Text style={{ fontSize: 16, color: '#666', }} color={'#999999'}>{item.title}</Text>
                </View>
            </View>
        );
    };

    const articleImages = ({ item }) => {
        return (
            <>
                <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={item.image}
                />
                {/*
                <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={item.image}
                />
                <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={item.image}
                />
                <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={item.image}
                />
                <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={item.image}
                />
                <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={item.image}
                />
                */}
            </>
        );
    };
      
    return (
        <View style={{ flex: 1, padding: 0, backgroundColor: '#fff', borderTopWidth: 2, borderColor: colors?.InactiveColor }}>
            <Image
                resizeMode="cover"
                style={{ width: '100%', height: '100%', maxHeight: 200 }}
                source={require('../assets/images/pexels-uriel-mont-6271392.jpg')}
            />
            <View style={{ alignItems: 'center', paddingBottom: 20 }}>
                <FlatList
                    data={indexLinkList}
                    numColumns={4}
                    scrollEnabled={false}
                    renderItem={indexLinkListItem}
                    keyExtractor={(item) => item.alt}
                />
            </View>
            <ScrollView>
                {/*key={i}*/}

                <MasonryList
                    data={indexWaterfallList}
                    keyExtractor={(item): string => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={indexWaterfallListItem}
                    /*
                    refreshing={isLoadingNext}
                    onRefresh={() => refetch({first: ITEM_CNT})}
                    onEndReachedThreshold={0.1}
                    onEndReached={() => loadNext(ITEM_CNT)}
                    */
                />

            </ScrollView>
{/*
{indexArticleList.map((u, i) => {
    return (
        <View style={{ marginBottom: 10 }}>
            <View style={{ alignItems: 'center', paddingBottom: 10 }}>
                <FlatList
                    data={indexArticleList}
                    numColumns={6}
                    scrollEnabled={false}
                    renderItem={articleImages}
                    keyExtractor={(item) => item.alt}
                />
            </View>
            <View style={{ flexDirection: 'row', justifyContent:'space-between', alignItems: 'left', paddingLeft: 10 }}>
                <Text style={{ fontSize: 16, color: '#666', }} color={'#999999'}>{u.title}</Text>
                <View style={{ flexDirection: 'row', justifyContent:'space-between', paddingRight: 5 }}>
                    <FontAwesome name="fire" size={10} style={{ color: '#AEAEAE', padding: 3 }} />
                    <Text style={{ fontSize: 16, marginRight: 5, color: '#999999', }}>{u.countViews}</Text>
                </View>
            </View>
        </View>
    );
})}
*/}
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
});

export default HomeScreen