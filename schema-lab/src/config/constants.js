import ApiKeyLogin from "../auth/ApiKeyLogin";

export const SupportedLoginsMap = {
    'ApiKeyLogin': {
        id: 'api_key',
        loginProviderName: 'API Key login',
        LoginProvider: ApiKeyLogin
    }
}