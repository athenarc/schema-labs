import { SupportedLogginsMap } from "./constants";

const parseLoginProviders = supportedLoginsProvidersDescription => {
    if (!supportedLoginsProvidersDescription) return [];
    const loginProviderIdentifiers = supportedLoginsProvidersDescription.split(",").map(identifier=>identifier.trim());
    const loginProviders = loginProviderIdentifiers.map(identifier=>SupportedLogginsMap[identifier])
    const unknownLoginProvider = loginProviders.findIndex(loginProvider=>loginProvider==undefined);
    if (unknownLoginProvider==-1) return loginProviders;
    throw new Error(`Invalid configuration [LoginProviders]: Value "${loginProviderIdentifiers[unknownLoginProvider]}" is not a known login provider`)
};

const config = {
    auth: {
        loggin_providers: parseLoginProviders(process.env.REACT_APP_SCHEMA_LAB_LOGIN_PROVIDERS)
    },
    api: {
        url: process.env.REACT_APP_SCHEMA_API_URL
    },
    client: {
        preferences: {
            pageSize: Number.parseInt(process.env.REACT_APP_SCHEMA_LAB_PAGE_SIZE,10)
        }
    }
};

export default config;