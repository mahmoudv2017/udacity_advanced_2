import supertest from 'supertest';
import OrderModel from '../OrderModal';
import app from './../../server';
import axios from 'axios';


describe("tests the Order Model" , () => {
 //   let store = new OrderModel()
    supertest(app)

    xit("exptects the order to be created" , async () => {
        const res = await axios.post("http://localhost:3000/user/2/orders",{status:"not completed"})
        expect(res.status).toEqual(200)
    })

    it("exptects all orders for the user to be returned" , async () => {
        const res = await axios.get("http://localhost:3000/user/2/orders")
        expect(res.status).toEqual(200)
    })

    it("exptects a specific order to be returned" , async () => {
        const res = await axios.get("http://localhost:3000/user/2/orders/1")
        expect(res.status).toEqual(200)
    })

    xit("exptects the order to be updated" , async () => {
        const res = await axios.patch("http://localhost:3000/user/2/orders/2",{status:"completed"})
        expect(res.status).toEqual(200)
    })

    

    it("exptects a product to be added to the cart" , async () => {
        const res = await axios.post("http://localhost:3000/users/2/orders/2/products",{quantity:5 , product_id:2})
        expect(res.status).toEqual(200)
    })

    xit("exptects the order to be deleted" , async () => {
        const res = await axios.delete("http://localhost:3000/user/2/orders/1")
        expect(res.status).toEqual(200)
    })
})