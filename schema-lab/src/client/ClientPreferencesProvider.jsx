import React, { createContext, useState, useContext } from "react";
import { initializeClientPreferences, persistClientPreferences } from "./preferences";

const ClientPreferencesContext = createContext();

export const useClientPreferences = () => {
    const { clientPreferences, setClientPreferences } = useContext(ClientPreferencesContext)
    return {
        clientPreferences,
        setClientPreferences: clientPreferences => {
            persistClientPreferences(clientPreferences);
            setClientPreferences(clientPreferences);
        }
    }
};

const ClientPreferencesProvider = ({ children }) => {
    const [clientPreferences, setClientPreferences] = useState(initializeClientPreferences);
    return <ClientPreferencesContext.Provider value={{ clientPreferences, setClientPreferences }}>
        {children}
    </ClientPreferencesContext.Provider>
}

export default ClientPreferencesProvider;