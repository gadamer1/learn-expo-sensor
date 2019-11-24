import { all, fork } from 'redux-saga/effects'

import sensorSaga from './sensor'

export default function* rootSaga() {
    yield all([
        fork(sensorSaga),
    ])
}