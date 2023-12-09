import AxiosClient from "./axios.client"
import {getJsonHeaders, getFormDataHeaders} from '../utils/http'

export default class ChatService{
    constructor(){
        this.client= new AxiosClient()
        this.baseURL= `http://localhost:8081/api/chats`
    }

    
    listenNewMessage=()=>{
        const requestInfo={
            url:`${this.baseURL}/listenNewMessage`,
            config:getJsonHeaders()
        }
        return this.client.makeGetRequest(requestInfo)
    }

    changeMessageStatus=(emisorMessageId)=>{
        const requestInfo={
            url:`${this.baseURL}/changeMessageStatus/${emisorMessageId}`,
            config:getJsonHeaders()
        }
        return this.client.makeGetRequest(requestInfo)
    }


    getUserChats=()=>{
        const requestInfo={
            url:`${this.baseURL}/userChats`,
            config:getJsonHeaders()
        }
        return this.client.makeGetRequest(requestInfo)
    }
    
    getChat=(chatID)=>{
        const requestInfo={
            url:`${this.baseURL}/getChat/${chatID}`,
            config:getJsonHeaders()
        }
        return this.client.makeGetRequest(requestInfo)
    }
    getAndCreateChat=(opossiteOwner)=>{
        const requestInfo={
            url:`${this.baseURL}/getAndCreateChat/${opossiteOwner}`,
            config:getJsonHeaders()
        }
        return this.client.makeGetRequest(requestInfo)
    }
   /* sendMessage = (formData) => { 
        console.log('en sendMsjService',formData)
        const requestInfo = {
            url: `${this.baseURL}/addMssChat`,
            body: formData,
            config: getFormDataHeaders() 
        }
        return this.client.makePostRequest(requestInfo)
    }*/

    sendMessage=(body)=> {
        const requestInfo={
            url:`${this.baseURL}/addMssChat`,
            body,
            config:getJsonHeaders()
        }
        return this.client.makePostRequest(requestInfo)
    }
  
    deleteMessage=(body)=> {
        const requestInfo={
            url:`${this.baseURL}/deleteMessage`,
            body,
            config:getJsonHeaders()
        }
        return this.client.makePostRequest(requestInfo)
    }
}