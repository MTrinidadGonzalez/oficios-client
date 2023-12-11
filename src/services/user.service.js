import AxiosClient from "./axios.client"
import {getJsonHeaders, getFormDataHeaders} from '../utils/http'

export default class UserService{
    constructor(){
        this.client= new AxiosClient()
        this.baseURL= `https://oficios-server.onrender.com/api/users`
    }

    getImgProfiles=(imgUrl)=>{
        const requestInfo={
            url:imgUrl,
            config:getJsonHeaders() 
        }
        return this.client.makeGetRequest(requestInfo)
    }

    getUsers=()=>{
        const requestInfo={
            url:`${this.baseURL}`,
            config:getJsonHeaders() 
        }
        return this.client.makeGetRequest(requestInfo)
    }
    getTradesUsers=()=>{
        const requestInfo={
            url:`${this.baseURL}/tradesUsers`,
            config:getJsonHeaders() 
        }
        return this.client.makeGetRequest(requestInfo)
    }
    getUserProfile=()=>{
        const requestInfo={
            url:`${this.baseURL}/profile`,
            config:getJsonHeaders()
        }
        return this.client.makeGetRequest(requestInfo)
    }
    getAuthToken=()=>{
        const requestInfo={
            url:`${this.baseURL}/authToken`,
            config:getJsonHeaders()
        }
        return this.client.makeGetRequest(requestInfo)
    }

    getUserById=(userId)=>{
        const requestInfo={
            url:`${this.baseURL}/userTradesProfile/${userId}`,
            config:getJsonHeaders()
        }
        return this.client.makeGetRequest(requestInfo)
    }

    addCommetToUser=(body)=> {
        const requestInfo={
            url:`${this.baseURL}/addCommentToUser`,
            body,
            config:getJsonHeaders()
        }
        return this.client.makePostRequest(requestInfo)
    }
    
    addRecommendationToUser=(body)=> {
        const requestInfo={
            url:`${this.baseURL}/addRecommendationToUser`,
            body,
            config:getJsonHeaders()
        }
        return this.client.makePostRequest(requestInfo)
    }

    createUser=(body)=> {
        const requestInfo={
            url:`${this.baseURL}/register`,
            body,
            config:getJsonHeaders()
        }
        return this.client.makePostRequest(requestInfo)
    }
    loginUser=(body)=> {
        const requestInfo={
            url:`${this.baseURL}/login`,
            body,
            config:getJsonHeaders()
        }
        return this.client.makePostRequest(requestInfo)
    }

    updateUser=(body)=> {
        const requestInfo={
            url:`${this.baseURL}/updateUser`,
            body,
            config:getJsonHeaders()
        }
        return this.client.makePutRequest(requestInfo)
    }
    
   

    emailToSendRestorePass=(body)=>{
        const requestInfo={
            url:`${this.baseURL}/emailToSendNewPsw`,
            body,
            config:getJsonHeaders()
        }
        return this.client.makePostRequest(requestInfo)
    }

    newPassword=(body)=>{
        const requestInfo={
            url:`${this.baseURL}/newPassword`,
            body,
            config:getJsonHeaders()
        }
        return this.client.makePostRequest(requestInfo)
    }


    convertToPremium=()=>{
        const requestInfo={
            url:`${this.baseURL}/convertToPremium`,
            config:getJsonHeaders()
        }
        return this.client.makeGetRequest(requestInfo)
    }

    revertPremium=()=>{
        const requestInfo={
            url:`${this.baseURL}/revertPremium`,
            config:getJsonHeaders()
        }
        return this.client.makeGetRequest(requestInfo)
    }

    deleteUser=(body)=>{
        const requestInfo={
            url:`${this.baseURL}/${body}`,
            body,
            config:getJsonHeaders()
        }
        return this.client.makeDeleteRequest(requestInfo)
    }


    updateImgProfile = (formData) => { 
        const requestInfo = {
            url: `${this.baseURL}/postImgProfile`,
            body: formData,
            config: getFormDataHeaders() 
        }
        return this.client.makePostRequest(requestInfo)
    }
   
    cerrarSession=()=>{
        const requestInfo={
            url:`${this.baseURL}/cerrarsession`,
            config:getJsonHeaders()
        }
        return this.client.makeGetRequest(requestInfo)
    }

    
    changeUserLocation = (body) => {
        const requestInfo = {
          url: `${this.baseURL}/userLocation`,
          body: JSON.stringify(body),
          config:getJsonHeaders()
        };
        return this.client.makePostRequest(requestInfo);
      };
}