import React from 'react';
import { View, StyleSheet } from 'react-native';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import createStore from "./store/createStore";
import AppContainer from "./AppContainer/index"; 


class Root extends React.Component{

    renderApp(){
        const initialState = window.__INTITIAL_STATE__;
        const store = createStore(initialState);

        return(
                <AppContainer store={store}/>         
        );
    }
    render(){
        return this.renderApp();
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})
export default Root;