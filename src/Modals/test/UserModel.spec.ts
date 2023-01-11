import express, { request } from 'express';
import {user_class} from '../UserModal'
import app from '../../server';
import axios from 'axios';
import supertest from "supertest";
import gettingToken from './utility';


describe("module for testing users endpoints and models" , () => {

    let request = supertest(app)
    describe("module for testing the User modal" , () => {
        let modal =  new user_class()
        supertest(app);
        xit("expects the Registration to be fininshed successfully" , async () => {
            expect(await modal.register("omar" , "hesham" , "password1232")).toBeTruthy()
        })
    
        it("expects to return all users" ,async () => {
         
            const res = await modal.GetAllUsers()
            expect(res.length).toBeGreaterThanOrEqual(0)
        })
    
        it("expects to return the second user by id" ,async () => {
            const res = await modal.GetUser(2)
            expect(res.length).toBeGreaterThanOrEqual(0)
        })
    
        xit("expects login to be compeleted with status code 200" , async () => {
            let payload = {
                firstname:"omar",
                password:"password1232"
            }
    
     
            const res = await modal.login(payload)
        
            expect(res).toBeTruthy()
           
        })
    })
    


    describe("module for testing the User endpoints" , () => {
        let token:string ;
        
    
        beforeAll( async () => {
        token  = await gettingToken();
    
        })
        let modal =  new user_class()
        supertest(app);
        xit("expects the Registration to be fininshed successfully" , async () => {
            expect(await modal.register("omar" , "hesham" , "password1232")).toBeTruthy()
        })
    
        it("expects to return all users" ,async () => {
            const res = await request.get("/users").set({Authorization: `Bearer ${token}` })
            expect(res.status).toEqual(200)
        })
    
        it("expects to return the second user by id" ,async () => {
            const res = await request.get("/users/1").set({Authorization: `Bearer ${token}` })
            expect(res.status).toEqual(200)
        })
    
        it("expects login to be compeleted with status code 200" , async () => {
    
            const res = await request.post("/login").send({ firstname:"test",
            password:"pass123"})
            
            expect(res.status).toEqual(200)
        })
    })
})






