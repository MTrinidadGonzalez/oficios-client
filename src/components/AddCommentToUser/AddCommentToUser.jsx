import UserService from '../../services/user.service'
import {useForm} from 'react-hook-form'

const AddCommentToUser = ({user}) => {

    const {register,handleSubmit,setValue,reset}= useForm()
   
    
    const onSubmit = async (data) => {
     
        const newCommentToUserData={
            receiverComment:user,
            comment:data.comment.toString()
        }
       const userService= new UserService()
       const sendNewComment= await userService.addCommetToUser(newCommentToUserData)
       const response= sendNewComment.data
       if(response.status === 'success'){
        reset()
       }
      };

   return ( <>
    <form onSubmit={handleSubmit(onSubmit)} className='add-commentToUser-form' >
        <input type="text" placeholder="Deja tu experiencia de este usuario" required {...register("comment")}/>
        <button type='submit' className='btns-with-icons'>
        <ion-icon name="navigate-outline"></ion-icon>
        </button>
    </form>
    </> );
}
 
export default AddCommentToUser;