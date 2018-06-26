import * as types from '../actions/types';
const origRoomArray =  [
    {
        roomNum: "1",
        numAdults: 1,
        numChildren: 0,
        enabled: true,
        enabledClass: 'enabled'
    },
    {
        roomNum: "2",
        numAdults: 1,
        numChildren: 0,
        enabled: false,
        enabledClass: 'disabled'
    },
    {
        roomNum: "3",
        numAdults: 1,
        numChildren: 0,
        enabled: false,
        enabledClass: 'disabled'
    },
    {
        roomNum: "4",
        numAdults: 1,
        numChildren: 0,
        enabled: false,
        enabledClass: 'disabled'
    }
    ];

    function getJSONFromStorage(){
        let currentState = JSON.parse(localStorage.getItem('reduxState'));
        if (currentState === null){
            return origRoomArray
        }
        return currentState.rooms.roomArray;
    }

    function setStorageFromJSON(roomArray){
        let currentState = JSON.parse(localStorage.getItem('reduxState'));
        currentState.rooms = {roomArray};
        localStorage.setItem('reduxState',JSON.stringify(currentState));
    }


    export function fetchRoomArray () {
        let roomArray = getJSONFromStorage();
        return{
            type: types.FETCH_ROOM_ARRAY,
            payload: roomArray
        }
    };

    export function updateRoomStore(roomArray){
        setStorageFromJSON(roomArray);
        return{
            type: types.UPDATE_ROOM_ARRAY,
            payload: roomArray
        }
    };

    export function saveRoomArray(roomArray){
        return{
            type: types.SAVE_ROOMS,
            payload: roomArray
        }
    };
