# smartport-node

git clone https://github.com/volteoind/smartport-node.git "<target-folder>"  

cd "<target-folder>"

npm install  (Will install all necessary modules)

## Start MongoDB 
$>mongod (will start mongoDB Server)

$>mongo (open new tab in terminal and run this command, connect to server as thin client/ confirm that server is running without any errors)

$>db.port.save ({misc:admin-db.json}) (copy .json from misc/admin-db.json to save function, where it will create new record in database in the name of admin and password as admin)

## Run server

node server.js (will run node server)

open your favourite browser with url http://localhost:8080/ 

login :  admin/admin
