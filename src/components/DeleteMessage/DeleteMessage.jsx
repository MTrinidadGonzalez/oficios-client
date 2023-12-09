
import ChatService from '../../services/chat.service'

const DeleteMessage = ({mid, chatID}) => {
   
    const handleDeleteMessage = async () => {
        const chatServices = new ChatService();
        const message={
            messageId: mid,
            chatID:chatID
        }
            const deleteMsg= await chatServices.deleteMessage(message)
            const response= deleteMsg.data
            console.log('deleteproductREsponse',response)
      };
    
  return ( <>
            <div >
            <button  onClick={() => handleDeleteMessage()}>
            <ion-icon name="trash-outline"></ion-icon>
            </button>
            </div>
    </> );
}
 
export default DeleteMessage;