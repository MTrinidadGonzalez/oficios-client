import UserService from '../services/user.service'
import { createContext } from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


export const UserContext = createContext({});

export const UserProvider = ({ children, socket }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const userService = new UserService();

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await userService.getUserProfile();
        if(response.data.status=== 'success'){
         console.log('get usecontext okk')
        }
       
        if (response.data.status === 'error') {
         console.log('Petición userContext:',response.data.error)
        }
      } catch (error) {
        console.log( error);
      
      }
      socket.on('getRealTimeUserProfile', (data) => {
        
        if(data){
         setUser({ ...data })
        }
        else{
         console.log('No realTime token,userContext')
        }
         
       })
    };

    getUserProfile();

   

  }, [navigate]);


  return (
    <UserContext.Provider value={{user}}>
      {children}
    </UserContext.Provider>
  );
};