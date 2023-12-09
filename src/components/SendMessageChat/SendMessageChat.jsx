import {useForm} from 'react-hook-form'
import ChatService from '../../services/chat.service'


const SendMessageChat = ({ chatId,opossiteOwner }) => {

    const {register,handleSubmit,setValue,reset}= useForm()

    const onSubmit = async (data) => {
        const msj={
            message: data.message,
            chatId:chatId,
            opossiteOwner:opossiteOwner
        }
        
       const chatService = new ChatService();
        const response = await chatService.sendMessage(msj);
       
        if (response.data.status === 'success') {
          
          reset();
        }
      };

    return ( <>
    <form onSubmit={handleSubmit(onSubmit)} className='form-send-message'>
    <input type="text" placeholder="Mensaje..." required {...register("message")} className='message-input'/>
        <button type='submit' className='btns-with-icons'>
        <ion-icon name="navigate-outline"></ion-icon>
        </button>
    </form>
    </> );
}
 
export default SendMessageChat;

