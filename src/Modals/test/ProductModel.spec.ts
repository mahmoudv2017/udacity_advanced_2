

import ProductModal from "../ProductModal"
import axios, { Axios } from 'axios';
import app from "../../server";
import supertest from 'supertest';
import gettingToken from "./utility";

describe("module for testing the products endpoints and modal" , () => {
    describe("module for testing the products modal" , () => {
        let modal =  new ProductModal()
        supertest(app)
        it("expects the Create request to return the created elemnt" , async () => {
            let res = await modal.CreateProduct({name:"mahmoud" , price:515.555 , category:"asdasd"})
            expect(res.length).toBeGreaterThan(0)
        })
        it("expects the index request to return an array" , async () => {
            await modal.CreateProduct({name:"maasdasdhmoud" , price:515.555 , category:"asdasd"})
            let res = await modal.index()
            expect( res.length  ).toBeGreaterThan(0)
        })
        it("expects the Show request to return with 200 status code" , async () => {
            let res = await modal.show(1)
    
            expect(res.length).toBeGreaterThan(0)
        })
        it("expects the Update request to return true" , async () => {
            expect(await modal.UpdateProduct(500,1)).toBeTruthy()
        })
        xit("expects the Delete request to return true" , async () => {
            expect(await modal.DeleteProduct(1)).toBeTruthy()
        })
     
    
    })

    describe("module for testing the products endpoints" , () => {
        let request = supertest(app);

        
        let token:string ;


            beforeAll( async () => {
            token  = await gettingToken();
     
            })
        let modal =  new ProductModal()
        supertest(app)
        it("expects the Create request to return the created elemnt" , async () => {
            let res = await request.post("/products").set({Authorization: `Bearer ${token}` }).send({name:"mahmoud" , price:515.555 , category:"asdasd"})
            expect(res.status).toBe(200)
        })
        it("expects the index request to succeed" , async () => {
            expect((await request.get(`/products`)).status).toEqual(200)
        })
        it("expects the Show request to return with 200 status code" , async () => {
            let res = await request.get(`/products/2`)
    
            expect(res.status).toEqual(200)
        })
        it("expects the Update request to return true" , async () => {
            let res = await request.get(`/products/2`).set({Authorization: `Bearer ${token}`})
            .send({price:15415})
            expect(res.status).toEqual(200)
        })
        
        it("expects the Delete request to return true" , async () => {
            await modal.CreateProduct({name:"asd",price:51541,category:"asdasds"})
        
            let products = await modal.index()
           
            let res = await request.delete(`/products/${products[products.length-1].id}`).set({Authorization: `Bearer ${token}`})
            expect(res.status).toEqual(200)
        })
     
    
    })
})








