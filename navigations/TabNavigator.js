import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Ionicons } from '@expo/vector-icons'

import MainScreen from '../screens/MainScreen'
import SubScreen from '../screens/SubScreen'
import TestScreen from '../screens/TestScreen'


const TabNavigator = createBottomTabNavigator({
    accelometer: MainScreen,
    gyroscope: SubScreen,
    test: TestScreen
},
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                if (routeName == 'accelometer') {
                    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                    // Sometimes we want to add badges to some icons.
                    // You can check the implementation below.
                } else if (routeName === 'gyroscope') {
                    iconName = `ios-compass`;
                }
                // You can return any component that you like here!
                return <IconComponent name={iconName} size={25} color={tintColor} />;
            }
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray'
        }
    }

)

export default createAppContainer(TabNavigator)