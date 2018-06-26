import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import {Form} from 'react-bootstrap';

import SingleRoom from 'components/SingleRoom';
import {updateRoomStore} from "../actions";

/* Handles all the rooms in the list,
    Currently set to a maximum of 4
 */

class RoomList extends Component {
    constructor(props){
        super(props);
        this.state = {
            numAdults1: '1',
            numAdults2: '1',
            numAdults3: '1',
            numAdults4: '1',
            numChildren1: '0',
            numChildren2: '0',
            numChildren3: '0',
            numChildren4: '0'
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value});
    }

    handleSubmit = event =>{
        event.preventDefault();
        let newRoomArray = this.props.roomArray;
        for(let i=0; i<4;i++){
            let roomNum =i+1;
            if (`this.state.numAdults${roomNum}`.length > 0){
                let newAdult = `numAdults${roomNum}`;
                newRoomArray[i].numAdults = this.state[newAdult];
            }
            if (`this.state.numChildren${roomNum}`.length > 0){
                let newChild = `numChildren${roomNum}`;
                newRoomArray[i].numChildren = this.state[newChild];
            }

        }
        updateRoomStore(newRoomArray)
    };


    render() {
        if (typeof this.props.roomArray === 'undefined') {
            return null
        }

        let roomListing = this.props.roomArray.map((currentRoom) => {
            return (
                <div key={currentRoom.roomNum}>
                    <SingleRoom
                        roomObj={currentRoom}
                        default={this.props.default}
                        refreshDropDown={this.props.refreshDropDown}
                        handleCheckBox = {this.props.handleCheckBox}
                        handleChange = {this.handleChange}
                    />
                </div>
            )
        }, this);

        return(
            <Form name="roomForm" onSubmit={this.handleSubmit.bind(this)}>
                {roomListing}
                <div className="buttonGroup">
                    <button>Submit</button>
                </div>
            </Form>
        )
    }
}
RoomList.propTypes = {
    updateRoomStore:PropTypes.func,
    roomArray: PropTypes.array
};

function mapStateToProps(state){
    return{
        roomArray: state.rooms.roomArray
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        updateRoomStore: updateRoomStore
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps) (RoomList);