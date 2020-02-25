import update from "react-addons-update";
import constants from "./actionConstants";
import Geolocation from 'react-native-geolocation-service';
import { Dimensions} from "react-native";
import RNGooglePlaces from "react-native-google-places";
import request  from "../../../util/request";

import calculateFare from "../../../util/fareCalculator";

//=======================================
//Constants
//======================================
const { 
        GET_CURRENT_LOCATION, 
        GET_INPUT,
        TOGGLE_SEARCH_RESULTS,
        GET_ADDRESS_PREDICTIONS,
        GET_SELECTED_ADDRESS,
        GET_DISTANCE_MATRIX,
        GET_FARE,
        BOOK_CAR
    } = constants;

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA
//==================================================
//Actions
//==================================

export function getCurrentLocation(){
	return(dispatch)=>{              
            Geolocation.getCurrentPosition(
               (position) => {
                    dispatch({
                        type: GET_CURRENT_LOCATION,
                        payload: position
                    });
               },
               (error) => console.log(error.message ),
               { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000  },
            );
	}
}

// GET_INPUT
export function getInputData(payload){
   return{
       type:GET_INPUT,
       payload
   }
}

// toggle search result model
export function toggleSearchResultModel(payload){
    return{
        type:TOGGLE_SEARCH_RESULTS,
        payload
    }
 }

 // GET ADDRESSES FROM GOOGLE PLACES

 export function getAddressPredictions(){
     
    return(dispatch,store) =>{
         let userInput = store().Home.resultTypes.pickUp? store().Home.inputData.pickUp:store().Home.inputData.dropOff;
         RNGooglePlaces.getAutocompletePredictions(userInput,
              {
                  country:"UG"
              }            
            ).then((results)=>{
                dispatch({
                    type:GET_ADDRESS_PREDICTIONS,
                    payload:results
                });
               }
            )
            .catch((error)=>console.log(error.message)); 
     } 
     
 }
// get selected address
  export function getSelectedAddress(payload){
      const dummyNumbers = {
          baseFare: 0.4,
          timeRate: 0.14,
          distanceRate: 0.97,
          surge:1
      }
      return (dispatch,store)=>{
          RNGooglePlaces.lookUpPlaceByID(payload)
          .then((results)=>{
              dispatch({
                  type: GET_SELECTED_ADDRESS,
                  payload:results
              })
          })
          .then(()=>{
              //get the distance and time
              if(store().Home.selectedAddress.selectedPickUp && store().Home.selectedAddress.selectedDropOff){
				request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
				.query({
					origins:"place_id:"+store().Home.selectedAddress.selectedPickUp.placeID,
					destinations:"place_id:"+store().Home.selectedAddress.selectedDropOff.placeID,
					mode:"driving",
					key:"AIzaSyDUYbTR-3PDWPhgxjENs4yf35g2eHc641s"
				})
				.finish((error, res)=>{
					dispatch({
						type:GET_DISTANCE_MATRIX,
						payload:res.body
					});
				})
			}
              setTimeout(function(){
                if(store().Home.selectedAddress.selectedPickUp && store().Home.selectedAddress.selectedDropOff){
                   if(store().Home.distanceMatrix){

                    const fare = calculateFare(
                        dummyNumbers.baseFare,
                        dummyNumbers.timeRate,
                        store().Home.distanceMatrix.rows[0].elements[0].duration.value,
						dummyNumbers.distanceRate,
						store().Home.distanceMatrix.rows[0].elements[0].distance.value,
						dummyNumbers.surge,
                    );
                    dispatch({
                        type:GET_FARE,
                        payload:fare
                    });
                   }
                    
                }
              },5000);
          })
          .catch((error)=> console.log(error.message));
      }
  }
  // BOOK CAR
  export function bookCar(){
      return (dispatch, store)=>{
         const payload = {
             data:{
                 userName:"yannick",
                 pickUp: {
                     address:store().Home.selectedAddress.selectedPickUp.address,
                     name:store().Home.selectedAddress.selectedPickUp.name,
                     latitude:store().Home.selectedAddress.selectedPickUp.location.latitude,
                     longitude:store().Home.selectedAddress.selectedPickUp.location.longitude
                 },
                 dropOff: {
                    address:store().Home.selectedAddress.selectedDropOff.address,
                     name:store().Home.selectedAddress.selectedDropOff.name,
                     latitude:store().Home.selectedAddress.selectedDropOff.location.latitude,
                     longitude:store().Home.selectedAddress.selectedDropOff.location.longitude 
                 },
                 fare:store().Home.fare,
                 status:"pending"
             }
         };
         request.post("http://192.168.2.101:3000/api/bookings")
         .send(payload)
         .finish((err,resu)=>{
            // console.error(err); 
             dispatch({
                 type:BOOK_CAR,
                 payload:resu.body
             });
         });
      };
  }

//==================================================
//Action Handlers
//==================================
function handleGetCurrentLocation(state, action){
   return update(state, {
       region:{
        latitude:{
            $set:action.payload.coords.latitude
        },
        longitude:{
            $set:action.payload.coords.longitude
        },
        latitudeDelta:{
            $set:LATITUDE_DELTA
        },
        longitudeDelta:{
            $set:LONGITUDE_DELTA
        }
       }
   })
}

function handleGetInputData(state, action){
    const {key,value } = action.payload;
    return update(state, {
        inputData:{
           [key]:{
               $set:value
           }
        }
    });
 }


 function handleToggleSearchResult(state, action){

     if (action.payload === "pickUp") {
         return update(state, {
             resultTypes: {
                 pickUp: {
                     $set: true,
                 },
                 dropOff: {
                     $set: false,
                 }
             },
            
            
         });
     }
     if (action.payload === "dropOff") {
        return update(state, {
            resultTypes: {
                pickUp: {
                    $set: false,
                },
                dropOff: {
                    $set: true,
                }
            },
          
            
        });
    }
   
 }

 function handleGetAddressPredictions(state,action){
   return update(state, {
      predictions:{
          $set:action.payload
      } 
   });
 }

 function handleGetSelectedAddress(state, action){
	let selectedTitle = state.resultTypes.pickUp ? "selectedPickUp" : "selectedDropOff"
	return update(state, {
		selectedAddress:{
			[selectedTitle]:{
				$set:action.payload
			}		
		},
		resultTypes:{
			pickUp:{
				$set:false
			},
			dropOff:{
				$set:false
			}
		}
	})
}

  function handleGetDistanceMatrix(state, action){
      return update(state,{
         distanceMatrix:{ 
             $set:action.payload
         }
      })
  }

  function handleGetFare(state, action){
      return update(state,{
          fare:{
              $set:action.payload
          }
      })
  }

  function handleBookCar(state, action){
    return update(state,{
        booking:{
            $set:action.payload
        }
    })
}
const ACTION_HANDLERS = {
    GET_CURRENT_LOCATION:handleGetCurrentLocation,
    GET_INPUT:handleGetInputData,
    TOGGLE_SEARCH_RESULTS:handleToggleSearchResult,
    GET_ADDRESS_PREDICTIONS:handleGetAddressPredictions,
    GET_SELECTED_ADDRESS:handleGetSelectedAddress,
    GET_DISTANCE_MATRIX:handleGetDistanceMatrix,
    GET_FARE: handleGetFare,
    BOOK_CAR:handleBookCar
}
const initialState = {
    region:{},
    inputData:{},
    resultTypes:{},
    selectedAddress:{}
    
};

export function HomeReducers(state=initialState, action){
    const handler = ACTION_HANDLERS[action.type];
    return handler?handler(state,action):state;
} 
