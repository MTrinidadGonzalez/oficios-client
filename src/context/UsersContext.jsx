import  UserService from '../services/user.service'
import { createContext } from 'react'
import { useState,useEffect } from 'react'


export const UsersContext=createContext({})
export const UsersProvider= ({children}) => {
    
    const [users,setUsers]= useState([])

    useEffect(()=>{
        const getUser= async()=>{
            const userService= new UserService()
            const response= await userService.getTradesUsers()
            const result= await response.data.payload
            
            if(response.data.status === 'success'){
              setUsers(result)
            }
           
        }
        getUser()
    },[])
    
    
    return ( <>
   <UsersContext.Provider value={{users}}>
    {children}
   </UsersContext.Provider>
    </> );
}
 

