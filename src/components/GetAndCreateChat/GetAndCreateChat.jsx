import React, { useState } from "react";
import { Link } from "react-router-dom";
import ChatService from "../../services/chat.service";
import { useNavigate } from 'react-router-dom';


const GetAndCreateChat = ({ opossiteOwner }) => {

  const navigate = useNavigate();
  const getChatInfo = async () => {
    try {
      const chatService = new ChatService();
      const chatDb = await chatService.getAndCreateChat(opossiteOwner);
      if (chatDb?.data?.status === "success") {
        const response = chatDb.data.payload;
        const chatId= response.chatId  
        if(chatId){
          navigate(`/chat/${chatId}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button  onClick={getChatInfo} className='btns-with-icons' >
      <p> Enviar mensaje</p>
      <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
      </button>
    </>
  );
};

export default GetAndCreateChat;


