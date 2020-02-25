import React from "react";
import { Text} from "react-native";
import { View, InputGroup, Input } from "native-base";
import styles from "./SearchBoxStyles";
import Icon from "react-native-vector-icons/FontAwesome";

const SearchBox = ({ getInputData, toggleSearchResultModel, getAddressPredictions,selectedAddress}) =>{
    const {selectedPickUp, selectedDropOff} = selectedAddress || {};
    function handleInput(key,val){
        getInputData({
            key,
            value:val
        });
        getAddressPredictions();

    }
    return(
        <View style={styles.searchBox}>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>PICK UP</Text>
                <InputGroup>
                    <Icon name="search" size={15} color="#ff5E3a" />
                    <Input style={styles.inputSearch} 
                       onFocus={()=>toggleSearchResultModel("pickUp")}
                       placeholder="Choose pick-up location"
                       onChangeText={handleInput.bind(this,"pickUp")} 
                       value={selectedPickUp && selectedPickUp.name} />
                </InputGroup>
            </View>

            <View style={styles.secondInputWrapper}>
                <Text style={styles.label}>DROP OFF</Text>
                <InputGroup>
                    <Icon name="search" size={15} color="#ff5E3a" />
                    <Input style={styles.inputSearch} 
                    onFocus={()=>toggleSearchResultModel("dropOff")}
                    placeholder="Choose drop-off location" 
                    onChangeText={handleInput.bind(this,"dropOff")}
                    value={selectedDropOff && selectedDropOff.name}
                    />
                </InputGroup>
            </View>
        </View>
    );
}

export default SearchBox;