const { User, Thought } = require('../models');

// getting all users
const userController = {
    // Retrieving info from user db
    getUsers(req, res) {
      User.find()
      // select method is used to exclude the selected property from the data.
        .select('-__v')
        .then((dbUserData) => {
          res.json(dbUserData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },

      // get single user by id
  getSingleUser(req, res) {
    // retrieving info from the user db
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      // retrieving the relative data of friends and thoughts
      .populate('friends')
      .populate('thoughts')
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'There is no one with this ID!' });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  
}