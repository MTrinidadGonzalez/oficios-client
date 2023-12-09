import {Link} from 'react-router-dom'
import PresentationText from '../PresentationText/PresentationText'

const Inicio = () => {
    return ( <>
    <div className='container-inicio'> 
    <h1 className='inicio-title'>OFICIOS</h1>
    <PresentationText/>
    <nav className='nav-inicio' >
        <Link to='/register' className='nav-inicio-item'>REGISTRARME</Link>
        <Link to='/login' className='nav-inicio-item'>YA ESTOY REGISTRADO</Link>
    </nav>

</div>
    </> );
}
 
export default Inicio;
