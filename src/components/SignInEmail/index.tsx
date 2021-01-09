import React from "react";
import {StyleSheet, View} from "react-native";
import {AppStyle, Colors, Mixins} from "../../styles";
import {Button, Text, TextInput} from "react-native-paper";
import IndefiniteLoader from "../IndefiniteLoader";

type Props = {
    errorMessage?: string;
    onSubmit?: () => void;
    isLoading?: boolean;
    onEmailChange: (email: string) => void;
    value: string;
};

const SignInEmail: React.FC<Props> = ({value, onEmailChange, errorMessage = '', onSubmit, isLoading}) => {
    return (
        <View style={styles.container}>
            <TextInput
                label='Email or Phone Number'
                style={{backgroundColor: Colors.WHITE}}
                value={value}
                onChangeText={onEmailChange}
            />
            {errorMessage?.length > 0 && <Text style={AppStyle.errorMessage}>{errorMessage}</Text>}
            <Button
                mode='contained'
                style={styles.nextButton}
                labelStyle={AppStyle.buttonLabel}
                onPress={onSubmit}
            >
                Next
            </Button>
            {isLoading && <IndefiniteLoader />}
        </View>
    );
};

export default SignInEmail;

const styles = StyleSheet.create({
    container: {
        ...AppStyle.container,
        ...Mixins.padding(16, 24, 16, 24),
        justifyContent: "flex-start"
    },
    nextButton: {
        marginTop: 16,
        borderRadius: 32,
    }
});
