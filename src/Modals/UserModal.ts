import Client from "../database";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config()

export type User = {
    id:number,
    firstname:string,
    lastname:string,
    password:string
}

const {pepper , SALT_ROUNDS} = process.env

export class user_class{
   async register(firstname:string , lastname:string , password:string) {
        const peppered_passowrd = password + pepper; 
        const client = await Client.connect();

        try {
            let hashed_pass = bcrypt.hashSync( peppered_passowrd , Number(SALT_ROUNDS) );
          
             const sql = "INSERT INTO USERS(firstname,lastname,password) VALUES($1 , $2 ,$3);";
     
             const results = await client.query(sql , [firstname , lastname ,hashed_pass]);
     
             client.release();
           
             return results.rows;
        } catch (error) {
            console.log(error)
            throw new Error(error as string)
        }
     


   }

   async login(payload:any) {
        const client = await Client.connect();

        let sql = 'select * from users where firstname=$1';
        let username = payload.firstname;
        let password = payload.password;
        const results = await client.query(sql , [username]);
        if(results.rows.length){

            if(bcrypt.compareSync(password+pepper , results.rows[0].password)){
               const token = jwt.sign({username} , process.env.SECRET as string)
                return ({token:token , results:results.rows});
              
            }
        }
        throw new Error("Access Denied")
   }

   async GetAllUsers() {
    try {
        const client = await Client.connect();

        let sql = 'select * from users;';

        const results = await client.query(sql);
       
       return (results.rows)
    } catch (error) {
        throw new Error(error as string)
    }
   
}

async GetUser(userID:number) {
    try {
        const client = await Client.connect();

        let sql = 'select * from users where id=$1';
  
        const results = await client.query(sql , [userID]);
       
        return (results.rows)
    } catch (error) {
        throw new Error(error as string)
    }
   
}

   verifyAuthToken(req:express.Request , res:express.Response , next:express.NextFunction){

    try {

        const authorization_header = req.headers.authorization;
        const Actual_token:string = authorization_header?.split(" ")[1] as string
        jwt.verify(Actual_token , process.env.SECRET as string)
        next();
    } catch (error) {
        res.status(401).json("Token Denied")
    }
       


   }
}