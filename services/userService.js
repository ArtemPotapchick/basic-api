import {users} from "../data/users.js";

const getAllUsers = () => users;

const getUserById = id => {
    const user = users.find(user => user.id === +id)
    if(!user) throw {status: 404, message: `User with id - ${id} has not found`, id}
    return user;
}

const addUser = (name) =>{
    if(!name) throw {status: 400, message: `field 'name' is required `}
    const newUser = {id: users.length+1, name: name};
    users.push(newUser)
    return newUser
}

const updateUser = (id, name) =>{
    const user = getUserById(id);
    user.name = name;
    return user;
}

const deleteUser = (id) =>{
    const user = getUserById(id);
    users.splice(users.indexOf(user), 1);
}

export  default {getAllUsers,getUserById,addUser,updateUser,deleteUser}