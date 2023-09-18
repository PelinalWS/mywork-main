const express = require("express");
const router = express.Router();
const qt = require("../db.js");
const Authenticator = require("../auth.js");

router.get("/", getText);
router.patch("/", updateText);
router.post("/refreshToken", Authenticator.authorize);

function getText(req, res){
    pool.query(`SELECT * FROM about WHERE id = 1;`(error, results => {
        if(error){
            error = new Error("Failed in getting about_us.")
            res.status(500).json({
                error: error.message
            });
        } else {
            res.status(200).json({
                about_us: results.rows[0]
            });
        }
    }));
}

function updateText(req, res){
    pool.query(`UPDATE about SET info WHERE id = 1`, (req, res) => {
        if(error){
            error = new Error("Error in setting new about");
            res.status(500).json({
                error: error.message
            });
        } else {
            res.status(200).json({
                message: "Successfully updated about"
            })
        }
    })
}

module.exports = router;