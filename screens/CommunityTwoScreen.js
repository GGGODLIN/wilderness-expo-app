import React from 'react';

export const ComingTwoScreen = ({ navigation, route }) => {
    return (
        <button onClick={() => { navigation.navigate('One') }}>Two</button>
    );
}

export default ComingScreen
