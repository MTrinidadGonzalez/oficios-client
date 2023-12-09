import UserService from '../../services/user.service'
import { useNavigate } from 'react-router-dom'

const CarrarSesion = () => {
    const navigate = useNavigate()
    
    const closeSession=async()=>{
    const userService= new UserService()
    const result= await userService.cerrarSession()
    const response= result.data 
    if(response.status === 'success'){
        console.log('cerro correctamente la sesion')
        navigate('/')
    }
    }
    
    return ( <>
    <button  onClick={closeSession} className="item-nav" >Cerrar sesión</button>
    </> );
}
 
export default CarrarSesion;