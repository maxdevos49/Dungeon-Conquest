module.exports = {
    name: "Dungeon",
    owner: "Maxon ",
    Developers: ["Maxwell DeVos", "Mason Timmerman"],
    server: {
        production: process.env.PRODUCTION,
        port: process.env.PORT,
        domain: process.env.DOMAIN,
        transport: process.env.TRANSPORT
    },
    controllers: [
        {
            controller: "Home"
        },
        {
            controller: "Game",
            socket: true
        }
    ]
};
