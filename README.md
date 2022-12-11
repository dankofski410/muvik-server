# muvik-server
 Node backend for Muvik
 
 Requires node and npm to be installed. Run the command npm install to install all the node modules.
 
 Run node index.js in the root directory to run the app. It should run in port 8080.
 
 The database credentials in the config/db-config.js file need to be set to the credentials you will use locally. This will allow the scripts to create the database tables when the app starts. You will then be able to execute the SQL insert queries in all the sql scripts in the db/ directory.
 
 Many of the endpoints are not finished, but the PoC should be enough to see how it would work in a live environment.
 
 There are currently three role types, but it is expandable to include additional roles as needed.
