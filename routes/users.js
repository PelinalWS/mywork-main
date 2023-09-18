const express = require("express");
const router = express.Router();
const Authenticator = require("../auth.js");
const quser = require("./qcommand/user.js");

router.get("/listAdmin", Authenticator.admin, quser.listUsersA);

router.get("/list", Authenticator.authorize, quser.listUsers);

router.get("/:userId", Authenticator.admin, quser.listUserA);

router.get("/:userId", Authenticator.authorize, quser.listUser);

//gets all the data for the user except for the uid and calls the addUser function to add the user.
router.post("/signUp", quser.signup);

router.post("/logIn", quser.login);

router.patch("/changeInfo/", Authenticator.authorize, quser.change);

router.patch("/update", Authenticator.admin, quser.authenticate);

//deletes an user by calling deleteUser function
router.delete("/removeUser", Authenticator.admin, quser.deleteUser);

module.exports = router;