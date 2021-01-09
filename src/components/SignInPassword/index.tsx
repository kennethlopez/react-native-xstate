import React from "react";
import {StyleSheet, View} from "react-native";
import {AppStyle, Colors, Mixins} from "../../styles";
import {Button, Text, TextInput} from "react-native-paper";
import IndefiniteLoader from "../IndefiniteLoader";

type Props = {
    email: string;
    value: string;
    onPasswordChange: (password: string) => void;
    onBackPress: () => void;
    onNextPress: () => void;
    isLoading?: boolean;
    errorMessage?: string;
    passwordFieldErrorMessage?: string
}

const SignInPassword: React.FC<Props> = (
    {
        errorMessage = '',
        email,
        value,
        onPasswordChange,
        onBackPress,
        onNextPress,
        isLoading,
        passwordFieldErrorMessage = ''
    }) => {

    return (
        <View style={styles.container}>
            {errorMessage?.length > 0 && <Text style={AppStyle.errorMessage}>{errorMessage}</Text>}
            <Text style={styles.email}>{email}</Text>
            <TextInput
                label='Password'
                style={AppStyle.textInput}
                value={value}
                secureTextEntry={true}
                textContentType='password'
                onChangeText={onPasswordChange}
            />
            {passwordFieldErrorMessage?.length > 0 && <Text style={AppStyle.errorMessage}>{passwordFieldErrorMessage}</Text>}
            <View style={styles.buttonsContainer}>
                <Button
                    style={{...styles.button, ...styles.buttonBack}}
                    labelStyle={AppStyle.buttonLabel}
                    onPress={onBackPress}
                >
                    Back
                </Button>
                <Button
                    mode='contained'
                    style={styles.button}
                    labelStyle={AppStyle.buttonLabel}
                    onPress={onNextPress}
                >
                    Next
                </Button>
            </View>
            {isLoading && <IndefiniteLoader />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...AppStyle.container,
        ...Mixins.padding(16, 24, 16, 24),
        justifyContent: "flex-start",
    },
    email: {
        alignSelf: "center"
    },
    buttonsContainer: {
        flexDirection: "row"
    },
    button: {
        marginTop: 16,
        borderRadius: 32,
        width: '48%'
    },
    buttonBack: {
        borderColor: Colors.PRIMARY,
        borderWidth: 1,
        marginRight: '2%'
    },
});

export default SignInPassword;
