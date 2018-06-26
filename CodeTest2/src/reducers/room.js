import * as types from "actions/types";

export default function (state = [], action) {
    switch (action.type){
        case types.FETCH_ROOM_ARRAY:
          return {...state,roomArray:action.payload};
        case types.UPDATE_ROOM_ARRAY:
            return {...state,roomArray:action.payload};
        case types.SAVE_ROOMS:
            return {...state,roomArray:action.payload};
        default:
            return state;
    }
}
