export type AuthEmailStates = {
    id: string,
    initial: 'idle' | 'loading',
    states: {
        idle: {},
        loading: {},
    }
}

export type AuthEmailErrorStates = {
    id: string,
    initial: 'none' | 'notFound' | 'other' | 'empty',
    states: {
        none: {},
        empty: {},
        notFound: {},
        other: {},
    }
}

export type AuthPasswordStates = {
    id: string,
    initial: 'idle' | 'loading',
    states: {
        idle: {},
        loading: {},
    }
}

export type AuthPasswordErrorStates = {
    id: string,
    initial: 'none' | 'notMatch',
    states: {
        none: {},
        empty: {},
        notMatch: {},
    }
}

export type AuthEmail = {
    states: {
        fetch: AuthEmailStates,
        error: AuthEmailErrorStates
    }
}

export type AuthPassword = {
    states: {
        fetch: AuthPasswordStates,
        error: AuthPasswordErrorStates
    }
}

export type SignInStateSchema = {
    states: {
        authEmail: AuthEmail,
        authPassword: AuthPassword,
        success: {}
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
}
