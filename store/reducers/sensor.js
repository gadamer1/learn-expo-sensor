import { CHANGE_SENSOR } from '../actions/sensor'

const InitialState = {
    sensor: null
}


export default sensorReducer = (state = InitialState, action) => {
    switch (action.type) {
        case CHANGE_SENSOR: {
            return state
        };
        default: {
            return state
        };
    }
}