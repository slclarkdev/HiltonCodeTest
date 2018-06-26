import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";

import RoomList from 'components/RoomList';
import {fetchRoomArray, updateRoomStore} from '../actions/';


class App extends Component {
    constructor (props){
        super(props);
        this.state = {
            default: {
                adults: 1,
                children: 0}
        }
    };

    // Handle checkbox is done at the top level since it needs the room array
    // as well as to function with all checkboxes across the application.
    handleCheckBox = event =>{
        let updatedRoomArray = [...this.props.roomArray];
        let boxNum = parseInt(event.target.id.slice(-1),10) - 1;
        if (event.target.checked){
            // any checkboxes before this one should become checked except for the first item.
            for (let i=1; i<=boxNum;i++){
                updatedRoomArray[i].enabled = true;
                updatedRoomArray[i].enabledClass='enabled';
            }
        } else {
            // not checked.  Any Room coming after must be disabled and reset to the defaults.
            for (let unchecked=boxNum; unchecked<=3; unchecked++){
                updatedRoomArray[unchecked].numAdults = 1;
                updatedRoomArray[unchecked].numChildren = 0;
                updatedRoomArray[unchecked].enabled = false;
                updatedRoomArray[unchecked].enabledClass = 'disabled';
            }
        }
        // Update state and trigger a re-render via the action.
        let updatedRoomToState = {roomArray: updatedRoomArray.slice()};
        this.setState({rooms:updatedRoomToState});
        updateRoomStore(updatedRoomToState);
        // Makes sure to refresh the drop down
        this.refreshDropDown();

    }

    refreshDropDown = () => this.setState({refreshDropDown: !this.state.refreshDropDown})

    componentDidMount(){
        this.props.fetchRoomArray();
        this.setState({refreshDropDown: false});
    }



    render(){
        return <RoomList
            default = {this.state.default}
            roomArray = {this.props.roomArray}
            refreshDropDown={this.state.refreshDropDown}
            handleCheckBox = {this.handleCheckBox.bind(this)}

        />
    }
}
function mapStateToProps(state){
    return{
        roomArray: state.rooms.roomArray
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        fetchRoomArray: fetchRoomArray,
        updateRoomStore: updateRoomStore
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps) (App);
