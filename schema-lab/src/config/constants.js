import ApiKeyLogin from "../auth/ApiKeyLogin";

export const SupportedLogginsMap = {
    'ApiKeyLogin': {
        id: 'api_key',
        loginProviderName: 'API Key login',
        LoginProvider: ApiKeyLogin
    }
}