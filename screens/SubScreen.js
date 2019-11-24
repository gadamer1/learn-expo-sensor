import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { Gyroscope } from 'expo-sensors'

let cache_x;
let cache_y;
let cache_z;

function round(n) {
    if (!n) {
        return 0;
    }

    return Math.floor(n * 100) / 100;
}

function findAngle(x, y, z) {

    //벡터 길이
    const vector1_dst = Math.sqrt(x * x + y * y + z * z)
    const vector2_dst = Math.sqrt(cache_x * cache_x + cache_y * cache_y + cache_z * cache_z)

    //내적 값
    const inner_product = x * cache_x + y * cache_y + z * cache_z

    return Math.acos(inner_product / vector1_dst * vector2_dst) * 180 / Math.PI
}

const MainScreen = props => {

    const [a, setX] = useState(0)
    const [b, setY] = useState(0)
    const [c, setZ] = useState(0)
    const [angle, setAngle] = useState(0)
    const [subscription, setSubscription] = useState(null)

    const _subscribe = () => {
        setSubscription(Gyroscope.addListener(({ x, y, z }) => {
            cache_x = a;
            cache_y = b;
            cache_z = c;
            setX(x)
            setY(y)
            setZ(z)
        }))
        Gyroscope.setUpdateInterval(2000)
    }

    useEffect(() => {
        setAngle(findAngle(a, b, c))
    }, [a, b, c])

    const _unSubscribe = () => {
        if (subscription) {
            subscription.remove()
            setX(0)
            setY(0)
            setZ(0)
            cache_x = 0;
            cache_y = 0;
            cache_z = 0;
        }
        setSubscription(null);
    }

    const _toggle = () => {
        if (subscription) {
            _unSubscribe()
        } else {
            _subscribe()
        }
    }

    return (
        <View style={styles.screen}>
            <Text>
                MainScreen
            </Text>
            <Text>각도 :{round(angle)}</Text>
            <Text>x : {round(a)} y: {round(b)} z: {round(c)} cache_x: {round(cache_x)} cache_y: {round(cache_y)}</Text>

            <Button title="버튼" onPress={_toggle} />
        </View>
    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    }
})


export default MainScreen