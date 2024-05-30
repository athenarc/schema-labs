import { merge } from "lodash";
import config from "../config";
import Cookie from "js-cookie";


export const initializeClientPreferences = () => {
    const defaultClientPreferences = config.client.preferences;
    const cookieClientPreferences = JSON.parse(Cookie.get("SCHEMA_LABS_CLIENT_PREFERENCES") || "{}");
    return merge(
        defaultClientPreferences,
        cookieClientPreferences
    );
}

export const persistClientPreferences = clientPreferences => {
    Cookie.set("SCHEMA_LABS_CLIENT_PREFERENCES", JSON.stringify(clientPreferences), {sameSite: "Lax", expires: 365})
}