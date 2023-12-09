const UsersCards = ({user}) => {
    return ( <>
    <div className="cards">
        <p>{user.first_name} {user.last_name}</p>
        <p>Alias: {user.alias} </p>
        <p> {user.oficio}</p>
        
    </div>
    </> );
}
 
export default UsersCar