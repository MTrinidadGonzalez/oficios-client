import { useForm } from 'react-hook-form';
import UserService from '../../services/user.service';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [loginError, setLoginError] = useState(null);

  const getUserLocation = async () => {
    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        const location = {
          latitude: latitude,
          longitude: longitude,
        };

        const userService = new UserService();
        const sendLocation = await userService.changeUserLocation(location);
      } catch (error) {
        console.error("Error obteniendo la ubicación:", error.message);
      }
    } else {
      console.error("La geolocalización no está soportada por el navegador.");
    }
  };

  const askForLocationPermission = () => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        getUserLocation();
      } else {
        console.error("Permiso de geolocalización denegado.");
      }
    });
  };

  const onSubmit = async (data) => {
    const user = {
      email: data.email,
      password: data.password,
    };
    const userService = new UserService();
    const response = await userService.loginUser(user);
    const result = response.data.status;
    if (result === "success") {
      askForLocationPermission();
      navigate("/home");
    }
    if (result === "error") {
      setLoginError(response.data.error);
    }
  };

  return (
    <>
      <div className='container-background-img'>
        <div className='forms-background-parrallax'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='sub-divs-forms'>
              <input
                type="text"
                placeholder='correo@...'
                {...register('email', { required: true })}
                className='inputs'
              />
              <input
                type="password"
                placeholder="Contraseña"
                {...register('password', { required: true })}
                className='inputs'
              />
              <input type="submit" value='Entrar' className='btns' />
            </div>
            {loginError && <span className="error-login">{loginError}</span>}
            <div className='sub-divs-forms'>
              <Link to='/restorePassword' className='btns-links'>
                ¿Olvidaste tu contraseña?{" "}
              </Link>
            </div>
          </form>
       
        </div>

        <div className='div-img-login'></div>
      </div>
    </>
  );
};

export default Login;
