import UserService from '../../services/user.service'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { useForm } from 'react-hook-form'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UpdateProfileImg = () => {
    const { register, handleSubmit } = useForm()
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        const userService = new UserService()
        const formData = new FormData();
        formData.append("imgProfile", data.imgProfile[0]); 
        
        try {
            const response = await userService.updateImgProfile(formData);
            const result = response.data;
            if (result.status === 'success') {
                //navigate('/profile')
                window.location.reload();
            } else if (result.status === 'error') {
                console.log(result);                
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div>
                <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
                    <input type="file" required={true} {...register("imgProfile")} />
                    <input type="submit" value="Reemplazar imagen" />
                </form>
            </div>
        </>
    );
}

export default UpdateProfileImg