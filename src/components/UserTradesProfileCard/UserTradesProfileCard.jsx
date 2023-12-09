import AddCommentToUser from '../AddCommentToUser/AddCommentToUser'
import  GetAndCreateChat from '../GetAndCreateChat/GetAndCreateChat'

const UserTradesProfileCard = ({ user }) => {
    return (
        <>
            <div className="user-profile-card">
                <div className="user-card-imgContainer" key={user._id}>
                    <img src={user.imgProfile} alt={`${user.first_name} ${user.last_name}`} className="user-profile-card-img" />
                </div>
                <h3>{`${user.first_name} ${user.last_name}`}</h3>
                <p>Descripción: {user.description}</p>
                <p>Alias: {user.alias}</p>
                <p>Zona: {user.zona} </p>
                <p>Oficio: {user.oficio} </p>
                <div className='user-trades-profile-card-comments'>
                    <h2>Comentarios a este usuario:</h2>
                {user.comentarios.length > 0 ? (
                    user.comentarios.map((comment, index) => (
                        <p key={index} className='comment-item' >{comment.comment.ownerName}: {comment.comment.content}</p>
                    ))
                ) : (
                    <p>No hay comentarios de este usuario aún</p>
                )}
                </div>
                
                <AddCommentToUser user={user} />
                < GetAndCreateChat opossiteOwner={user._id}/>
            </div>
        </>
    );
};

export default UserTradesProfileCard;
