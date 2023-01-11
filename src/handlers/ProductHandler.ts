import ProductModal , {Product} from '../Modals/ProductModal'
import express from 'express';
import {user_class} from '../Modals/UserModal'


let handler= new ProductModal()
let auth = new user_class()

export default function ProductsRoutes(app:express.Application){
    app.get("/products", async (req,res)=>{
        handler.index()
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
    });

    app.get("/products/:id" ,async (req,res)=>{
        handler.show(Number(req.params.id) )
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
    });

    app.patch("/products/:id" ,async (req,res)=>{

        handler.UpdateProduct( Number(req.body.price) ,Number(req.params.id))
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
    });

    app.post("/products" , auth.verifyAuthToken ,(req,res) => {
 
        handler.CreateProduct(req.body)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
    });

    app.delete("/products/:id" ,async (req,res)=>{

        handler.DeleteProduct(Number(req.params.id))
        .then(response => res.status(200).json(response))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)})
    });
}