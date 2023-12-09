import UserService from '../../services/user.service'
import { useEffect } from 'react'

const Addrecommendations = ({recommendedUserId}) => {

   /* useEffect(()=>{
        console.log('recommendedUserId',recommendedUserId)
    },[])*/
 
    const addRecomendation=async()=>{
       
        const body={
            recommendedUserId:recommendedUserId
        }
        const userService= new UserService()
        const sendRecomendation= await userService.addRecommendationToUser(body)
        const response=sendRecomendation.data
        }


   return (<>
   <button  onClick={addRecomendation} className='btns-with-icons' >
    <p>Recomendar</p>
    <ion-icon name="heart-outline"></ion-icon>
   </button> 
    </> );
}
 
export default Addrecommendations;