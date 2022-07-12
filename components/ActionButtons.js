import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import colors from '../constants/Colors';
import styles from '../styles';

/*
   Date   : 2020-10-05
   Author : GGGODLIN
   Content: props
                onPress={()=>{}}
                title={string}
                style={{}}
                

*/

export const MainActionButton = (props) => {
    const buttonColor = props?.disabled ? colors?.disableColor : colors?.mainActionColor
    return (
        <TouchableOpacity
            disabled={props?.disabled}
            onPress={props?.onPress ?? (() => console.warn('no onPress'))}
        >
            <Text style={[styles?.bottomActionButton(buttonColor), styles?.actionButton(buttonColor), { padding: 10, marginBottom: 0, }, props?.style]}>
                {props?.title ?? 'Submit'}
            </Text>
        </TouchableOpacity>
    )
}

export const SecondActionButton = (props) => {
    const buttonColor = props?.disabled ? colors?.disableColor : colors?.secondActionColor
    return (
        <TouchableOpacity
            disabled={props?.disabled}
            onPress={props?.onPress ?? (() => console.warn('no onPress'))}
        >
            <Text style={[styles?.bottomActionButton(buttonColor), styles?.actionButton(buttonColor), { padding: 10, marginBottom: 0, }, props?.style]}>
                {props?.title ?? 'Submit'}
            </Text>
        </TouchableOpacity>
    )
}



export const DeleteFlexButton = (props) => {
    return (
        <TouchableOpacity
            onPress={props?.onPress ?? (() => console.warn('no onPress'))}
            style={[styles?.flexButton(colors?.mainActionColor), {
                borderColor: '#f75336',
                color: '#fff',
                backgroundColor: '#f75336'
            }]}
        >
            <Text style={styles.flexButtonText}>
                {props?.title ?? 'Submit'}
            </Text>
        </TouchableOpacity>
    )
}

