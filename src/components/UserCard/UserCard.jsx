import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UpdateProfileImg from '../UpdateProfileImg/UpdateProfileImg';
import  DeleteUser from '../DeleteUser/DeleteUser'

const UserCard = ({id, first_name, last_name, alias, email, zona, role, img }) => {
  const [showUpdateProfileImg, setShowUpdateProfileImg] = useState(false);

  const toggleUpdateProfileImg = () => {
    setShowUpdateProfileImg(!showUpdateProfileImg);
  };

  return (
    <>
      <div className="user-profile-card" key={id}>
        <div className="user-card-imgContainer">
        <img src={img} alt="Imagen perfil de usuario" className="user-profile-card-img" loading='lazy' />
        </div>
        <button onClick={toggleUpdateProfileImg} className='btns-with-icons'>
        <ion-icon name="camera-outline"></ion-icon>
        </button>
        {showUpdateProfileImg && <UpdateProfileImg />}
        <div className='bodyCards'>
        <h1>Nombre:{first_name} {last_name}</h1>
        <h2>Alias: {alias} </h2>
        <p>Correo: {email} </p>
        <p>Zona: {zona}</p>
        </div>
      
        <Link to='/updateUserForm' className='btns-with-icons'>
        <p>Modificar datos</p>
        <ion-icon name="create-outline"></ion-icon>
        </Link>
        <DeleteUser/>
        
      </div>
    </>
  );
}

export default UserCard;


