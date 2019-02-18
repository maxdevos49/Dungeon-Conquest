import Vector from "./protoCore/math/vector.js";

export default class Player {
    constructor(socket, givenCallback) {
        this.socket = socket;
        this.id = "";
        this.player = new Vector();
        this.map = [];
        this.connectedClients = [];
        this.callback = givenCallback;
        this.sockets();
    }

    sockets() {
        this.socket.on("load", data => {
            this.player = data.player;
            this.map = data.map;
            this.connectedClients = data.connectedClients;
            console.log("Test ");
            this.callback();
        });

        this.socket.on("playerDisconnect", id => {
            this.removeClient(id);
        });

        this.socket.on("playerConnect", client => {
            this.addClient(client);
        });
    }

    /**
     * Adds a connection to the array
     * @param { Object } client
     */
    addClient(client) {
        this.connectedClients.push(client);
        console.log("Connected Users: " + this.connectedClients.length);
    }

    /**
     * Removes a connection by its array index
     * @param { Number } index
     */
    removeClient(id) {
        this.connectedClients.splice(this.getIndexById(id), 1);
        console.log("Connected Users: " + this.connectedClients.length);
    }

    /**
     * This methods returns the index of a client
     * @param { String } id
     * @returns { Number }
     */
    getIndexById(id) {
        for (let i = 0; i < this.connectedClients.length; i++) {
            if (this.connectedClients[i].id === id) {
                return i;
            }
        }
        return;
    }
}
