import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from "./reducers/";


// Used to allow for jest/Enzyme testing.
export default props => {
    let store =createStore(reducers,props.initState)
    store.subscribe(()=>{
        localStorage.setItem('reduxState', JSON.stringify(store.getState()));
    });
    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    );
};