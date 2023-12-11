import UserService from '../../services/user.service'
import  UserCard from '../UserCard/UserCard'
import { useState, useEffect } from 'react'
import NavBar from '../NavBar/NavBar'

const UserProfile = () => {
    const [user, setUser] = useState({})
    const [apiImgProfile, setApiImgProfile] = useState(null);

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
                    const imgResponse = await userService.getImgProfiles(result.imgProfile);
                }
                if (response.data.status === 'error') {
                    if (response.data.error === "No hay token de usuario aún") {
                        console.log('response.data.error:', response.data.error)
                    }
                }
        }
        getUser()
    }, [])

    return ( <>
          {apiImgProfile && (
                <div>
                    <p>Imagen del perfil:</p>
                    <img src={`data:image/jpeg;base64,${apiImgProfile}`} alt="Imagen de perfil" />
                </div>
            )}

    <NavBar/>
    <div className='containers-generales'>
    <UserCard id={user._id} first_name={user.first_name} 
    last_name={user.last_name} alias={user.alias} email={user.email} zona={user.zona} role={user.role} img={user.img} />
    </div>
    </> );
}
 
export default UserProfile;


/*
const UserProfile = () => {
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

    return ( <>
    <NavBar/>
    <div className='containers-generales'>
    <UserCard id={user._id} first_name={user.first_name} 
    last_name={user.last_name} alias={user.alias} email={user.email} zona={user.zona} role={user.role} img={user.img} />
    </div>
    </> );
}
 
export default UserProfile;*/
