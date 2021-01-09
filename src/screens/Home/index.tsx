import React from "react";
import {View, StyleSheet} from "react-native";
import {AppStyle, Colors} from "../../styles";
import { useNavigation } from "@react-navigation/native";
import {Button} from "react-native-paper";

const HomeScreen: React.FC = () => {
    const navigation = useNavigation();

    return(
        <View style={AppStyle.container}>
            <View style={styles.buttonContainer}>
                <Button
                    mode='contained'
                    onPress={()=> navigation.navigate('SignIn')}
                    labelStyle={styles.buttonLabel}
                    color={Colors.WHITE}
                >
                    Sign in
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        marginLeft: 40,
        marginRight: 40
    },
    buttonLabel: {
        ...AppStyle.buttonLabel,
        color: Colors.PRIMARY
    }
})

export default HomeScreen;
