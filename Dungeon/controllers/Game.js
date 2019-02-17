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

    /**
     * Socket Connections
     */
    io.on("connection", function(socket) {
        console.log("New Connection");
    });

    return router;
};

class connections {
    constructor() {}

    addConnection() {}

    removeConnection() {}
}

class client {
    constructor(socket, ) {}

    broadcastChannel() {}
}
