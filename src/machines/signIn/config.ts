import {MachineConfig} from "xstate";
import {
    AuthPasswordErrorStates,
    FetchStates,
    SignInContext,
    AuthEmailErrorStates,
    SignInEvent,
    SignInStateSchema
} from "./types";

const authEmailFetchConfig: FetchStates = {
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
                onDone: 'success',
                onError: {
                    target: 'idle',
                    actions: 'setAuthResponse'
                }
            }
        },
        success: {
            always: {
                target: '#authPassword',
                actions: ['initAuthResponse', 'initErrorMessage']
            }
        }
    }
};

const authEmailErrorConfig: AuthEmailErrorStates = {
    id: 'authEmailError',
    initial: 'none',
    states: {
        none: {
            always: [
                {target: 'notFound', cond: 'emailNotFound'},
                {target: 'other', cond: 'authEmailFail'}
            ]
        },
        notFound: {
            entry: 'setErrorMessageEmailNotFound'
        },
        other: {
            entry: 'setErrorMessageAuthEmailFail'
        }
    },
    on: {
        SUBMIT: {
            target: '#authEmailError.none',
            actions: 'initAuthResponse'
        }
    }
};

const authPasswordFetchConfig: FetchStates = {
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
                onDone: 'success',
                onError: [
                    {
                        target: ['idle', '#authPasswordError.empty'],
                        cond: 'emptyPassword'
                    },
                    {
                        target: ['idle', '#authPasswordError.notMatch'],
                        cond: 'emailPasswordNotMatch2'
                    }
                ]
            }
        },
        success: {
            type: 'final'
        }
    }
};

const authPasswordErrorConfig: AuthPasswordErrorStates = {
    id: "authPasswordError",
    initial: 'none',
    states: {
        none: {
            entry: ['initAuthResponse', 'initErrorMessage']
        },
        notMatch: {
            entry: 'setErrorMessageEmailPasswordNotMatch'
        },
        empty: {
            entry: 'setErrorMessageEmptyPassword'
        }
    }
};

const config: MachineConfig<SignInContext, SignInStateSchema, SignInEvent> = {
    id: 'signIn',
    initial: 'authEmail',
    context: {
        emailOrPhone: '',
        password: '',
        errorMessage: '',
        authResponse: null
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
        }
    },
    on: {
        AUTH_EMAIL: {
            target: 'authEmail',
            actions: ['initAuthResponse', 'initErrorMessage']
        }
    }
}

export default config;

