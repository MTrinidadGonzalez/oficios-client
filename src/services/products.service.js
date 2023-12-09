import AxiosClient from "./axios.client"
import {getJsonHeaders, getFormDataHeaders} from '../utils/http'


export default class ProductsService{
    constructor(){
        this.client= new AxiosClient()
        this.baseURL= `http://localhost:8081/api/products`
    }

    getProducts=()=>{
        const requestInfo={
            url:`${this.baseURL}`,
            config:getJsonHeaders()
        }
        return this.client.makeGetRequest(requestInfo)
    }
    getProduct=(pid)=>{
        const requestInfo={
            url:`${this.baseURL}/${pid}`,
            config:getJsonHeaders()
        }
        return this.client.makeGetRequest(requestInfo)
    }
    

      createProduct = (formData) => { 
        const requestInfo = {
            url: `${this.baseURL}/newproduct`,
            body: formData,
            config: getFormDataHeaders() 
        }
        return this.client.makePostRequest(requestInfo)
    }

    
    updateProduct=(body)=> {
        const requestInfo={
            url:`${this.baseURL}/updateProduct`,
            body,
            config:getJsonHeaders()
        }
        return this.client.makePutRequest(requestInfo)
    }
  
    deleteProduct=(pid)=>{
        const requestInfo={
            url:`${this.baseURL}/deleteProduct/${pid}`,
            config:getJsonHeaders(),
           
        }
        return this.client.makeDeleteRequest(requestInfo)
    }

    addProductToCart=(body)=> {
        const requestInfo={
            url:`${this.baseURL}/addProductTocart`,
            body,
            config:getJsonHeaders()
        }
        return this.client.makePostRequest(requestInfo)
    }
    
   
    deleteproductTocart=(body)=> {
        const requestInfo={
            url:`${this.baseURL}/deleteproductTocart`,
            body,
            config:getJsonHeaders()
        }
        return this.client.makePostRequest(requestInfo)
    }

    updateProductImg=(formData)=> {
        const requestInfo={
            url:`${this.baseURL}/updateProductImg`,
            body: formData,
            config: getFormDataHeaders() 
        }
        return this.client.makePostRequest(requestInfo)
    }


}