import express from 'express';
import OrderModel from '../Modals/OrderModal';

const handler = new OrderModel()
export const orderRoutes = (app: express.Application) => {
    app.get('/user/:userID/orders', handler.Index)
    app.get('/user/:userID/orders/:orderID', handler.Show)
    app.patch('/user/:userID/orders/:orderID' , handler.Update)
    app.delete('/user/:userID/orders/:orderID' , handler.Delete)
    app.post('/user/:userID/orders', handler.Create)
    app.post('/users/:userID/orders/:orderID/products', handler.addProduct)
}

