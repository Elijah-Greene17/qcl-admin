import { View, Text, Image, Pressable } from "react-native";
import Button from "../components/Button";

import Timer from "../components/Timer";
import MainView from "../components/MainView";
import Spacer from "../components/Spacer";
import { useEffect } from "react";

const A1StartPage = ({ navigation }) => {
    const backgroundStyle = {
        backgroundColor: "#FFD2D2",
        height: "100%",
        width: "100%",
    };

    return (
        // Header: 25%; Timer: 15%, Button: 20%
        <MainView style={backgroundStyle}>
            <Spacer height={'55%'} />
            <Button title={'Start Quest'} onClick={() => { navigation.replace('A2') }} />
        </MainView>
    );
}

export default A1StartPage