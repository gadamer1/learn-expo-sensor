import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { Accelerometer, Gyroscope } from 'expo-sensors'
import timer from 'react-native-timer'
import useInterval from '../utils/useInterval'

function round(n) {
    if (!n) {
        return 0;
    }

    return Math.floor(n * 100) / 100;
}

function findAngle(x, y, z, cache_x, cache_y, cache_z) {

    //벡터 길이
    const vector1_dst = Math.sqrt(x * x + y * y + z * z)
    const vector2_dst = Math.sqrt(cache_x * cache_x + cache_y * cache_y + cache_z * cache_z)

    //내적 값
    const inner_product = x * cache_x + y * cache_y + z * cache_z

    return Math.acos(inner_product / vector1_dst * vector2_dst) * 180 / Math.PI
}

const MainScreen = props => {

    const [count, setCount] = useState(0)
    const [vec_x, setVec_x] = useState(0)
    const [vec_y, setVec_y] = useState(0)
    const [vec_z, setVec_z] = useState(1)
    const [cache_x, setCache_x] = useState(null)
    const [cache_y, setCache_y] = useState(null)
    const [cache_z, setCache_z] = useState(null)
    const [angle, setAngle] = useState(0)
    const [subscription, setSubscription] = useState(null)
    const [flag, setFlag] = useState(false)

    const _subscribe = (setX, setY, setZ) => {
        setSubscription(Accelerometer.addListener(({ x, y, z }) => {
            setX(x)
            setY(y)
            setZ(z)
        }))
        Accelerometer.setUpdateInterval(100)
    }

    useEffect(() => {
        if (cache_x && cache_y && cache_z) {
            setAngle(findAngle(vec_x, vec_y, vec_z, cache_x, cache_y, cache_z))
        }
    }, [vec_x, vec_y, vec_z, cache_x, cache_y, cache_z])



    const _unSubscribe = () => {
        if (subscription) {
            subscription.remove()
        }
        setSubscription(null);
    }

    const _toggle = () => {
        if (subscription) {
            _unSubscribe()
        } else {
            _subscribe(setVec_x, setVec_y, setVec_z)
        }
    }

    const _start = () => {
        timer.setInterval('counter', () => {
            setCount(count + 1)
            console.log(count)
        }, 1000)
    }

    return (
        <View style={styles.screen}>
            <Text>
                MainScreen
            </Text>
            <Text>각도 :{round(angle)}</Text>
            <Text>x: {round(vec_x)} y: {round(vec_y)} z: {round(vec_z)}</Text>
            <Text>cache_x: {round(cache_x)} cache_y: {round(cache_y)} cache_z: {round(cache_z)}</Text>

            <Button title="버튼" onPress={_toggle} />
            <Button title="측정시작" onPress={_start} />
            <Text>{count}초</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'space-between',
        alignContent: 'center',

    }
})


export default MainScreen