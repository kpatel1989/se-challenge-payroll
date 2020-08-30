In order to run the project follow the steps below:

1. Set up Database
    cd ./db
    npm i
    npm run clean
    npm run build
    npm run start

  This will start a local postgres database.

2. Set up server
    cd ./server
    npm i -g sequelize
    npm i -g webpack
    npm i -g webpack-dev-server
    npm run build
    npm start

3. Set up client
    cd ./ui
    npm i
    npm start

