import React, {Component} from 'react';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

class DropDown extends Component {
   constructor(props){
       super(props);

       this.state = {
           adultDefaultValue: this.props.roomObj.numAdults,
           childDefaultValue: this.props.roomObj.numChildren
       }


   }

    // sets the default values for the drop down when a checkbox is changed.
    // properties are being set, but the browser is not showing the number,
    // unfortunately I need more time to debug this
    handleSelectChange(event){
        if (this.props.roomObj.enabled === true) {
            if (event.target.id.indexOf("Adult") >= 0) {
                this.setState({adultDefaultValue: event.target.value});
            } else {
                this.setState({childDefaultValue: event.target.value});
            }
        } else {
            if (event.target.id.indexOf("Adult") >= 0) {
                this.setState({adultDefaultValue: this.props.default.adults});
            } else {
                this.setState({childDefaultValue: this.props.default.adults});
            }
        }
        this.props.handleChange(event);
    }

    // Used to trigger a refresh.
    componentWillReceiveProps(props){
       if (props.roomObj.enabled === false){
           this.setState({
               adultDefaultValue: props.default.adults,
               childDefaultValue: props.default.children
           })
       }
    }


    renderDropDown (currentObj) {

        let options = currentObj.currentArray.map(function (value) {
            return( <option key={value} value={value}>{value}</option>)
        });

        return (
            <FormGroup controlId={currentObj.currentId}>
                <ControlLabel>{currentObj.currentLabel}</ControlLabel>
                <FormControl componentClass="select"
                             name={currentObj.currentId}
                             defaultValue= {currentObj.defaultSelected}
                             disabled={currentObj.enabled === false}
                            onChange={this.handleSelectChange.bind(this)}>
                    {options}
                </FormControl>
            </FormGroup>
        )
    };

   initializeAdultObj() {
       return {
           currentArray: [1, 2],
           currentId: `numAdults${this.props.roomObj.roomNum}`,
           currentLabel: 'Adults (18)+',
           defaultSelected: this.state.adultDefaultValue,
           enabled: this.props.roomObj.enabled
       };
   }
   initializeChildObj(){
       return {
           currentArray: [0,1,2],
           currentId : `numChildren${this.props.roomObj.roomNum}`,
           currentLabel: 'Children(0-17)',
           defaultSelected: this.state.childDefaultValue,
           enabled:  this.props.roomObj.enabled
       };
   }


    render(){
        if (typeof this.props.roomObj === 'undefined') {
            return null
        }
        let adultObj = this.initializeAdultObj();
        let childObj = this.initializeChildObj();
        let adultDropDown = this.renderDropDown(adultObj);
        let childrenDropDown = this.renderDropDown(childObj);

        return(
            <div className="groupedControls clearFloats">
                {adultDropDown}
                {childrenDropDown}
            </div>
        )
    }
};

export default DropDown;