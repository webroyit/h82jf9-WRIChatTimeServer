const users = [];

// helper functions
const addUser = ({ id, name, room }) => {
    // remove white space and make all the data lowercase
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // make sure the user is different
    const existingUser = users.find(user => user.room === room && user.name === name);

    if(existingUser){
        return { error: "Username already exist" };
    }

    const user = { id, name, room};

    // add the user to the chatroom
    users.push(user);

    return { user };
}

const removeUser = id => {
    const index = users.findIndex(user => user.id === id);

    if(index !== 1){
        // remove the user from the chatroom
        return users.splice(index, 1)[0];
    }
}

// find the user
const getUser = id => users.find(user => user.id === id);

// get all the user from that chatroom
const getUsersInRoom = room => users.filter(user => user.room === room);

module.exports = { addUser,  removeUser, getUser, getUsersInRoom };