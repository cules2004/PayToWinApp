import React from "react";
import { Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

const GradientText = (props) => {
    return (
        <MaskedView maskElement={<Text style = {[props.style, {backgroundColor: 'transparent'}]}>{props.text}</Text>}>
            <LinearGradient
                start={props.start || {x:0, y:0}}
                end={props.end || {x:1, y:1}}
                colors={props.colors || ['#14E585','#9E01B7']}
            >
                <Text style={[props.style,{opacity:0},{backgroundColor:'transparent'}]}>{props.text}</Text> 
            </LinearGradient>
        </MaskedView>
    );
};

export default GradientText; 