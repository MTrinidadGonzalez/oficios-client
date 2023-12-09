import React, { createContext, useState, useEffect } from 'react';
import ChatService from '../services/chat.service';


export const NewMessageContext = createContext({});

export const NewMessageProvider = ({ children, socket }) => {
  const [newMessageList, setNewMessageList] = useState([]);

  const listenNewMessage = async () => {
    const chatService = new ChatService();
    try {
      const pendingChats = await chatService.listenNewMessage();
      const response = pendingChats.data.payload;
      setNewMessageList(response);
    } catch (error) {
      console.error(error);
    }
  };

  socket.on('newMessages', (data) => {
    if (data) {
      setNewMessageList(data);
    }
  });

  useEffect(() => {
    listenNewMessage();

    return () => {
      socket.off('newMessages');
    };
  }, [socket]);

  return (
    <NewMessageContext.Provider value={{ newMessageList, setNewMessageList }}>
      {children}
    </NewMessageContext.Provider>
  );
};