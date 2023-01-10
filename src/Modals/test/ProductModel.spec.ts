

import ProductModal from "../ProductModal" 

describe("module for testing the products handler and modal" , () => {
    let modal =  new ProductModal()
    it("expects the index request to return an empty array" , async () => {
        expect(await modal.index()).toBeTruthy()
    })
    it("expects the Show request to return an empty array" , async () => {
        expect(await modal.show(1)).toBeTruthy()
    })
    it("expects the Update request to return true" , async () => {
        expect(await modal.UpdateProduct(500,1)).toBeTruthy()
    })
    xit("expects the Delete request to return true" , async () => {
        expect(await modal.DeleteProduct(1)).toBeTruthy()
    })
 

    // it("expects the Show request to return an empty array" , async () => {
    //     expect(await modal.show(0)).toBeTruthy()
    // })
})