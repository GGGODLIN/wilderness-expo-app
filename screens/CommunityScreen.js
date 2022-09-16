import React from 'react';

const Stack = createStackNavigator();

import CommunityOneScreen from './CommunityOneScreen';
import CommunityTwoScreen from './CommunityTwoScreen';

export const CommunityScreen = ({ navigation, route }) => {

    return (
        <Stack.Navigator>
        <SettingsStack.Screen name="One" component={CommunityOneScreen} />
            <SettingsStack.Screen name="Two" component={CommunityTwoScreen} />
        </Stack.Navigator>
    );
}

export default ComingScreen
