import User from "../models/users";
import passport from "passport"

export async function getUsers(req, res, next) {
    try {
        let Users = await User.findAll();
        res.json({
            data: Users
        })
    } catch (error) {
        next(error)
    }
};

export async function createUser(req, res, next) {
    const { name, email, password } = req.body
    console.log(name, email, password);
    try {
        let newUser = await User.create({
            name,
            email,
            password
        }, {
            fields: ['name', 'email', 'password']
        });
        if (newUser) {
            return res.json({
                message: "User Created",
                data: newUser
            })
        }
    } catch (error) {
        next(error)
    }
};

export async function getOneUser(req, res, next) {
    const { id } = req.params;
    console.log(id);
    try {
        let user = await User.findOne({
            where: {
                id
            }
        })
        res.json({
            data: user
        })
    } catch (error) {
        next(error)
    }
};

export async function deleteUser(req, res, next) {
    const { id } = req.params;
    console.log(id);
    try {
        let deleted = await User.destroy({
            where: {
                id
            }
        })
        res.json({
            message: `se ha eliminado ${deleted} usuario`
        })
    } catch (error) {
        next(error)
    }
};

export async function updateUser(req, res, next) {
    let { id } = req.params;
    let { name, email, password } = req.body
    try {
        let user = await User.findOne({
            where: {
                id
            }
        }).then(async u => {
            await u.update({
                name,
                email,
                password
            })
        })
        return res.json({
            message: "Usuario actualizado",
            data: user
        })
    } catch (error) {
        next(error)
    }
};
