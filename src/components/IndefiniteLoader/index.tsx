import React from "react";
import {StyleSheet, View} from "react-native";
import {AppStyle, Colors} from "../../styles";
import {ActivityIndicator, Text} from "react-native-paper";

type Props = {
    text?: string;
}

const IndefiniteLoader: React.FC<Props> = ({text}) => {
    return (
        <View style={AppStyle.container}>
            <View style={styles.loaderContainer}>
                <ActivityIndicator animating={true} color={Colors.WHITE} />
                <Text style={styles.text}>{text || 'Please wait'}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    loaderContainer: {
        opacity: 0.7,
        backgroundColor: 'black',
        alignSelf: 'center',
        padding: 8,
        borderRadius: 10,
        width: 100
    },
    text: {
        textAlign: 'center',
        color: Colors.WHITE
    }
});

export default IndefiniteLoader;
