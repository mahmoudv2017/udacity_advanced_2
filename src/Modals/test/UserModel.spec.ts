import express from 'express';
import {user_class} from '../UserModal'
import app from '../../server';
import axios from 'axios';
import supertest from "supertest";


describe("module for testing the User modal" , () => {
    let modal =  new user_class()
    supertest(app);
    xit("expects the Registration to be fininshed successfully" , async () => {
        expect(await modal.register("omar" , "hesham" , "password1232")).toBeTruthy()
    })

    fit("expects to return all users" ,async () => {
        const res = await axios.get("http://localhost:3000/users")
        expect(res.status).toEqual(200)
    })

    fit("expects to return the second user by id" ,async () => {
        const res = await axios.get("http://localhost:3000/users/2")
        expect(res.status).toEqual(200)
    })

    xit("expects login to be compeleted with status code 200" , async () => {

        const res = await axios.post("http://localhost:3000/login",{
            "firstname":"omar",
            "password":"password1232"
        },{
            headers:{
                "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFzZGFzZCIsImlhdCI6MTY3MjgwODMyOH0.OAzyl7ARG_pRCDFmqg6hqwJ4jS5DyDWBcHmNx-wwMiI"
            }
        })
        
        expect(res.status).toEqual(200)
    })
})