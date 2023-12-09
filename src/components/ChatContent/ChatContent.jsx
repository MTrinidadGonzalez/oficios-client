import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChatService from '../../services/chat.service';
import SendMessageChat from '../SendMessageChat/SendMessageChat';
import NavBar from '../NavBar/NavBar';


const ChatContent = ({ socket }) => {

  const [messages, setMessages] = useState(null);
  const [oppositeOwnerChat, setOppositeOwnerChat] = useState({});
  const { chatId } = useParams();
  
  const getChat=async()=>{
    const chatService = new ChatService();
    const chatDb= await chatService.getChat(chatId)
    if(chatDb.data.status === 'success'){
      const response =chatDb.data.payload
      const oppositOwner= response.oppositOwner
      setOppositeOwnerChat(oppositOwner)
      const  messages= response.messages
      setMessages(messages)   
      const changeMessageStatus = await chatService.changeMessageStatus(oppositOwner.id);
    }
  }

  useEffect(()=>{
    getChat()
  },[])
  
  socket.on('getRealTimeChat',(data) => {
    setMessages(data.messages);
  });


  return (
    <>
      <NavBar />
      <div className='containers-generales'>
        <div className='chat-continer'>
          <div className='chat-content'>
            
            {oppositeOwnerChat ? (
              <div className='opposite-owner-chat'>
                <div className='oppositeOwnerChat-img-container'>
                <img src={oppositeOwnerChat.imgProfile} alt="Imagen de perfil" className='img-chat' />
                </div>
                <p> {oppositeOwnerChat.first_name}</p>
                <p>{oppositeOwnerChat.last_name}</p>
              </div>
            ) : null}

            {messages && messages.length > 0 ? (
              messages.map((message) => (
                <div key={message._id}>
                  <div className='message-chat'>
                    <p>{message.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className='p-no-messages'>No hay mensajes aún</p>
            )}
          </div>
          <SendMessageChat oppositeOwner={oppositeOwnerChat} chatId={chatId} />     
        </div>
      </div>
    </>
  );
};

export default ChatContent;
/*

*/