import React, {Component} from 'react';

/*Returns a drop*/
class CheckBox extends Component {

    getCheckBox = () => {
        if (parseInt(this.props.roomObj.roomNum, 10) !== 1) {
            return (
                <input type="checkbox"
                      // name={`CheckBox${this.props.roomObj.roomNum}`}
                       id={`CheckBox${this.props.roomObj.roomNum}`}
                       defaultChecked={this.props.roomObj.enabled}
                       onClick={this.props.handleCheckBox}/>
            )
        }
        return;
    };


    render(){

        return(
            <span>{this.getCheckBox()}</span>
        )
    }
};

export default CheckBox;