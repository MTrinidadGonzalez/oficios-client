import {Link} from 'react-router-dom'
import PresentationText from '../PresentationText/PresentationText'
import PresentationImg from '../PresentationImg/PresentationImg'

const Inicio = () => {
    return ( <>
    <PresentationImg/>
    <div className='container-inicio'> 
   
    <nav className='nav-inicio' >
        <Link to='/register' className='nav-inicio-item'>REGISTRARME</Link>
        <Link to='/login' className='nav-inicio-item'>YA ESTOY REGISTRADO</Link>
    </nav>

</div>
    </> );
}
 
export default Inicio;

