const express = require("express");
const router = express.Router();

module.exports = function(io) {
    /**
     * GET:/index
     */
    router.get("/index", (req, res) => {
        res.render("Game/index");
    });

    /**
     * GET:/index
     */
    router.get("/", (req, res) => {
        res.render("Game/index");
    });

    let c = new Connections();

    /**
     * Socket Connections
     */
    io.on("connection", function(socket) {

        c.addConnection(new Client(socket));

        socket.on("disconnect", function() {
            c.removeConnection(c.getIndexById(socket.id));
        });

        
    });

    return router;
};



/**
 * Connections Class
 * @property { Array } clients array of connected clients
 * @property { Number } num number of connected clients
 */
class Connections {
    /**
     * Constructs a Connections class to contain all connected users to the server
     */
    constructor() {
        this.clients = [];
        this.num = 0;
    }

    /**
     * Adds a connection to the clients array
     * @param { Object } client
     */
    addConnection(client) {
        this.clients.push(client);
        this.num = this.clients.length;
        this.connectionStatus();
    }

    /**
     * Removes a connection by its array index
     * @param { Number } index
     */
    removeConnection(index) {
        this.clients.splice(index, 1);
        this.num = this.clients.length;
        this.connectionStatus();
    }

    /**
     * This methods returns the index of a client
     * @param { String } id
     * @returns { Number }
     */
    getIndexById(id) {
        for (let i = 0; i < this.num; i++) {
            if (this.clients[i].id === id) {
                return i;
            }
        }
        return;
    }

    /**
     * Displays the current server status including connected users
     * @returns { Void }
     */
    connectionStatus() {
        console.log("Connected Users: " + this.num);
    }
}

/**
 * Client Class to represent a single connected user
 * @property { String } id represents the socket id
 * @property { Object } data contains the game data for the client
 */
class Client {
    constructor(socket) {
        this.id = socket.id;
        this.data = null;
    }
}
