import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Slider } from 'react-native-elements';
import MapView, { Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import colors from '../constants/Colors';
import { formatDistanceText, transferDistanceToSlider, transferSliderToDistance, transferSliderToZoom } from '../helpers/distanceHelpers';

const MapScreen = ({ navigation, route }) => {

    const circleRef = React.useRef();

    const [afterFirstRender, setAfterFirstRender] = useState(false);
    const [distance, setDistance] = useState(Number(route?.params?.distance) ?? 50);
    const [sliderValue, setSliderValue] = useState(transferDistanceToSlider(Number(route?.params?.distance)) ?? 0);
    const [selectedDistanceUnitIndex, setSelectedDistanceUnitIndex] = useState(0);
    const [slideEndFlag, setSlideEndFlag] = useState(new Date());


    useEffect(() => {
        if (!!circleRef.current)
            circleRef.current.setNativeProps({ fillColor: 'rgba(13,227,255,0.2)' });

    }, [afterFirstRender]);


    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1 }}
                showsUserLocation
                showsMyLocationButton={false}
                zoomEnabled={false}
                zoomTapEnabled={false}
                rotateEnabled={false}
                scrollEnabled={false}
                initialCamera={{
                    center: {
                        latitude: route?.params?.location?.coords?.latitude,
                        longitude: route?.params?.location?.coords?.longitude,
                    },
                    pitch: 0,
                    heading: 0,
                    altitude: 16,
                    zoom: transferSliderToZoom(sliderValue)
                }}
                camera={{
                    center: {
                        latitude: route?.params?.location?.coords?.latitude,
                        longitude: route?.params?.location?.coords?.longitude,
                    },
                    pitch: 0,
                    heading: 0,
                    altitude: 16,
                    zoom: transferSliderToZoom(sliderValue)
                }}
                onMapReady={() => setAfterFirstRender(true)}
            >
                <Circle
                    ref={circleRef}
                    center={{
                        latitude: route?.params?.location?.coords?.latitude,
                        longitude: route?.params?.location?.coords?.longitude,
                    }}
                    radius={distance}
                    strokeWidth={0}
                    fillColor={'rgba(13,227,255,0.2)'}
                />

            </MapView>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F2F2F2', paddingBottom: 10 }}>
                <View style={{ marginHorizontal: 10 }}>
                    <Text style={{ color: colors?.mainActionColor }}>{formatDistanceText(distance)?.value} {formatDistanceText(distance)?.unit}</Text>
                </View>
                <Slider
                    style={{ flex: 1, height: 60 }}
                    minimumValue={0}
                    maximumValue={16}
                    minimumTrackTintColor="#DCD9D5"
                    maximumTrackTintColor="#DCD9D5"
                    value={sliderValue}
                    allowTouchTrack={true}
                    onValueChange={(e) => {
                        setSliderValue(Math.floor(e))
                        setDistance(transferSliderToDistance(Math.floor(e)))
                    }}
                    onSlidingComplete={(e) => { setSliderValue(Math.floor(e)); setSlideEndFlag(new Date()) }}
                    thumbStyle={{ height: 20, width: 20, backgroundColor: colors?.msgBorderColor }}
                />
                <TouchableOpacity
                    onPress={() => {
                        route?.params?.setUserDistance(distance)
                        navigation.goBack()
                    }}
                    style={{ marginHorizontal: 10, width: 80, alignItems: 'center', backgroundColor: '#fff', flexDirection: 'row', backgroundColor: colors?.secondActionColor, borderRadius: 5 }}>
                    <Text style={{ width: 80, textAlign: 'center', lineHeight: 32, color: '#fff' }}>{'確定'}</Text>

                </TouchableOpacity>
            </View>
            {/* fix google map bug */}
            {afterFirstRender && <View style={{ height: 1, backgroundColor: '#e7e7e7' }}>

            </View>}
        </View>
    );
}

export default MapScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});