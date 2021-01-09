import React, {useState} from "react";
import SignInEmail from "../../components/SignInEmail";
import {useMachine} from "@xstate/react";
import signInMachine from "../../machines/signIn";
import {SubmitEventData} from "../../machines/signIn/types";
import {Appbar} from "react-native-paper";
import {AppStyle} from "../../styles";
import { useNavigation } from "@react-navigation/native";
import SignInPassword from "../../components/SignInPassword";

const  SignInScreen = () => {
    const [signInState, send] = useMachine(signInMachine);
    const [text, setText] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const submitEmail = () => {
        const data: SubmitEventData = {
            emailOrPhone: text,
        }

        send({
            type: 'SUBMIT',
            data: data
        });
    }

    const submitPassword = () => {
        const data: SubmitEventData = {
            password: password
        }

        send({
            type: 'SUBMIT',
            data: data
        });
    }

    const sendAuthEmailEvent = () => {
        send('AUTH_EMAIL');
        setPassword('');
    }

    const authEmailLoading = signInState.matches({
        authEmail: {
            fetch: 'loading'
        }
    });

    const authPasswordLoading = signInState.matches({
        authPassword: {
            fetch: 'loading'
        }
    });

    const passWordEmpty = signInState.matches({
        authPassword: {
            error: 'empty'
        }
    });

    console.log("state: ", signInState.value);
    console.log("context: ", signInState.context);

    const content = signInState.matches('authEmail') ?
        (
            <SignInEmail
                value={text}
                onEmailChange={setText}
                errorMessage={signInState.context.errorMessage}
                onSubmit={submitEmail}
                isLoading={authEmailLoading}
            />
        ) :
        (
            <SignInPassword
                email={signInState.context.emailOrPhone}
                value={password}
                onPasswordChange={setPassword}
                isLoading={authPasswordLoading}
                errorMessage={!passWordEmpty ? signInState.context.errorMessage : ''}
                passwordFieldErrorMessage={passWordEmpty ? signInState.context.errorMessage : ''}
                onBackPress={sendAuthEmailEvent}
                onNextPress={submitPassword}
            />
        );

    return (
        <>
            <Appbar style={AppStyle.appBar}>
                <Appbar.Action icon='close' onPress={() => navigation.goBack()} />
                <Appbar.Content title='Sign in' />
            </Appbar>
            {content}
        </>
    );
}

export default SignInScreen;
