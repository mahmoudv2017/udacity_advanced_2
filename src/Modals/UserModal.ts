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

   async login(req:express.Request , res:express.Response) {
        const client = await Client.connect();

        let sql = 'select * from users where firstname=$1';
        let username = req.body.firstname;
        let password = req.body.password;
        const results = await client.query(sql , [username]);
        if(results.rows.length){

            if(bcrypt.compareSync(password+pepper , results.rows[0].password)){
               const token = jwt.sign({username} , process.env.SECRET as string)
                res.status(200).json(token);
                return;
            }
        }
        res.status(401).json("Access Denied")
   }

   async GetAllUsers(req:express.Request , res:express.Response) {
    try {
        const client = await Client.connect();

        let sql = 'select * from users;';

        const results = await client.query(sql);
       
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(305).json(error)
    }
   
}

async GetUser(req:express.Request , res:express.Response) {
    try {
        const client = await Client.connect();

        let sql = 'select * from users where id=$1';
        let userID = req.params.id 
        const results = await client.query(sql , [userID]);
       
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(305).json(error)
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