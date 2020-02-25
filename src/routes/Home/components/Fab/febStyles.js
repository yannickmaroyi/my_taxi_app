const styles = {
   fabContainer:{
       borderColor: "#fff",
       borderWidth: 1,
       height:80,
       width:80,
       borderRadius:40,
       alignItems:"center",
       justifyContent:"center",
       position:"absolute",
       bottom:100,
       right:20,
       shadowColor: "#000",
       shadowOpasity: 0.8,
       shadowRadius:2,
       shadowOffset: {
           height:1,
           width:0
       }
   },
   disabledState:{
       backgroundColor:"#d7d7d7",
   },
   activeState:{
       backgroundColor:"#ff5e3a",
   },
   btnText:{
       fontSize:16,
       color:"#fff"
   },
   amount:{
       fontWeight:"bold",
       fontSize:12
   }
};

export default styles;