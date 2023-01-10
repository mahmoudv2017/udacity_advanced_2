

import ProductModal from "../ProductModal"
import axios from 'axios';
import app from "../../server";
import supertest from 'supertest';

describe("module for testing the products handler and modal" , () => {
    let modal =  new ProductModal()
    supertest(app)
    it("expects the Create request to return the created elemnt" , async () => {
        let res = await axios.post("http://localhost:3000/products",{name:"mahmoud" , price:515.555 , category:"asdasd"})
        expect(res.status).toBe(200)
    })
    it("expects the index request to return an empty array" , async () => {
        expect((await axios.get(`http://localhost:3000/products`)).status).toEqual(200)
    })
    it("expects the Show request to return with 200 status code" , async () => {
        let res = await axios.get(`http://localhost:3000/products/2`)

        expect(res.status).toEqual(200)
    })
    it("expects the Update request to return true" , async () => {
        expect(await modal.UpdateProduct(500,1)).toBeTruthy()
    })
    xit("expects the Delete request to return true" , async () => {
        expect(await modal.DeleteProduct(1)).toBeTruthy()
    })
 

})