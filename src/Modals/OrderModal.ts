import myClient from '../database'
import express from 'express'

export type Order={
    id:number,
    user_id:number,
    status:string

}

export default class OrderModel{
  
    async Create(userID:number , status:string):Promise<Order[]> {
        
        try { 
            const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *;'
            const client = await myClient.connect()
            const result = await client.query(sql, [userID, status])
      
            const orders = result.rows
      
             client.release()
      
            return (orders)
        } catch (error) {
            throw new Error(error as string)
        }

      }

      async Index(userID:number):Promise<Order[]> {

        try {
            const sql = 'select * from orders where user_id=$1;'
            const client = await myClient.connect()
            const result = await client.query(sql , [userID])
      
            const orders = result.rows
      
             client.release()
      
             return orders
        } catch (error) {
            throw new Error(error as string)
        }

      }

      async Show(userID:number , orderID:number):Promise<Order[]>{

        try {
            const sql = 'select * from orders where user_id=$1 and id=$2;'
            const client = await myClient.connect()
            const result = await client.query(sql , [ userID , orderID])
      
            const orders = result.rows
      
             client.release()
      
            return orders
        } catch (error) {
            throw new Error(error as string)
        }

      }

      async Update(status:string , userID:number , orderID:number) {

        try {
            const sql = `UPDATE orders SET status = $1 WHERE user_id=$2 and id = $3 RETURNING *;`
            const client = await myClient.connect()
            const result = await client.query(sql , [ status , userID , orderID])
      
            const orders = result.rows
      
             client.release()
      
            return orders
        } catch (error) {
            throw new Error(error as string)
        }

      }

      async Delete(orderID:number) {

        try {
            const sql = `delete from orders_products where order_id = $1;`
            const client = await myClient.connect()
            await client.query(sql , [orderID])
      

      
             client.release()
      
    
        } catch (error) {
            throw new Error(error as string)
        }

        try {
            const sql = `delete from orders where id = $1;`
            const client = await myClient.connect()
            await client.query(sql , [orderID])
      

      
             client.release()
      
           return {msg : "Order Deleted Successfully"}
        } catch (error) {
            throw new Error(error as string)
        }

      }

  async addProduct(order_ID:number, userID:number , payload:{quantity:number , product_id:number}) {

  
    try {
        const sql = 'select * from orders where id=$1 and user_id=$2;'
        const client = await myClient.connect()
        const result = await client.query(sql , [order_ID , userID])
  
        const orders = result.rows[0]

      
  
         client.release()
        if(!orders){
            throw new Error ("Such Order Doesn't Exist")
            
        }
       
    } catch (error) {
      
        throw new Error (error as string) 
        

    }
   

    try {
        const sql = 'INSERT INTO orders_products (quantity , product_id , order_id) VALUES($1,$2,$3) RETURNING *;'
        const client = await myClient.connect()
        const result = await client.query(sql , [payload.quantity , payload.product_id , order_ID])
  
        const orders = result.rows
  
         client.release()
  
        return (orders)
        

    } catch (error) {
        //console.log(error)
       throw new Error(error as string)
    }
  } 
      
}