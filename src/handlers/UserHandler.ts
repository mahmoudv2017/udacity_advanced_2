
import express from 'express';
import { user_class } from '../Modals/UserModal';

const userStore = new user_class()

export function UserRoutes(app:express.Application){
    app.post("/register" , async (req,res) => {
        const results = await userStore.register(req.body.firstname , req.body.lastname , req.body.password);

        res.status(200).json(results);
    })

    app.post("/login" , async (req,res) => {
        try {
            const result = await userStore.login(req.body)
            res.status(200).json(result)
        } catch (error) {
            res.status(301).json(error)
        }
    })

    app.get("/users" , userStore.verifyAuthToken , async (req,res) => {
      
        try {
            const result = await userStore.GetAllUsers()
            res.status(200).json(result)
        } catch (error) {
            res.status(301).json(error)
        }

  
    })
    app.get("/users/:id" , userStore.verifyAuthToken ,async (req,res) => {
        try {
            const result = await userStore.GetUser( Number(req.params.id) )
            res.status(200).json(result)
        } catch (error) {
            res.status(301).json(error)
        }


  
    })
}
