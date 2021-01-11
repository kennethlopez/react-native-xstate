import {MachineConfig} from "xstate";
import {
    AuthPasswordErrorStates,
    AuthEmailStates,
    SignInContext,
    AuthEmailErrorStates,
    SignInEvent,
    SignInStateSchema,
    AuthPasswordStates
} from "./types";

const authEmailFetchConfig: AuthEmailStates = {
    id: 'authEmailFetch',
    initial: 'idle',
    states: {
        idle: {
            on: {
                SUBMIT: {
                    target: 'loading',
                    actions: 'setEmail'
                }
            }
        },
        loading: {
            invoke: {
                src: 'authEmail',
                onDone: '#authPassword',
                onError: [
                    {
                        target: ['idle', '#authEmailError.empty'],
                        cond: 'emptyEmail'
                    },
                    {
                        target: ['idle', '#authEmailError.notFound'],
                        cond: 'emailNotFound'
                    },
                    {
                        target: ['idle', '#authEmailError.other']
                    }
                ]
            }
        }
    }
};

const authEmailErrorConfig: AuthEmailErrorStates = {
    id: 'authEmailError',
    initial: 'none',
    states: {
        none: {
            entry: 'initErrorMessage'
        },
        empty: {
            entry: 'setErrorMessageEmptyEmail'
        },
        notFound: {
            entry: 'setErrorMessageEmailNotFound'
        },
        other: {
            entry: 'setErrorMessageAuthEmailFail'
        },
    }
};

const authPasswordFetchConfig: AuthPasswordStates = {
    id: "authPasswordFetch",
    initial: 'idle',
    states: {
        idle: {
            on: {
                SUBMIT: {
                    target: 'loading',
                    actions: 'setPassword'
                }
            }
        },
        loading: {
            invoke: {
                src: 'signIn',
                onDone: '#signInSuccess',
                onError: [
                    {
                        target: ['idle', '#authPasswordError.empty'],
                        cond: 'emptyPassword'
                    },
                    {
                        target: ['idle', '#authPasswordError.notMatch'],
                        cond: 'emailPasswordNotMatch'
                    }
                ]
            }
        }
    }
};

const authPasswordErrorConfig: AuthPasswordErrorStates = {
    id: "authPasswordError",
    initial: 'none',
    states: {
        none: {
            entry: 'initErrorMessage'
        },
        empty: {
            entry: 'setErrorMessageEmptyPassword'
        },
        notMatch: {
            entry: 'setErrorMessageEmailPasswordNotMatch'
        },
    }
};

const config: MachineConfig<SignInContext, SignInStateSchema, SignInEvent> = {
    id: 'signIn',
    initial: 'authEmail',
    context: {
        emailOrPhone: '',
        password: '',
        errorMessage: ''
    },
    states: {
        authEmail: {
            id: 'authEmail',
            type: 'parallel',
            states: {
                fetch: authEmailFetchConfig,
                error: authEmailErrorConfig,
            }
        },
        authPassword: {
            id: 'authPassword',
            type: 'parallel',
            states: {
                fetch: authPasswordFetchConfig,
                error: authPasswordErrorConfig,
            }
        },
        success: {
            id: 'signInSuccess',
            type: 'final'
        }
    },
    on: {
        AUTH_EMAIL: 'authEmail'
    }
}

export default config;

