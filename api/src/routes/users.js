const { Router } = require("express");
const router = Router();
import passport from "passport";

//controladores
const { createUser, getUsers, getOneUser, deleteUser, updateUser } = require('../controllers/users.controller');

// login
router.post("/login", passport.authenticate('local'), function (req, res) {
    res.json(req.user);
});


// /api/users/
router.post("/", createUser);
router.get("/", getUsers);

// /api/users/:id
router.get("/:id", getOneUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);


module.exports = router;