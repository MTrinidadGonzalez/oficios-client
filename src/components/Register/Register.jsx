import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import UserService from '../../services/user.service';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('USER'); 
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value); 
  };

  const onSubmit = async (data) => {
    let oficioValue = data.oficio; 
    if (data.role === 'USER') {
      oficioValue = 'cliente'; 
    }
  
    const user = {
      first_name: data.first_name,
      last_name: data.last_name,
      alias: data.alias,
      email: data.email,
      password: data.password,
      role: data.role,
      oficio: oficioValue,
      zona: data.zona,
      description:data.description
    };
   
    const userService = new UserService();
    const response = await userService.createUser(user);
    const result = response.data;
    if (result.status === 'success') {
      reset();
      navigate('/login');
    }
    if (result.status === 'error') {
      if (result.error === 'Usuario ya registrado') {
        alert('Correo ya registrado');
      }
    }
  };

  return (
    <>
      <div className='container-forms'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Registrarme !</h2>
          <div className='sub-divs-forms'>
            <input type="text" placeholder="Nombre" required={true} {...register("first_name")} />
            <input type="text" placeholder="Apellido" required={true} {...register("last_name")} />
            <input type="text" placeholder="Alias" id="alias" {...register("alias")} required={true} />
            <input type="email" placeholder="correo@gmail.com" required={true} {...register("email")} />
            <input type="password" placeholder="Contraseña" required={true} {...register("password")} />
          </div>

          <div className='sub-divs-forms'>
            <label htmlFor="role">Soy:</label>
            <select id="role" {...register("role")} required={true} className='selects' onChange={handleRoleChange}>
              <option value="USER">BUSCO TRABAJADOR</option>
              <option value="TRABAJADOR">SOY TRABAJADOR</option>
            </select>
          </div>

          <div className='sub-divs-forms'>
            <label htmlFor="oficio">Oficio:</label>
            <select id="oficio" {...register("oficio")} required={true} className='selects' disabled={selectedRole === 'USER'}>
              <option value="">Selecciona un oficio</option>
              <option value="cliente">Albañilería</option>
              <option value="albañileria">Albañilería</option>
              <option value="carpinteria">Carpintería</option>
              <option value="jardineria">Jardinería</option>
              <option value="electricista">Electricista</option>
              <option value="gasista">Gasista</option>
              <option value="pintor/a">Pintor/a</option>
              <option value="montador/a de cristales y vidrios">Montador/a de cristales y vidrios</option>
              <option value="mecanico/a">Mecánico/a</option>
            <option value="chapista de vehiculos">Chapista de vehículos</option>
            <option value="limpieza doméstica">Limpieza doméstica</option>
            <option value="peluquero/a">Peluquero/a</option>
            <option value="maquillador/a">Maquillador/a</option>
            <option value="zapatero/a">Zapatero/a</option>
            <option value="enfermera a domicilio">Enfermera a domicilio</option>
            <option value="cuidado de personas">Cuidado de personas</option>
            <option value="maestra integradora">Maestra integradora</option>
            <option value="clases particulares (primaria)">Clases particulares escuela primaria</option>
            <option value="clases particulares (secundaria)">Clases particulares escuela secundária</option>
            <option value='carpinteria'>Carpintería</option>
            <option value="modista">Modista</option>

            </select>
          </div>

          <div className='sub-divs-forms'>
            <label htmlFor="zona">Zona:</label>
            <select id="zona" {...register("zona")} required={true} className='selects'>
              <option value="">Selecciona una zona</option>
              <option value="Paseo Rivera Shopping">Paseo Rivera Shopping (Argüello)</option>
              <option value="Shopping Nuevo Centro">Shopping Nuevo Centro (Doarte Quirós)</option>
              <option value="Cordoba Shopping">Córdoba Shopping (Villa cabrera)</option>
              <option value="Dinosaurio Mall Ruta20">Dinosaurio Mall Ruta 20 (Av. Fuerza Aéra)</option>
              <option value="Patio Olmos">Patio Olmos (Nueva Córdoba)</option>
            </select>
          </div>
          <div className='sub-divs-forms'>
         <label htmlFor="descipcion">Añade tu descipción:</label>
         <input id='descipcion' {...register("descripcion")} type="text" placeholder='Descripción...' />
          </div>

          <div className='sub-divs-forms'>
            <input type="submit" value='Registrar' className='btns' />
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;

