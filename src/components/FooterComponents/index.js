import React from "react";
import {Text} from "react-native"; 
import { Footer, FooterTab, Button} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./FooterComponentStyles";


export const FooterComponent = ()=>{
    const tabs = [{
        title: "TaxiCar",
        subTitle: "",
        icon: "car"
    },
    {
        title: "TaxiShare",
        subTitle: "",
        icon: "car"
    },
    {
        title: "TaxiPremium",
        subTitle: "",
        icon: "car"
    },
    {
        title: "TaxiBike",
        subTitle: "",
        icon: "car"
    }
    ]
    return(
        <Footer>
            <FooterTab style={styles.footerContainer}>
                {
                    tabs.map((obj, index) => {
                        return (
                            <Button transparent key={index}>
                                <Icon name={obj.icon} size={20} color={(index == 0) ? "#ff5e3a" : "grey" } />
                                <Text style={{ fontSize: 12, color: (index == 0) ? "#ff5e3a" : "grey" }}>{obj.title}</Text>
                                <Text style={styles.subText}>{obj.subTitle}</Text>
                            </Button>
                        )
                    }

                    )
                }
            </FooterTab>
        </Footer>
        
    );
}

export default FooterComponent;