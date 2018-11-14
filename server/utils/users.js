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
}

module.exports = {
  Users
};
