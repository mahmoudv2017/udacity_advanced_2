import {Pool} from 'pg';
import dotenv from 'dotenv';
dotenv.config();


let {host,user,password,database , database_test , ENV} = process.env
console.log(ENV)
if(ENV == "test"){
    database=database_test
}



const Client = new Pool({
    host,user,password,database
})

 export default Client