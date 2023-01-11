import supertest from 'supertest';
import OrderModel from '../OrderModal';

import {user_class} from '../UserModal';
import app from './../../server';
import {Axios} from 'axios';
import ProductModal from '../ProductModal';
import gettingToken from './utility';


let store = new OrderModel()
let auth = new user_class()
let products = new ProductModal()



describe("tests the order Model and endpoints" , () => {
    describe("tests the Order Model" , () => {
    


        it("exptects the order to be created" , async () => {
            const result = await store.Create(1,"not compeleted")
           // const res = await axios.post("http://localhost:3000/user/2/orders",{status:"not completed"})
       
           expect(result.length).toBeGreaterThan(0)
           // expect(result.status).toEqual(200)
        })
    
        it("exptects all orders for the user to be returned" , async () => {
            const res = await store.Index(2)
            expect(res.length).toBeGreaterThanOrEqual(0)
        })
    
        it("exptects a specific order to be returned" , async () => {
            const res = await store.Show(2 , 2)
            expect(res.length).toBeGreaterThanOrEqual(0)
        })
    
        xit("exptects the order to be updated" , async () => {
            await store.Create(4,"not compeleted")
            const res = await store.Update("completed" ,2 , 2)
    
            expect(res.length).toBeGreaterThanOrEqual(0)
        })
    
        
    
        it("exptects a product to be added to the cart" , async () => {
            
            let users = await auth.GetAllUsers()
          
            const orders = await store.Create( users[0].id , "not completed")
            await products.CreateProduct({name:"aasdasd",price:54151 , category:"asdasd"})
            let payload = {quantity:5 , product_id:2}
            const res = await store.addProduct(orders[0].id,users[0].id,payload)
            expect(res.length).toBeGreaterThanOrEqual(0)
        })
    
        xit("exptects the order to be deleted" , async () => {
            const res = await store.Delete(1)
            expect(res).toEqual({msg : "Order Deleted Successfully"})
        })
    })
    describe("tests the Order Endpoints" ,  () => {
        //   let store = new OrderModel()
       let request = supertest(app);

        
        let token:string ;


            beforeAll( async () => {
            token  = await gettingToken();
     
            })

    
    
        it("expects the order to be created" , async () => {
            
            const res = await request.post(`/user/1/orders`).send( {status:"not completed"}).set({Authorization: `Bearer ${token}` })
            
            expect(res.status).toEqual(200)
        })
    
        it("expects all orders for the user to be returned" , async () => {
    
            const res = await request.get("/user/1/orders").set({Authorization: `Bearer ${token}` })
            expect(res.status).toEqual(200)
        })
    
        it("expects a specific order to be returned" , async () => {

            const res = await request.get("/user/1/orders/1").set({Authorization: `Bearer ${token}` })
            expect(res.status).toEqual(200)
        })
    
        it("expects the order to be updated" , async () => {
            await store.Create(1,"not compelted")
            let orders = await store.Index(1)
  
            const res = await request.patch(`/user/1/orders/${orders[0].id}`).send( {status:"not completed"}).set({Authorization: `Bearer ${token}` })
            expect(res.status).toEqual(200)
        })
    
        
    
        it("expects a product to be added to the cart" , async () => {
            await store.Create(1,"not compelted")
            let orders = await store.Index(1)
        
            const res = await request.post(`/users/1/orders/${orders[0].id}/products`).send( {quantity:2 , product_id:1}).set({Authorization: `Bearer ${token}` })
        
                expect(res.status).toEqual(200)
        })
    
        xit("exptects the order to be deleted" , async () => {
            await request.post("/user/1/orders").send( {status:"not completed"}).set({Authorization: `Bearer ${token}` })
            let orders = await store.Index(2)
            const res = await request.delete(`/user/1/orders/${orders[0].id}`)
            expect(res.status).toEqual(200)
        })
    })
})



