import { View, Text } from "react-native";

const Timer = ({ hidden }) => {
    const timer = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '5%',
        height: '10%',
    }

    const timerText = {
        fontSize: 70,
        fontWeight: '700',
        textAlign: 'center'
    }

    return (

        <View style={timer}>
            {!hidden && <Text style={timerText}>0:00:00</Text>}

        </View>
    )
}

export default Timer