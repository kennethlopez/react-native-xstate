import {AuthResponse} from "../../api/types";

export type FetchStates = {
    id: string,
    initial: 'idle' | 'loading' | 'success',
    states: {
        idle: {},
        loading: {},
        success: {}
    }
}

export type AuthEmailErrorStates = {
    id: string,
    initial: 'none' | 'notFound',
    states: {
        none: {},
        notFound: {},
        other: {},
    },
    on: {}
}

export type AuthPasswordErrorStates = {
    id: string,
    initial: 'none' | 'notMatch',
    states: {
        none: {},
        notMatch: {},
        empty: {}
    }
}

export type AuthEmail = {
    states: {
        fetch: FetchStates,
        error: AuthEmailErrorStates
    }
}

export type AuthPassword = {
    states: {
        fetch: FetchStates,
        error: AuthPasswordErrorStates
    }
}

export type SignInStateSchema = {
    states: {
        authEmail: AuthEmail,
        authPassword: AuthPassword
    }
}

export type SignInEvent<T = {}> = {
    type: 'SUBMIT' | 'AUTH_EMAIL';
    data: T;
}

export type SubmitEventData = {
    emailOrPhone?: string;
    password?: string;
}

export type SignInContext = {
    emailOrPhone: string;
    password: string;
    errorMessage: string;
    authResponse: AuthResponse | null;
}
