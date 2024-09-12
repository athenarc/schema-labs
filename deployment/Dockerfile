# Step 1: Build the React app
# Use an official Node.js runtime as the parent image
FROM node:20 as build

# Set the working directory inside the container
WORKDIR /schema-lab

# Copy package.json and package-lock.json
COPY schema-lab/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code to the container
COPY schema-lab/ .

ENV SCHEMA_LAB_ENV_PREFIX=REACT_APP_
ENV SCHEMA_LAB_ENV_PLACEHOLDER_OPENING_TEXT=<[!
ENV SCHEMA_LAB_ENV_PLACEHOLDER_CLOSING_TEXT=!]>
ENV REACT_APP_SCHEMA_LAB_PAGE_SIZE=${SCHEMA_LAB_ENV_PLACEHOLDER_OPENING_TEXT}${SCHEMA_LAB_ENV_PREFIX}SCHEMA_LAB_PAGE_SIZE${SCHEMA_LAB_ENV_PLACEHOLDER_CLOSING_TEXT}
ENV REACT_APP_SCHEMA_LAB_LOGIN_PROVIDERS=${SCHEMA_LAB_ENV_PLACEHOLDER_OPENING_TEXT}${SCHEMA_LAB_ENV_PREFIX}SCHEMA_LAB_LOGIN_PROVIDERS${SCHEMA_LAB_ENV_PLACEHOLDER_CLOSING_TEXT}
ENV REACT_APP_SCHEMA_API_URL=${SCHEMA_LAB_ENV_PLACEHOLDER_OPENING_TEXT}${SCHEMA_LAB_ENV_PREFIX}SCHEMA_API_URL${SCHEMA_LAB_ENV_PLACEHOLDER_CLOSING_TEXT}

# Build the React app for production
RUN npm run build

# Step 2: Serve the React app
# Use a lightweight web server to serve the build files
FROM nginx:alpine

COPY deployment/entrypoint.sh /

RUN chmod u+x /entrypoint.sh

# Copy the build files from the previous stage
COPY --from=build /schema-lab/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
