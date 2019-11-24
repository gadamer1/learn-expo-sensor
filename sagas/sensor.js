import { all, fork, takeLatest, put } from 'redux-saga/effects'

import { CHANGE_SENSOR } from '../store/actions/sensor'

function* changeSensor() {
    try {
        yield put({
            type: CHANGE_SENSOR,
            data: 'success'
        })
    } catch (e) {
        console.error(e);
    }
}

function* watchChangeSensor() {
    yield takeLatest(CHANGE_SENSOR, changeSensor)
}

export default function* sensorSaga() {
    yield all([
        fork(watchChangeSensor)
    ])
}