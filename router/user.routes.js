import express from "express";
import userService from "../services/userService.js";

const userRouter = express.Router();


userRouter.get('/', (req, res, next) => {
    try {
        const users = userService.getAllUsers();
        res.json(users);

    } catch (err) {
        next(err)
    }
})

userRouter.get('/:id', (req, res, next) => {
    try {
        const user = userService.getUserById(req.params.id);
        res.json(user);

    } catch (err) {
        console.log(err,'err')
        next(err)
    }
})

userRouter.post('/', (req, res, next) => {
    try {
        const newUser = userService.addUser(req.body.name);
        res.status(201).json(newUser);
    } catch (err) {
        next(err);
    }
})

userRouter.patch('/:id', (req, res, next) => {
    try {
        const updateUser = userService.updateUser(req.params.id, req.body.name);
        res.json(updateUser);
    } catch (err) {
        next(err);
    }
})

userRouter.delete('/:id', (req, res, next) => {
    try {
        userService.deleteUser(req.params.id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
})

export default userRouter;