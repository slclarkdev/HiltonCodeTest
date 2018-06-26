import React, {Component} from 'react';

import CheckBox from 'components/CheckBox';
import DropDown from 'components/DropDown';
import  'styles.css';

/* Shows a single room Checkbox and Dropdown are their own components to illustrate separation of components*/
class SingleRoom extends Component {
    render(){
        return(
            <div className="singleRoom">
                <div className={this.props.roomObj.enabledClass}>
                   <div className="rowTitle">
                       <CheckBox
                           default={this.props.default}
                           roomObj={this.props.roomObj}
                           handleCheckBox={this.props.handleCheckBox}
                       />
                        <h2>Room {this.props.roomObj.roomNum}</h2>
                   </div>
                    <DropDown
                        default={this.props.default}
                        roomObj={this.props.roomObj}
                        handleChange={this.props.handleChange}
                        refresh={this.props.refreshDropDown}/>
                </div>
            </div>
        )
    }
}


export default SingleRoom;
