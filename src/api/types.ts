export type AuthResponse = {
    status: {
        success: boolean,
        code: number,
        message?: string
    },
    needCaptcha: boolean,
    expressLinkAvailable: boolean,
    brandId?: string,
}
