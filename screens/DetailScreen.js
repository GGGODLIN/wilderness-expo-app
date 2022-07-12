import React from 'react';
import { Linking, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import colors from '../constants/Colors';

const detailText1 =
    `Echo Square 回聲廣場
`
const detailText2 =
    `想要我的訊息嗎？
一起去尋找吧！
`
const detailText3 =
    `> 發送一定距離的廣播
只有範圍內的人看的見

> 放置置頂廣播
讓經過的人都看得到

> 與三五好友一起嘰嘰喳喳
探索更多有趣的玩法吧
`
const detailText4 =
    `Echo Square 是一款提供使用者
發送具有範圍、持續時間的訊息
與接收範圍內訊息的通訊軟體
適用於活動行銷、定點放送、範圍通知、警告等，更多創意隨使用者搭配使用
`

const versionText =
    `版本編號：1.0.0
`
const copyrightText =
    `
造物者科技科技有限公司 版權所有
Copyright©2021 by Estiginto Co., Ltd
`

const DetailScreen = ({ navigation }) => {


    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: '#fff', borderTopWidth: 2, borderColor: colors?.msgBorderColor, paddingBottom: 20 }}>

            <ScrollView style={{ flex: 1 }}>
                <Text style={{ textAlign: 'left', fontWeight: 'bold' }}>{detailText1}</Text>
                <Text style={{ textAlign: 'left' }}>{detailText2}</Text>
                <Text style={{ textAlign: 'left', fontWeight: 'bold' }}>{detailText3}</Text>
                <Text style={{ textAlign: 'left' }}>{detailText4}</Text>
                <Text style={{ textAlign: 'left' }}>{versionText}</Text>
                <View style={{ justifyContent: 'flex-start', marginBottom: 14 }}>
                    <Text style={{ textAlign: 'left' }}>{'官方網站：'}</Text>
                    <Text
                        onPress={() => Linking.openURL('https://echosquare.app')}
                        style={{ color: 'blue', textDecorationLine: 'underline', textAlign: 'left' }}
                    >echosquare.app
                    </Text>
                </View>
                <View style={{ justifyContent: 'flex-start' }}>
                    <Text>客服信箱：</Text>
                    <Text
                        onPress={() => Linking.openURL('mailto:contact@estiginto.com')}
                        style={{ color: 'blue', textDecorationLine: 'underline' }}
                    >contact@estiginto.com
                    </Text>
                </View>
                <Text style={{ textAlign: 'left' }}>{copyrightText}</Text>
            </ScrollView>
        </View>
    );
}

export default DetailScreen