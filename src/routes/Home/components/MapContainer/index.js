import React from "react";
import { View } from "native-base";
import MapView, { PROVIDER_GOOGLE} from "react-native-maps";
import styles from "./MapContainerStyles";
import SeachBox from "../SearchBox/index";
import SearchResults from "../SearchResults/index";

export const MapContainer = ({
            region,getInputData,toggleSearchResultModel,getAddressPredictions,
            resultTypes,predictions,getSelectedAddress,selectedAddress
        }) => {
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={ PROVIDER_GOOGLE} 
                showsUserLocation
                region = {region} 
            >
              <MapView.Marker
                coordinate={region}
                pinColor="red"
              />
            </MapView>
            <SeachBox 
                getInputData={getInputData} 
                toggleSearchResultModel={toggleSearchResultModel}
                getAddressPredictions={getAddressPredictions}
                selectedAddress={selectedAddress}/>

            {(resultTypes.pickUp || resultTypes.dropOff) &&
                <SearchResults predictions={predictions} getSelectedAddress={getSelectedAddress}/>
            }
        </View>
    );
}