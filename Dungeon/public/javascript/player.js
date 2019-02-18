import Vector from "./protoCore/math/vector.js";

export const Direction = {
    NONE: 0,
    UP: 1,
    RIGHT: 2,
    DOWN: 3,
    LEFT: 4
};

/**
 * Player Class
 * @property { Object } socket
 * @property { String } id
 * @property { Vector } position
 * @property { Number } direction
 * @property { Array } map
 * @property { Array } connectedClients
 */
export default class Player {
    /**
     * Constructs a player object
     * @param { Object } socket
     * @param { Function } givenCallback
     */
    constructor(socket, givenCallback) {
        this.socket = socket;
        this.id = "";
        this.position = new Vector();
        this.direction = Direction.NONE;
        this.map = [];
        this.connectedClients = [];
        this.callback = givenCallback;
        this.sockets();
    }

    /**
     * Initilizes all sockets needed for a player
     */
    sockets() {
        //loads the player when game first loads
        this.socket.on("load", data => {
            this.player = data.player;
            this.map = data.map;
            this.connectedClients = data.connectedClients;
            this.callback();
        });

        //player disconnect
        this.socket.on("playerDisconnect", id => {
            this.removeClient(id);
        });

        //player connect
        this.socket.on("playerConnect", client => {
            this.addClient(client);
        });

        //parses any game updates
        this.socket.on("gameUpdate", data => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id !== this.id) {
                    let index = this.getIndexById(data[i].id);
                    this.connectedClients[index].direction = data[i].direction;
                    this.connectedClients[index].position = data[i].position;
                    this.connectedClients[index].health = data[i].health;
                    this.connectedClients[index].stamina = data[i].stamina;
                }
            }
        });

        //sends any game changes
        this.socket.on("sendGameUpdate", this.toObject());
    }

    /**
     * Returns a json object representation of the current player
     */
    toObject() {
        return {
            id: this.id,
            direction: this.direction,
            position: { x: this.position.x, y: this.position.y },
            health: this.health,
            stamina: this.stamina
        };
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
