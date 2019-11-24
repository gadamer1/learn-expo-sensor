import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import HomeScreen from '../screens/HomeScreen'
import MainScreen from '../screens/MainScreen'
import TabNavigator from './TabNavigator'

const MainNavigator = createStackNavigator({
    HomeScreen: HomeScreen,
    x: TabNavigator
})

export default createAppContainer(MainNavigator)