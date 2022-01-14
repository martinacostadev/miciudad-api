const bcrypt = require('bcrypt');
const User = require('../models/user.model');

module.exports = class UserService {
  userFiltered = (user) => {
    const { id, password, $__, ...rest } = user;
    return { ...rest };
  };

  async userUpdate(id, password, rest) {
    try {
      if (password) {
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync(password, salt);
      }

      const user = await User.findByIdAndUpdate(id, rest);
      const userUpdate = this.userFiltered(user);
      return userUpdate;
      
    } catch (error) {
      throw Error("Failed to update User...");
    }
  }

  async userDelete(id) {
    try {
      const user = await User.findByIdAndUpdate(id, { state: false });
      const userDeleted = this.userFiltered(user);
      return userDeleted;

    } catch (error) {
      throw Error("Failed to delete User...");
    }
  }

  async userGet(id) {
    try {
      const user = await User.findById(id);
      const userFiltered = this.userFiltered(user);

      return userFiltered;

    } catch (error) {
      throw Error("Failed to get User...");
    }
  }
}