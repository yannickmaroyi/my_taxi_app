import React from "react";
import { Header, Left, Body, Right, Button,Text} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./HeaderComponentsStyles";


export const HeaderComponents = ()=>{
    return(
        <Header style={{backgroundColor:"#ff5e3a"}}>
           <Left >
               <Button transparent>
                   <Icon name="bars" style={styles.icon} />
               </Button>
           </Left>
            <Body>
                <Text style={styles.HeaderText}>Taxi<Icon  size={20} name="play" /></Text>
            </Body>

           <Right >
               <Button transparent>
                   <Icon name="gift" style={styles.icon} />
               </Button>
           </Right>
        </Header>
    );
}

export default HeaderComponents;