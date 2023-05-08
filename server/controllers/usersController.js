const User = require('../models/Users');

module.exports = {
  getUser: async (req, res) => {
    const user = await User.findOne({ email: req.params.id });

    if (user) {
      res.json(user);
      console.log(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
    // User.findOne({ email: req.params.id }, (err, data) => {
    //   if (!err) {
    //     res.json(data);
    //   } else {
    //     res.status(404).json({ message: 'User not found', error: err.message });
    //   }
    // });
  },
  createUser: async (req, res) => {
    const user = await User.find({ email: req.body.email });

    if (user.length > 0) {
      await User.findOneAndUpdate(
        { email: req.body.email },
        {
          email: req.body.email,
          randori: req.body.randori,
          uchikomi: req.body.uchikomi,
          threePerson: req.body.threePerson,
          waterBreak: req.body.waterBreak,
        }
      )
        .then((data) => res.json({ message: 'User updated', data }))
        .catch((error) => console.log(error));
    } else {
      const newUser = new User({
        email: req.body.email,
        randori: req.body.randori,
        uchikomi: req.body.uchikomi,
        threePerson: req.body.threePerson,
        waterBreak: req.body.waterBreak,
      });

      await newUser
        .save()
        .then((data) => res.json({ message: 'User added', data }))
        .catch((error) => console.log(error));
    }
  },
};
