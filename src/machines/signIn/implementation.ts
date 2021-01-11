import {assign, MachineOptions} from "xstate";
import fakeApi from "../../api";
import {SignInContext, SignInEvent, SubmitEventData} from "./types";
import {AuthResponse} from "../../api/types";

const implementation: MachineOptions<SignInContext, any> = {
    actions: {
        setEmail: assign({
            emailOrPhone: (_, event: SignInEvent<SubmitEventData>) => event.data.emailOrPhone ? event.data.emailOrPhone : ''
        }),
        setPassword: assign({
            password: (_, event: SignInEvent<SubmitEventData>) => event.data.password ? event.data.password : ''
        }),
        initErrorMessage: assign({
            errorMessage: (_) => ''
        }),
        setErrorMessageEmailNotFound: assign({
            errorMessage: (_) => "Sorry, we don't recognize your email address."
        }),
        setErrorMessageAuthEmailFail: assign({
            errorMessage: (_) => 'Something went wrong!'
        }),
        setErrorMessageEmptyEmail: assign({
            errorMessage: (_) => 'Enter an email or phone number.'
        }),
        setErrorMessageEmptyPassword: assign({
            errorMessage: (_) => 'Enter a password.'
        }),
        setErrorMessageEmailPasswordNotMatch: assign({
            errorMessage: (_) => 'The email and password do not match. Please try again or reset your password.'
        }),
    },
    services: {
        authEmail: (context) => fakeApi.authEmail(context.emailOrPhone),
        signIn: (context) => fakeApi.signIn(context.emailOrPhone, context.password)
    },
    guards: {
        emptyEmail: (context) => context.emailOrPhone.length == 0,
        emailNotFound: (_, event: SignInEvent<AuthResponse>) => event.data.status.code === 304,
        emptyPassword: (context) => context.password.length == 0,
        emailPasswordNotMatch: (_, event: SignInEvent<AuthResponse>) => event.data.status.code === 304
    },
    activities: {},
    delays: {}
};

export default implementation;
