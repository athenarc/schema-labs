escape_for_sed_replacement_value() {
    value=$1
    echo $value | sed 's/[\/&\\]/\\&/g'
}

# Inject environment variables to environment placeholders
find /usr/share/nginx/html/static -type f -exec sed -i "s/<\[!REACT_APP_SCHEMA_LAB_PAGE_SIZE!\]>/$(escape_for_sed_replacement_value $SCHEMA_LAB_PAGE_SIZE)/g" {} +
find /usr/share/nginx/html/static -type f -exec sed -i "s/<\[!REACT_APP_SCHEMA_LAB_LOGIN_PROVIDERS!\]>/$(escape_for_sed_replacement_value $SCHEMA_LAB_LOGIN_PROVIDERS)/g" {} +
find /usr/share/nginx/html/static -type f -exec sed -i "s/<\[!REACT_APP_SCHEMA_API_URL!\]>/$(escape_for_sed_replacement_value $SCHEMA_LAB_SCHEMA_API_URL)/g" {} +

nginx -g "daemon off;"