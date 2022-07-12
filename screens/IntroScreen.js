import React from 'react';
import { Image, View } from 'react-native';
import { Pages } from 'react-native-pages';
import colors from '../constants/Colors';

const IntroScreen = (props) => {

    return (
        <Pages indicatorColor={colors?.mainActionColor}
            onScrollStart={(e) => {
                if (e === 3) {
                    props?.setHadOpenApp(true)
                }
            }}
        >
            <View style={{ flex: 1, marginVertical: '10%' }}>
                <Image
                    style={{ width: '100%', height: '100%' }}
                    source={require('../assets/intro/1.jpg')}
                />
            </View>
            <View style={{ flex: 1, marginVertical: '10%' }}>
                <Image
                    style={{ width: '100%', height: '100%' }}
                    source={require('../assets/intro/2.jpg')}
                />
            </View>
            <View style={{ flex: 1, marginVertical: '10%' }}>
                <Image
                    style={{ width: '100%', height: '100%' }}
                    source={require('../assets/intro/3.jpg')}
                />
            </View>
            <View style={{ flex: 1, marginVertical: '10%' }}>
                <Image
                    style={{ width: '100%', height: '100%' }}
                    source={require('../assets/intro/4.jpg')}
                />
            </View>
        </Pages>
    )
}

export default IntroScreen