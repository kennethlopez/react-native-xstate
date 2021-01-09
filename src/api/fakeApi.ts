import {AuthResponse} from "./types";

// noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols
export const authEmail = (emailOrPhone: string): Promise<AuthResponse> => {
    return new Promise<AuthResponse>(resolve => {
        setTimeout(() => {
            const response: AuthResponse = {
                status: {
                    success: true,
                    code: 0
                },
                needCaptcha: false,
                expressLinkAvailable: false,
                brandId: '1210'
            };

            resolve(response);
        }, 1000);
    });
}

// noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols
export const failAuthEmail = (email: string): Promise<AuthResponse> => {
    return new Promise<AuthResponse>((_, reject) => {
        setTimeout(() => {
            const response: AuthResponse = {
                status: {
                    success: false,
                    code: 304,
                    message: 'Login username is not found'
                },
                needCaptcha: false,
                expressLinkAvailable: false,
            };

            reject(response);
        }, 1000);
    });
}

// noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols
export const signIn = (email: string, password: string): Promise<AuthResponse> => {
    return new Promise<AuthResponse>(resolve => {
        setTimeout(() => {
            const response: AuthResponse = {
                status: {
                    success: true,
                    code: 0
                },
                needCaptcha: false,
                expressLinkAvailable: false,
                brandId: '1210'
            };

            resolve(response);
        }, 1000);
    });
}

// noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols
export const failSignIn = (email: string, password: string): Promise<AuthResponse> => {
    return new Promise<AuthResponse>((_, reject) => {
       setTimeout(() => {
           const response: AuthResponse = {
               status: {
                   success: false,
                   code: 304,
                   message: 'Username and password do not match'
               },
               needCaptcha: false,
               expressLinkAvailable: false,
           };

           reject(response);
       }, 1000);
    });
}
