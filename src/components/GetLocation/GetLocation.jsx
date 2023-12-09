import React, { useState, useEffect, useContext } from "react";
import UserService from "../../services/user.service";
import { UsersContext } from "../../context/UsersContext";
import GetAndCreateChat from '../GetAndCreateChat/GetAndCreateChat';
import { Link } from "react-router-dom";
import Addrecommendations from '../Addrecommendations/Addrecommendations';
import NavBar from '../NavBar/NavBar'

const GetLocation = () => {
  const { users } = useContext(UsersContext);
  const [selectedDistance, setSelectedDistance] = useState(null);
  const [longitudeUser, setLongitudeUser] = useState(null);
  const [latitudeUser, setLatitudeUser] = useState(null);
  const [usersDistances, setUsersDistances] = useState([]);
  const [selectedOficio, setSelectedOficio] = useState('');

  const getUserCords = async () => {
    try {
      const userService = new UserService();
      const getUserDb = await userService.getUserProfile();
      const response = getUserDb.data.payload;

      if (response.location && response.location.latitude && response.location.longitude) {
        setLongitudeUser(response.location.longitude);
        setLatitudeUser(response.location.latitude);
      } else {
        console.error("Ubicación del usuario no definida:", response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserCords();
  }, []);

  const deg2rad = (deg) => deg * (Math.PI / 180);

  const handleDistanceChange = (distance) => {
    setSelectedDistance(distance);
  };

  const getDistanceToUser = (user) => {
    if (user.location && user.location.latitude && user.location.longitude) {
      const earthRadius = 6371; 

      const dLat = deg2rad(user.location.latitude - latitudeUser);
      const dLon = deg2rad(user.location.longitude - longitudeUser);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(latitudeUser)) * Math.cos(deg2rad(user.location.latitude)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const distance = earthRadius * c; // Distancia pasada en kilómetros

      return distance;
    }
    return null;
  };

  const getUsersDistance = () => {
    const distances = users.map((user) => {
      const distance = getDistanceToUser(user);
      return { ...user, distance };
    });

    setUsersDistances(distances);
  };

  const handleOficioChange = (e) => {
    setSelectedOficio(e.target.value);
  };

  const filterUsers = () => {
   
    const filteredUsers = usersDistances.filter((user) => {
      const distanceCondition = selectedDistance ? user.distance <= selectedDistance : true;
      const oficioCondition = selectedOficio ? user.oficio === selectedOficio : true;
      return distanceCondition && oficioCondition;
    });

    return filteredUsers;
  };

  useEffect(() => {
    getUsersDistance();
  }, [latitudeUser, longitudeUser, users]); 

  return (
    <>
    <NavBar/>
  <div className="containers-generales">
  <div className="container-radiobtns-distance">
      <label>
            <input
              type="radio"
              name="distance"
              value="2"
              checked={selectedDistance === "2"}
              onChange={() => handleDistanceChange("2")}
            />
           Menos de 2km
          </label>
          <label>
            <input
              type="radio"
              name="distance"
              value="5"
              checked={selectedDistance === "5"}
              onChange={() => handleDistanceChange("5")}
            />
            Menos de 5km
          </label>
          <label>
            <input
              type="radio"
              name="distance"
              value="10"
              checked={selectedDistance === "10"}
              onChange={() => handleDistanceChange("10")}
            />
            Menos de 10km
          </label>
          <label>
            <input
              type="radio"
              name="distance"
              value="20"
              checked={selectedDistance === "20"}
              onChange={() => handleDistanceChange("20")}
            />
            Menos de 20km
          </label>
          <label>
            <input
              type="radio"
              name="distance"
              value="30"
              checked={selectedDistance === "30"}
              onChange={() => handleDistanceChange("30")}
            />
            Menos de 30km
          </label>
      </div>

      <div className="filter-container constainer-selects">
      <div className='sub-div-select' >
          <label>  Oficio: </label>
          <select value={selectedOficio} onChange={handleOficioChange}>
            <option value="">Todos</option>
          
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
      </div>

  </div>
    
      <div className='containers-generales'>
      <p className='p-alert-slider'>Desliza para encontrar usuarios</p>
        <div className="slider-container-users-cards">
          {filterUsers().length > 0 ? (
            <div className="slider-cards">
              {filterUsers().map((user) => (
                <div key={user._id} className="slider-card">
                  <p className='p-messages-generales' >Distancia: {user.distance} km</p>
                  <img src={user.imgProfile} alt="Imagen perfil de usuario"  loading='lazy' />
                  <p>{user.first_name} {user.last_name} </p>
                  <p>Alias: {user.alias} </p>
                  <p>Oficio: {user.oficio} </p>
                  <p>Zona: {user.zona} </p>
                  <p>Recomendaciones: {user.recomendaciones.length} </p>
                  <Addrecommendations  recommendedUserId={user._id} />
                  <Link to={`/userProfile/${user._id}`} className='btns' >Ver Perfil</Link>
                  <GetAndCreateChat opossiteOwner={user._id} />
                </div>
              ))}
            </div>
          ) : (
            <p className='p-messages-generales'>No se encontraron usuarios a esta distancia y oficio.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default GetLocation;
