const User = require('../models/Timers');

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
    const user = new User({
      email: req.body.email,
    });

    await user
      .save()
      .then((data) => res.json({ message: 'User added', data }))
      .catch((error) => console.log(error));
  },
};
