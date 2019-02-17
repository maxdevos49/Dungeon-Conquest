const express = require('express');
const router = express.Router();

/**
 * GET:/index
 */
router.get("/index", (req, res) => {
    res.render("Home/index");
});

/**
 * GET:/index
 */
router.get("/", (req, res) => {
    res.render("Home/index");
});

module.exports = router;