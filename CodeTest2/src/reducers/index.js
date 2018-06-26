import { combineReducers } from 'redux';
import roomReducer from 'reducers/room';

export default combineReducers({
    rooms: roomReducer
})