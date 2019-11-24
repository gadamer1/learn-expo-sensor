import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'

import { colors } from '../constants'

const HomeScreen = props => {

    return (
        <View style={styles.screen}>
            <Text>
                HomeScreen
            </Text>
            <Button style={styles.button} color={colors.primary} title="Go to Main Screen" onPress={() => {
                props.navigation.navigate({
                    routeName: 'x'
                })
            }} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    button: {
        alignContent: 'center'
    }
})

export default HomeScreen