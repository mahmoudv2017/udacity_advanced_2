import {Axios} from "axios"
import { user_class } from "../UserModal"
import supertest from 'supertest';



export default async function gettingToken():Promise<string>{
    //  await auth.register("test" , "lasttest" , "pass123"); //run only once
    let auth = new user_class()
    let results = await auth.login({firstname:"test",password:"pass123"})
  
//    let axios = new Axios({
//       baseURL:"http://localhost:3000",
      
//       headers:{
//           "Authorization" : `Bearer ${results}`
//       }
//     })
  
    return results
  };