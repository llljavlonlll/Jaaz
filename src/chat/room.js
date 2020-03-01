class Room {
    constructor(name, users) {
        this.name = name;
        this.users = users;
    }

    usersInRoom() {
        return this.users;
    }

    addUser(category) {
        this.users.push(category);
    }

    removeUser(category) {
        this.users.filter(user => user !== category);
    }
}

module.exports = Room;
