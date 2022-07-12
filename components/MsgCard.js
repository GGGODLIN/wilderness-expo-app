import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import moment from "moment-timezone";
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import avatars from '../assets/avatars';
import colors from '../constants/Colors';
import { formatDistanceText } from '../helpers/distanceHelpers';

/*
   Date   : 2021-04-14
   Author : GGGODLIN
   Content: props
                

*/
export const MsgCard = (props) => {

    const [timeCountDown, setTimeCountDown] = useState(new Date(props?.data?.effective_until) - new Date());
    const [isPinned, setIsPinned] = useState(props?.data?.broadcast_type_id === 2);
    const [isTop, setIsTop] = useState(props?.isTop);

    useEffect(() => {
        if (isPinned && isTop) {
            const timerID = setInterval(
                () => {
                    setTimeCountDown(new Date(props?.data?.effective_until) - new Date())
                },
                1000
            );
            return () => { clearInterval(timerID) };
        }
    }, [props?.data?.effective_until]);


    return (
        <View style={{ margin: 5, paddingVertical: 10, paddingHorizontal: 5 }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'column', marginRight: 10 }}>
                    <Avatar
                        size={40}
                        rounded
                        source={avatars?.[`${props?.data?.user_default_avatar > 0 ? props?.data?.user_default_avatar : 1}`]}
                        containerStyle={{ borderWidth: 3, borderColor: isPinned ? colors?.msgBorderColor : colors?.disableColor, padding: 3 }}
                    />
                    <View style={{ borderLeftWidth: 3, flex: 1, alignSelf: 'center', borderColor: isPinned ? colors?.msgBorderColor : colors?.disableColor }}>

                    </View>
                </View>
                <View style={{ flexDirection: 'column', flex: 1 }}>
                    <View style={{ minHeight: 40, justifyContent: 'flex-end' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold' }}>{props?.data?.user_name}  </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialCommunityIcons name="bullhorn" size={14} color={'rgb(184,184,184)'} />
                                <Text style={{ color: 'rgb(184,184,184)', fontSize: 12 }}>{formatDistanceText(props?.data?.distance)?.value}{formatDistanceText(props?.data?.distance, 'en')?.unit}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                {(!!props?.data?.effective_until && isPinned && isTop) && <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Ionicons name="timer-outline" size={14} color='rgb(184,184,184)' />
                                    <Text style={{ paddingLeft: 5, paddingRight: 15, color: 'rgb(184,184,184)', fontSize: 12 }}>{timeCountDown?.toTime()}</Text>
                                </View>}
                                <Text style={{ color: 'rgb(184,184,184)', fontSize: 12 }}>{formatDistanceText(props?.data?.distance_from_current_user)?.value}{formatDistanceText(props?.data?.distance_from_current_user, 'en')?.unit}  {moment(props?.data?.created_at ?? new Date()).format("AHH:mm")}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text numberOfLines={props?.limitContent ? 1 : 0}>{props?.data?.content}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export const SmallMsgCard = (props) => {

    const [timeCountDown, setTimeCountDown] = useState(new Date(props?.data?.effective_until) - new Date());

    useEffect(() => {
        const timerID = setInterval(
            () => {
                setTimeCountDown(new Date(props?.data?.effective_until) - new Date())
            },
            1000
        );
        return () => { clearInterval(timerID) };
    }, [props?.data?.effective_until]);


    return (
        <View style={{ margin: 5, backgroundColor: '#e7e7e7', padding: 10, maxHeight: 100 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Ionicons name="timer-outline" size={18} color="black" />
                <Text style={{ paddingLeft: 5 }}>{timeCountDown?.toTime()}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold' }}>{props?.data?.user_name}  </Text>
                    <MaterialCommunityIcons name="bullhorn" size={14} color={'#000'} />
                    <Text>{formatDistanceText(props?.data?.distance)?.value}{formatDistanceText(props?.data?.distance, 'en')?.unit}</Text>
                </View>
                <Text>{formatDistanceText(props?.data?.distance_from_current_user)?.value}{formatDistanceText(props?.data?.distance_from_current_user, 'en')?.unit}  {moment(props?.data?.created_at ?? new Date()).format("AHH:mm")}</Text>
            </View>
            <View style={{ marginTop: 10 }}>
                <Text numberOfLines={1}>{props?.data?.content}</Text>
            </View>
        </View>
    )
}


Number.prototype.toTime = function (isSec) {
    var ms = isSec ? this * 1e3 : this,
        lm = ~(4 * !!isSec),  /* limit fraction */
        fmt = new Date(ms).toISOString().slice(11, -5);

    if (ms >= 8.64e7) {  /* >= 24 hours */
        var parts = fmt.split(/:(?=\d{2}:)/);
        parts[0] -= -24 * (ms / 8.64e7 | 0);
        return parts.join(':');
    }

    return fmt;
};