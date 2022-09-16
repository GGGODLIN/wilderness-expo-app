import React from 'react';

export const ComingOneScreen = ({ navigation, route }) => {
    return (
        <button onClick={() => { navigation.navigate('Two') }}>One</button>
    );
}

export default ComingScreen
