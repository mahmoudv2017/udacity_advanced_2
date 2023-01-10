import express from 'express';
import {user_class} from '../UserModal'
import app from '../../server';
import axios from 'axios';
import supertest from "supertest";


describe("module for testing the products handler and modal" , () => {
    let modal =  new user_class()
    supertest(app);
    xit("exprcts the index request to return an empty array" , async () => {
        expect(await modal.register("omar" , "hesham" , "password1232")).toBeTruthy()
    })

    it("exprcts the Show request to return an empty array" , async () => {

        const res = await axios.post("http://localhost:3000/login",{
            "firstname":"mahmoud",
            "password":"vcut2020"
        })
        
        expect(res.data).toBeTruthy()
    })
})