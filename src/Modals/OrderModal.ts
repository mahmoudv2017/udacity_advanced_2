import myClient from '../database'
import express from 'express'

export type Order={
    id:number,
    user_id:number,
    status:string

}

export default class OrderModel{
  
    async Create(req:express.Request , res:express.Response) {
        console.log("asdasd")
        try { 
            const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *;'
            const client = await myClient.connect()
            const result = await client.query(sql, [req.params.userID, req.body.status])
      
            const orders = result.rows[0]
      
             client.release()
      
             res.status(200).json(orders)
        } catch (error) {
            throw new Error(error as string)
        }

      }

      async Index(req:express.Request , res:express.Response) {

        try {
            const sql = 'select * from orders where user_id=$1;'
            const client = await myClient.connect()
            const result = await client.query(sql , [req.params.userID])
      
            const orders = result.rows
      
             client.release()
      
             res.status(200).json(orders)
        } catch (error) {
            throw new Error(error as string)
        }

      }

      async Show(req:express.Request , res:express.Response){

        try {
            const sql = 'select * from orders where user_id=$1 and id=$2;'
            const client = await myClient.connect()
            const result = await client.query(sql , [ req.params.userID , req.params.orderID])
      
            const orders = result.rows
      
             client.release()
      
             res.status(200).json(orders)
        } catch (error) {
            throw new Error(error as string)
        }

      }

      async Update(req:express.Request , res:express.Response) {

        try {
            const sql = `UPDATE orders SET status = $1 WHERE user_id=$2 and id = $3;`
            const client = await myClient.connect()
            const result = await client.query(sql , [ req.body.status , req.params.userID , req.params.orderID])
      
            const orders = result.rows
      
             client.release()
      
            res.status(200).json(orders)
        } catch (error) {
            throw new Error(error as string)
        }

      }

      async Delete(req:express.Request , res:express.Response) {

        try {
            const sql = `delete from orders_products where order_id = $1;`
            const client = await myClient.connect()
            await client.query(sql , [req.params.orderID])
      

      
             client.release()
      
    
        } catch (error) {
            throw new Error(error as string)
        }

        try {
            const sql = `delete from orders where id = $1;`
            const client = await myClient.connect()
            await client.query(sql , [req.params.orderID])
      

      
             client.release()
      
            res.status(200).json({msg : "Order Deleted Successfully"})
        } catch (error) {
            res.status(500).json(error)
        }

      }

  async addProduct(req: express.Request, res: express.Response) {

    const Order_ID = Number(req.params.orderID)
    try {
        const sql = 'select * from orders where id=$1 and user_id=$2;'
        const client = await myClient.connect()
        const result = await client.query(sql , [Order_ID , req.params.userID])
  
        const orders = result.rows[0]

      
  
         client.release()
        if(!orders){
            res.status(301).json("Such Order Doesn't Exist")
            return
        }
       
    } catch (error) {
      
        res.status(301).json(error)
        return

    }
   

    try {
        const sql = 'INSERT INTO orders_products (quantity , product_id , order_id) VALUES($1,$2,$3) RETURNING *;'
        const client = await myClient.connect()
        const result = await client.query(sql , [req.body.quantity , req.body.product_id , Order_ID])
  
        const orders = result.rows
  
         client.release()
  
        res.status(200).json(orders)
        return

    } catch (error) {
        //console.log(error)
        res.status(301).json(error)
    }
  } 
      
}