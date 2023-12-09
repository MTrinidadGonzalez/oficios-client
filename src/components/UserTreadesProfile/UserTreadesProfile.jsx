import { useParams } from 'react-router-dom';
import UserService from '../../services/user.service';
import { useState, useEffect } from 'react';
import UserTradesProfileCard from '../UserTradesProfileCard/UserTradesProfileCard'
import NavBar from '../NavBar/NavBar'


const UserTradesProfile = ({socket}) => {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const getUser = async () => {
      try {
        const userService = new UserService();
        const response = await userService.getUserById(userId);
        setUserData(response.data.payload);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    socket.on('changeUserInfo', (data) => {
      if(data){
        setUserData(data);
      }
    });
  
    useEffect(() => {
      getUser();
    }, []);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
  
  
    return (
      <>
      <NavBar/>
      <div className='containers-generales'>
      <UserTradesProfileCard user={userData} /> 
      </div>
       
      </>
    );
  };
  
  export default UserTradesProfile;

