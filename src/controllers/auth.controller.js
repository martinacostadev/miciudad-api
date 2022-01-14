const bcrypt = require("bcrypt");

const User = require('../models/user.model');
const generateJWT = require('../middelwares/generateJWT');

class authController {
  async register(req, res) {
    try {
      const { name, email, password, role } = req.body;

      const user = new User({ name, email, password, role });

      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(password, salt);

      const newUser = await user.save();

      return res.status(200).json({
        message: "Registered user successfully",
        newUser,
      });

    } catch (error) {
      res.status(500).json({
        message: "Failed. Please try again.",
        error,
      });
    }
  }

  async login(req = Request, res = Response) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          message: "User and or password is incorrect: email",
        });
      }

      if (!user.state) {
        return res.status(400).json({
          message: "User and or password is incorrect - state: false",
        });
      }

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({
          message: "User and or password is incorrect: password",
        });
      }

      const token = await generateJWT(user.id);

      res.json({
        user,
        token,
      });
      
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Contact the administrator",
      });
    }
  }
}

module.exports = new authController();