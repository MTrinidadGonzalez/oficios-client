import React from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import io from 'socket.io-client';
import { AuthTokenProvider } from './context/AuthTokenContext';
import { UsersProvider } from './context/UsersContext';
import { NewMessageProvider } from './context/NewMessageContext';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import UserProfile from './components/UserProfile/UserProfile';
import Inicio from './components/Inicio/Inicio';
import UsersTrades from './components/UsersTrades/UsersTrades';
import ChatContent from './components/ChatContent/ChatContent';
import ChatsList from './components/ChatsList/ChatsList';
import UserTradesProfile from './components/UserTreadesProfile/UserTreadesProfile';
import UpdateUserForm from './components/UpdateUserForm/UpdateUserForm';
import GetLocation from './components/GetLocation/GetLocation';

//const socket = io('http://localhost:8081');
const socket = io('https://oficios-server.onrender.com/')

function App() {
  return (
    <BrowserRouter>
      <UsersProvider socket={socket}>
        <NewMessageProvider  socket={socket}>
          <AuthTokenProvider>
            <Routes>
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/home' element={<Home />} />
              <Route path='/profile' element={<UserProfile />} />
              <Route path='/' element={<Inicio />} />
              <Route path='/users' element={<UsersTrades socket={socket} />} />
              <Route path='/chat/:chatId' element={<ChatContent socket={socket} />} />
              <Route path='/chatsList' element={<ChatsList socket={socket} />} />
              <Route path='/userProfile/:userId' element={<UserTradesProfile  socket={socket} />} />
              <Route path='/updateUserForm' element={<UpdateUserForm />} />
              <Route path='/userLocation' element={<GetLocation />} />
            </Routes>
          </AuthTokenProvider>
        </NewMessageProvider>
      </UsersProvider>
    </BrowserRouter>
  );
}

export default App;


