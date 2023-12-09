import { Link } from "react-router-dom";
import  CarrarSesion from '../CerrarSesion/CerrarSesion'
import { useState, useEffect,useContext } from "react";
import ChatService from '../../services/chat.service';
import { UsersContext } from '../../context/UsersContext';
import {NewMessageContext} from '../../context/NewMessageContext'


const NavBar = () => {
    const { newMessageList } = useContext(NewMessageContext);
  

    return (
      <div className="navBar" >
      <Link to="/home" className="item-nav" >HOME</Link>
      
             <Link to="/users" className="item-nav" >USUARIOS</Link>
             <Link to="/chatsList" className="item-nav" >
             <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
               {newMessageList.length > 0 ? (
                 <span className="new-messages-cuantity">{newMessageList.length}</span>
               ) : null}
             </Link>
             <Link to="/profile" className="item-nav" >MI PERFIL</Link>
             <CarrarSesion  />
      </div>
    );
  };
  
  export default NavBar;
