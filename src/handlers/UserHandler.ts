
import express from 'express';
import { user_class } from '../Modals/UserModal';

const userStore = new user_class()

export function UserRoutes(app:express.Application){
    app.post("/register" , async (req,res) => {
        const results = await userStore.register(req.body.firstname , req.body.lastname , req.body.password);

        res.status(200).json(results);
    })

    app.post("/login" , userStore.login)
}
