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
    let m = new Map(100, 100);

    /**
     * Socket Connections
     */
    io.on("connection", function(socket) {
        //new client
        let client = new Client(socket, m.spawn.x, m.spawn.y);
        c.addConnection(client);
        //Send the map for the current user
        socket.emit("load", {
            player: client.toObject(),
            map: m.map,
            connectedClients: c.clientArray()
        });

        //Let everyone else know someone joined
        io.emit("playerConnect", client.toObject());

        /**
         * Handle Disconnects
         */
        socket.on("disconnect", function() {
            c.removeConnection(c.getIndexById(socket.id));
            io.emit("playerDisconnect", socket.id);
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
     * Generates an array of connected objects with only nessary info to send to the clients
     */
    clientArray() {
        let result = [];
        for (let i = 0; i < this.clients.length; i++) {
            result.push(this.clients[i].toObject());
        }
        return result;
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
    /**
     *
     * @param { Object } socket
     * @param { Number } givenX
     * @param { Number } givenY
     */
    constructor(socket, givenX = 10, givenY = 10) {
        this.id = socket.id;
        this.position = { x: givenX, y: givenY };
        this.health = 100;
        this.stamina = 100;
    }

    /**
     * Converts the class instance to a json object for it to be sent to clients
     */
    toObject() {
        return {
            id: this.id,
            position: { x: this.position.x, y: this.position.y },
            health: this.health,
            stamina: this.stamina
        };
    }
}

/**
 * Map Class to generate a dungeon
 * @property { Object } spawn
 * @property { Array } map
 * @property { Number } width
 * @property { Number } height
 */
class Map {
    /**
     * Constructs a map class with a given width and height in tiles
     * @param { Number } width
     * @param { Number } height
     */
    constructor(width, height) {
        this.spawn = { x: 10, y: 10 };
        this.map = [];
        this.width = width;
        this.height = height;
        this.generate(this.width, this.height, 10);
    }

    /**
     * Generates a random map based on a given width, height, and maximum tile value
     * @param { Number } width
     * @param { Number } height
     * @param { Number } max
     */
    generate(width, height, max) {
        for (let i = 0; i < height; i++) {
            this.map[i] = Array(width)
                .fill()
                .map(() => Math.round(Math.random() * max));
        }
    }
}
