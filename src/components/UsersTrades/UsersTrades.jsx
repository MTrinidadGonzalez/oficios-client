import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import UserService from '../../services/user.service';
import UsersTradesCards from '../UsersTradesCards/UsersTradesCards';
import { Link } from 'react-router-dom';


const UsersTrades = ({socket}) => {

  const [users, setUsers] = useState([]);
  const [actualUserId, setActualUserId] = useState(null);
  const [selectedOficio, setSelectedOficio] = useState('');
  const [selectedZona, setSelectedZona] = useState('');

  const userService = new UserService();

  const getActualUserId = async () => {
    const response = await userService.getUserProfile();
    if (response.data.status === 'success') {
      const result = response.data.payload;
      setActualUserId(result._id);
    }
  };

  const getUsers = async () => {
    const response = await userService.getTradesUsers();
    if (response.data.status === 'success') {
      const result = response.data.payload;
      setUsers(result);
    }

  };

  if(socket){
    socket.on('getAllUsers', (data) => {
      if(data){
       setUsers(data);
      }
    });
  }


  useEffect(() => {
    getActualUserId();
    getUsers();
  }, []);

  const handleOficioChange = (e) => {
    setSelectedOficio(e.target.value);
  };

  const handleZonaChange = (e) => {
    setSelectedZona(e.target.value);
  };

  return (
    <>
  <NavBar />
  <div className='containers-generales'>
  <div className="filter-container constainer-selects">
        <div className='sub-div-select' >
        <label>  Oficio: </label>
          <select value={selectedOficio} onChange={handleOficioChange}>
            <option value="">Todos</option>
            <option value="cliente">Cliente</option>
            <option value="albañileria">Albañilería</option>
            <option value="carpinteria">Carpintería</option>

            <option value="jardineria">Jardineria</option>
            <option value="montador/a de cristales y vidrios">Montador/a de cristales y vidrios</option>
            <option value="pintor/a">Pintor/a</option>

            <option value="mecanico/a">Mecanico/a</option>
            <option value="peluquero/a">Peluquero/a</option>
            <option value="zapatero/a">Zpatero/a</option>

            <option value="gasista">Gasista</option>
            <option value="chapista de vehiculos">Chapista de vehiculos</option>
            <option value="maquillador/a">Maquillador/a</option>
            
            <option value="electricista">Electricista</option>
            <option value="limpieza doméstica">Limpieza doméstica</option>
            <option value="enfermera a domicilio">Enfermera a domicilio</option>
            <option value="cuidado de personas">Cuidado de personas</option>
            <option value="maestra integradora">Maestra integradora</option>
            <option value="carpinteria">Carpinteria</option>
            <option value="clases particulares (secundaria)">Cuidado de personas</option>
            <option value="clases particulares (primaria)">Maestra integradora</option>
            <option value="modista">Modista</option>
          </select>
       
        </div>
       <div  className='sub-div-select'>
       <label> Zona: </label>
          <select value={selectedZona} onChange={handleZonaChange}>
            <option value="">Todas</option>
            <option value="Paseo Rivera Shopping">Paseo Rivera Shopping</option>
            <option value="Shopping Nuevo Centro">Shopping Nuevo Centro</option>
            <option value="Cordoba Shopping">Cordoba Shopping</option>
            <option value='Dinosaurio Mall Ruta20'>Dinosaurio Mall Ruta20</option>
            <option value='Patio Olmos'>Patio Olmos</option>
          </select>
       </div>
    <Link  to='/userLocation' className='link-search-users'>Buscar usuario por cercanía</Link>
      </div>

     
      <div className="slider-container-users-cards">
      <p className='p-alert-slider'>Desliza para encontrar usuarios</p>
        <div className='slider-cards'>
        {users
          .filter(
            (user) =>
              user._id !== actualUserId &&
              (!selectedOficio || user.oficio === selectedOficio) &&
              (!selectedZona || user.zona === selectedZona)
          )
          .map((user) => (
            <UsersTradesCards
              key={user._id}
              img={user.imgProfile}
              id={user._id}
              email={user.email}
              first_name={user.first_name}
              last_name={user.last_name}
              alias={user.alias}
              oficio={user.oficio}
              zona={user.zona}
              comentarios={user.comentarios}
              recomendaciones={user. recomendaciones}
            />
          ))}
        </div>
        
      </div>
  </div>
    </>
  );
};

export default UsersTrades;

