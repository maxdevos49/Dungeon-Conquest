const express = require("express");
const router = express.Router();

//config settings
const config = require("./config.js");

module.exports = function(io) {
    //Controllers
    for (let i = 0; i < config.controllers.length; i++) {

        if(config.controllers[i].socket){
            router.use("/" + config.controllers[i].controller, require("./controllers/" + config.controllers[i].controller + ".js")(io));
        }else{
            router.use("/" + config.controllers[i].controller, require("./controllers/" + config.controllers[i].controller + ".js"));
        }
        
    }

    //redirect to a known route for the home controller
    router.get("/", (req, res) => {
        res.redirect("/Home/");
    });

    //respond with a 404 request if the document was not found
    router.use((req, res) => {
        res.status(404);
        res.render("shared/404");
    });

    return router;
};
