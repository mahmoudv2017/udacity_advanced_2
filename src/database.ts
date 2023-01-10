import {Pool} from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const {host,user,password,database} = process.env

const Client = new Pool({
    host,user,password,database
})

export default Client