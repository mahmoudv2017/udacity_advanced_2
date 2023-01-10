import myClient from '../database'
import express from 'express'

export type Product={
    id:number,
    name:string,
    price:string,
    category:string
}

export default class ProductModal{
  
    async index ():Promise<Product[]> {

        try {
            const Client =  await myClient.connect()
            let sql = `select * from products;`
      
            let results = await Client.query(sql);
      
            Client.release();
            return results.rows;
        } catch (error) {
            throw new Error(error as string)
        }
      
    }

    async show (id:number):Promise<Product[]> {

        try {
            const Client =  await myClient.connect()
            let sql = `select * from products where id=$1;`
      
            let results = await Client.query(sql ,[id]);
      
            Client.release();
            return results.rows;
        } catch (error) {
            throw new Error(error as string)
        }
      
    }

    async UpdateProduct (price:number , id:number):Promise<Boolean> {

        try {
            const Client =  await myClient.connect()
            let sql = `UPDATE products SET price = $1 WHERE id = $2;`
      
            await Client.query(sql ,[price , id]);
      
            Client.release();
            return true;
        } catch (error) {
            throw new Error(error as string)
        }
      
    }

    async DeleteProduct (id:number):Promise<Boolean> {

        try {
            const Client =  await myClient.connect()
            let sql = `DELETE from products WHERE id = $1;`
      
            await Client.query(sql ,[id]);
      
            Client.release();
            return true;
        } catch (error) {
            throw new Error(error as string)
        }
      
    }

   async CreateProduct(req:express.Request , res:express.Response) {
    try {
        const Client =  await myClient.connect()
        let sql = `INSERT INTO products(name,price,category) values($1 , $2 , $3) Returning *;`
  
        let results = await Client.query(sql ,[req.body.name , req.body.price , req.body.category]);
  
        Client.release();
        res.status(200).json(results.rows)
    } catch (error) {
        throw new Error(error as string)
    }
   }
}