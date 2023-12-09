import {Link} from 'react-router-dom'
import GetAndCreateChat from '../GetAndCreateChat/GetAndCreateChat'
import Addrecommendations from '../Addrecommendations/Addrecommendations';

const UsersTradesCards = ({id,first_name,last_name,alias,zona, img,oficio, recomendaciones,email}) => {
    return ( <>
     <div className="slider-card" >
        <div className="slider-card-container-img">
        <img src={img} alt="Imagen perfil de usuario"  loading='lazy' />
        </div>
        <p>{first_name} {last_name} </p>
        <p>Alias: {alias} </p>
        <p>Oficio: {oficio} </p>
        <p>Zona: {zona} </p>
        <p>Recomendaciones: {recomendaciones.length} </p>
        <GetAndCreateChat opossiteOwner={id} />
        <Addrecommendations  recommendedUserId={id} />
        <Link to={`/userProfile/${id}`} className='btns' >Ver Perfil</Link>
       
    </div>
    </> );
}
 
export default UsersTradesCards;