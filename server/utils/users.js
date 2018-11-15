class Users {
  constructor() {
    this.users = [];
  }
  addUser(id, name, room) {
    const user = {
      id,
      room,
      name
    };

    this.users.push(user);
    return user;
  }
  removeUser(id) {
    var user = this.getUser(id);

    if (user) {
      this.users = this.users.filter(user => user.id !== id);
    }

    return user;
  }
  getUser(id) {
    return this.users.find(user => id === user.id);
  }
  getUserList(room) {
    const users = this.users.filter(user => {
      return user.room === room;
    });
    const namesArray = users.map(user => {
      return user.name;
    });

    return namesArray;
  }
}

module.exports = {
  Users
};
