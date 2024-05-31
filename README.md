# Deployment

## Deploy on a local environment
1. Clone repository to your environment
    ```
    git clone https://github.com/athenarc/schema-lab.git
    ```

2. Navigate inside the code directory
    ```
    cd schema-lab/schema-lab
    ```

3. Install external packages
    ```
    npm install
    ```

4. Conigure application by creating a .env file. You may use the provided .env.template file and change the values as needed.
    ```
    cp .env.template .env
    vim .env
    ```

5. When done, you may start the development server
    ```
    npm start
    ```