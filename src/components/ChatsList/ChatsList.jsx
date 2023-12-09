import { useEffect, useState,useContext } from 'react';
import ChatService from '../../services/chat.service';
import GetAndCreateChat from '../GetAndCreateChat/GetAndCreateChat'
import { Link } from 'react-router-dom';
import  NavBar from '../NavBar/NavBar'
import { UsersContext } from '../../context/UsersContext';
import {NewMessageContext} from '../../context/NewMessageContext'


const ChatsList = () => {
  const [chatsList, setChatsList] = useState(null);
  const [userNewMessage, setUserNewMessage] = useState(null);
  const { newMessageList } = useContext(NewMessageContext);

  const getChatList = async () => {
    const chatService = new ChatService();
    const chatDb = await chatService.getUserChats();
    const response = chatDb.data.payload;
    setChatsList(response);
  };

 

  useEffect(() => {
    getChatList();
    
  }, []);

  return (
    <>
   <NavBar/>
    <div className='containers-generales' >
      {chatsList && chatsList.length > 0 ? (
        <div className='chat-list'>
          {chatsList.map((chat, index) => (
            <div key={chat.chatId} >
              <Link to={`/chat/${chat.chatId}`} className='chat-list-item' >
                <div  className='chat-list-item-img-containter' >
                <img src={chat.opossiteOwner.imgProfile} alt={`Imagen de ${chat.opossiteOwner.first_name} ${chat.opossiteOwner.last_name}`} className='chat-list-item-img'  />
                </div>
                <p className='chat-list-item-p'>{chat.opossiteOwner.first_name} {chat.opossiteOwner.last_name}</p>
                <span >
                {newMessageList.includes(chat.opossiteOwner.id) && newMessageList.length > 0 ? 'NewMesj' : null}
                </span>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <h2>No hay mensajes aún</h2>
      )}
    </div>
    </>
    
  );
};

export default ChatsList;

