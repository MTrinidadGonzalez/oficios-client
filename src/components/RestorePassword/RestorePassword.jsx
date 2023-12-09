import {useForm} from 'react-hook-form' 
import UserService from '../../services/user.service'
import { useNavigate } from 'react-router-dom'


const RestorePassword = () => {
    const {register,handleSubmit}= useForm() 
    const navigate = useNavigate()

    const onSubmit=async(data)=>{
     const email={
         email:data.email,    
     }
     const userService= new UserService()
     const response=await userService.emailToSendRestorePass(email)
     const result=response.data
     if(result.status === 'success'){
       alert("Ya enviamos un correo para restaurar contraseña!")
       navigate('/')
     } 
 }

    return ( <>
    <div>
     <form onSubmit={handleSubmit(onSubmit)} className='forms'>
     <h2>Escribe el correo con el cual te registraste.
            Te enviaremos un mensaje para cambiar tu contraseña.
        </h2>
        <input type="email" placeholder="correo@gmail.com" required={true} {...register("email")} />
        <input type="submit" value="Enviar"/>
     </form>
    </div>

    </> );
}
 
export default RestorePassword;