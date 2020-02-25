import { connect} from "react-redux";
import Home from "../components/Home";
import { 
    getCurrentLocation,
    getInputData,
    toggleSearchResultModel ,
    getAddressPredictions,
    getSelectedAddress,
    bookCar
    
} from "../modules/home";

const mapStateToProps = (state) => ({
    region: state.Home.region,
    inputData:state.Home.inputData || {},
    resultTypes:state.Home.resultTypes || {},
    predictions:state.Home.predictions || [],
    selectedAddress:state.Home.selectedAddress || {},
    fare:state.Home.fare ,
    distanceMatrix:state.Home.distanceMatrix,
    booking:state.Home.booking || {}
});

const mapActionCreators = {
    getCurrentLocation,
    getInputData,
    toggleSearchResultModel,
    getAddressPredictions,
    getSelectedAddress,
    bookCar
};

export default connect(mapStateToProps, mapActionCreators)(Home);
