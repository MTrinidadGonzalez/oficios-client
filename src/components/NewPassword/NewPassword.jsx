import {useForm} from 'react-hook-form' 
import UserService from '../../services/user.service'
import { useNavigate } from 'react-router-dom'

const NewPassword = () => {
    const {register,handleSubmit}= useForm()
    const navigate = useNavigate()

    const urlParams= new Proxy(new URLSearchParams(window.location.search),{
        get: (searchParams,prop)=> searchParams.get(prop)
    })

    const onSubmit=async(data)=>{
        const token= urlParams.token
        console.log(token.email)
        const obj={
            password:data.password, 
            token: token
        }
        const userService= new UserService()
        const response=await userService.newPassword(obj)
        const result=response.data
        if(result.status === 'success'){
          alert("Nueva contraseña aplicada!")
         // navigate('/login')
        } 
    }

    return ( <>
    <form onSubmit={handleSubmit(onSubmit)} className='forms'>
    <h2>Escribe tu nueva contraseña</h2>
    <input type="password" placeholder="Nueva contraseña" required={true} {...register("password")} />
    <input type="submit" />
    </form>
    </> );
}
 
export default NewPassword;