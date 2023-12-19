import UserService from '../../services/user.service'
import  UserCard from '../UserCard/UserCard'
import { useState, useEffect } from 'react'
import NavBar from '../NavBar/NavBar'


const UserProfile = ({ socket }) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        const getUser = async () => {
            const userService = new UserService()
            const response = await userService.getUserProfile()
                const result = await response.data.payload
                
                if (result) {
                    const userData = {
                        id: result._id,
                        alias: result.alias,
                        first_name: result.first_name,
                        last_name: result.last_name,
                        email: result.email,
                        img: result.imgProfile,
                        role: result.role,
                        zona: result.zona
                    }
                    setUser({ ...userData })
                }
                if (response.data.status === 'error') {
                    if (response.data.error === "No hay token de usuario aún") {
                        console.log('response.data.error:', response.data.error)
                    }
                }
        }
        getUser()
    }, [])

    socket.on('getRealTimeUserProfile',(data) => {
        const userData = {
            id: data._id,
            alias: data.alias,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            img: data.imgProfile,
            role: data.role,
            zona: data.zona
        }
        setUser({ ...userData })
      });

    return ( <>
    <NavBar/>
    <div className='containers-generales'>
    <UserCard id={user._id} first_name={user.first_name} 
    last_name={user.last_name} alias={user.alias} email={user.email} zona={user.zona} role={user.role} img={user.img} />
    </div>
    </> );
}
 
export default UserProfile;
