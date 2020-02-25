import React from "react";
import {Container} from "native-base";
import { PermissionsAndroid } from "react-native";
import {MapContainer} from "./MapContainer/index"
import HeaderComponents from "../../../components/HeaderComponent/index";
import FooterComponent from "../../../components/FooterComponents/index";
import Fare from "./Fare/index";
import Fab from "./Fab/index";

class Home extends React.Component{
    

    componentDidMount(){
        // this.props.getCurrentLocation();
        if (Platform.OS === "android") {
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            ).then(granted => {
                if (granted) this.props.getCurrentLocation();
            });
        } else {
            this.props.getCurrentLocation();
        }
    }

    render(){
        const region = {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
        return(
            
            <Container>
                 <HeaderComponents/>
                { this.props.region.latitude &&
                   <MapContainer 
                     region={this.props.region} 
                     getInputData={this.props.getInputData}
                     toggleSearchResultModel={this.props.toggleSearchResultModel}
                     getAddressPredictions={this.props.getAddressPredictions}
                     resultTypes={this.props.resultTypes}
                     predictions={this.props.predictions}
                     getSelectedAddress={this.props.getSelectedAddress}
                     selectedAddress={this.props.selectedAddress}

                    />
                }

                 <Fab onPressAction={()=>this.props.bookCar()} />

                {
                    this.props.distanceMatrix && 
                    <Fare fare={this.props.fare} />
                }
                <FooterComponent />
            </Container>
        );
       
    }

}

export default Home;