import React, { useState, useEffect, useRef, Component } from 'react'
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

export default class MainScreen extends Component {

    state = {
        count: 0,
        vec_x: 0,
        vec_y: 0,
        vec_z: 0,
        cache_x: 0,
        cache_y: 0,
        cache_z: 0,
        angle: 0,
        subscription: null,
        loading: false,
        complete: false,
        flag: false,
    }

    componentDidUpdate() {
        if (this.state.flag) {
            this.setState({
                flag: false,
                angle: findAngle(this.state.vec_x,
                    this.state.vec_y, this.state.vec_z,
                    this.state.cache_x, this.state.cache_y,
                    this.state.cache_z
                )
            })
        }
    }

    _subscribe = (flag) => {
        if (flag) {
            this.setState({
                subscription: (Accelerometer.addListener(({ x, y, z }) => {
                    this.setState({ vec_x: x, vec_y: y, vec_z: z })
                }))
            })
        } else {
            this.setState({
                subscription: (Accelerometer.addListener(({ x, y, z }) => {
                    this.setState({ cache_x: x, cache_y: y, cache_z: z })

                }))
            })
        }
        Accelerometer.setUpdateInterval(500)

    }

    _unSubscribe = () => {
        if (this.state.subscription) {
            this.state.subscription.remove()
        }
        this.setState({ subscription: null })
    }

    _toggle = () => {
        if (subscription) {
            this._unSubscribe()
        } else {
            this._subscribe(true)
        }
    }

    _finishing = () => {
        this._subscribe(true)
        this.setState({ loading: true })
        this.intervalID = setInterval(() => {
            this.setState({ count: this.state.count + 1, flag: true })
        }, 1000)
        setTimeout(() => {
            this._unSubscribe()
            this.setState({ count: 0, loading: false, complete: false })
            clearInterval(this.intervalID)
        }, 5000)
    }

    _start = () => {
        this._subscribe(false)
        this.setState({ loading: true })
        this.intervalID = setInterval(() => {
            this.setState({ count: this.state.count + 1 })
        }, 1000)
        setTimeout(() => {
            this._unSubscribe()
            this.setState({ count: 0, loading: false, complete: true })
            clearInterval(this.intervalID)
        }, 3000)
    }

    render() {

        return (
            <View style={styles.screen}>
                <Text>
                    MainScreen
            </Text>
                <Text>각도 :{round(this.state.angle)}</Text>
                <Text>x: {round(this.state.vec_x)} y: {round(this.state.vec_y)} z: {round(this.state.vec_z)}</Text>
                <Text>cache_x: {round(this.state.cache_x)} cache_y: {round(this.state.cache_y)} cache_z: {round(this.state.cache_z)}</Text>

                <Button title="버튼" onPress={this._toggle} />
                <Button title={this.state.loading && this.state.complete ? "5초간 가만히" : this.state.loading ? "3초간 가만히" : this.state.complete ? "5초간 측정합니다" : "측정시작"}
                    onPress={this.state.complete ? this._finishing : this._start}
                    disabled={this.state.loading ? true : false}
                />
                <Text>{this.state.count}초</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'space-between',
        alignContent: 'center',

    }
})
