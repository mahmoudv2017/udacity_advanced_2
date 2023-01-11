import supertest from 'supertest';
import OrderModel from '../OrderModal';
import app from './../../server';
import axios from 'axios';


describe("tests the Order Model" , () => {
    let store = new OrderModel()
    supertest(app)

    it("exptects the order to be created" , async () => {
        const result = await store.Create(3,"not compeleted")
       // const res = await axios.post("http://localhost:3000/user/2/orders",{status:"not completed"})
   
       expect(result.length).toBeGreaterThan(0)
       // expect(result.status).toEqual(200)
    })

    it("exptects all orders for the user to be returned" , async () => {
        const res = await store.Index(2)
        expect(res.length).toBeGreaterThan(0)
    })

    it("exptects a specific order to be returned" , async () => {
        const res = await store.Show(2 , 2)
        expect(res.length).toBeGreaterThan(0)
    })

    xit("exptects the order to be updated" , async () => {
        await store.Create(4,"not compeleted")
        const res = await store.Update("completed" ,2 , 2)

        expect(res.length).toBeGreaterThan(0)
    })

    

    it("exptects a product to be added to the cart" , async () => {
        let payload = {quantity:5 , product_id:2}
        const res = await store.addProduct(2,2,payload)
        expect(res.length).toBeGreaterThan(0)
    })

    xit("exptects the order to be deleted" , async () => {
        const res = await store.Delete(1)
        expect(res).toEqual({msg : "Order Deleted Successfully"})
    })
})