import express from 'express';
import OrderModel from '../Modals/OrderModal';
import {user_class} from '../Modals/UserModal'

const handler = new OrderModel()
const auth = new user_class()
export const orderRoutes = (app: express.Application) => {
    app.get('/user/:userID/orders' , auth.verifyAuthToken , async (req,res)=>{
        try {
            let result = await handler.Index( Number(req.params.userID ))
            res.status(200).json(result)
        } catch (error) {
            res.status(301).json(error)
        }
 
    })
    app.get('/user/:userID/orders/:orderID' , auth.verifyAuthToken, async (req,res) => {
        try {
            let result = await handler.Show( Number(req.params.userID ) ,  Number(req.params.orderID ))
            res.status(200).json(result)
        } catch (error) {
            res.status(301).json(error)
        }
    } )
    app.patch('/user/:userID/orders/:orderID' , auth.verifyAuthToken , async (req,res) => {
        try {
            let result = await handler.Update(req.body.status , Number(req.params.userID) , Number(req.params.orderID) )
            res.status(200).json(result)
        } catch (error) {
            res.status(301).json(error)
        }
    })
    app.delete('/user/:userID/orders/:orderID' , auth.verifyAuthToken , async (req,res) => {
        try {
            let result = await handler.Delete(Number(req.params.orderID))
            res.status(200).json(result)
        } catch (error) {
            res.status(301).json(error)
        }
    })
    app.post('/user/:userID/orders' , auth.verifyAuthToken, async (req,res) => {

        try {
            let result = await handler.Create( Number(req.params.userID ) , req.body.status)
            res.status(200).json(result)
        } catch (error) {
            res.status(301).json(error)
        }
 
    })
    app.post('/users/:userID/orders/:orderID/products', auth.verifyAuthToken, async (req,res) => {

        try {
            let result = await handler.addProduct( Number(req.params.orderID) , Number(req.params.userID),{quantity:req.body.quantity , product_id:req.body.status})
            res.status(200).json(result)
        } catch (error) {
            res.status(301).json(error)
        }
 
    })
}

