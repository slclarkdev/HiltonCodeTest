import React from 'react';
import ReactDom from 'react-dom';

import Root from 'root';
import App from 'components/App';


let initState = {};
const persistedState = localStorage.getItem('reduxState');

// if persisted state is not empty, than assign parsed persisted state to init State
if(persistedState){
    initState = JSON.parse(persistedState);
}
ReactDom.render(
    <Root initState={initState}>
        <App/>
    </Root>,document.querySelector('#root'));