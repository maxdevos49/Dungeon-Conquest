//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\\
//                Dungeon Conquest                \\
//     Author: Maxwell DeVos, Mason Timmerman     \\
//           Started: February 16, 2019           \\
//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\\

const express = require("express");
const app = express();
const http = require("http");
const ip = require("ip");
const server = http.createServer(app);
const io = require("socket.io")(server);

//Load env variables if not production
if (!process.env.PRODUCTION)
    require('dotenv').config();

//configiration
const config = require("./config.js");
const routes = require("./setup.js");


//view engine
app.set("view engine", "vash");
app.set("views", __dirname + "/views");

//set public folder
app.use(express.static(__dirname + '/public'));

//set the routes for the server to use
app.use("/", routes(io));


//start the server
server.listen(config.server.port, function () {
    console.log(`Dungeon running at ${ip.address()}:${config.server.port}`);
});

// Catch Errors
server.on('error', function (e) {
    if (e.code === 'EADDRINUSE') {
        console.error('Current port address is in use. Try closing any other servers that could be using the same port as :' + config.server.port);
    }
});
