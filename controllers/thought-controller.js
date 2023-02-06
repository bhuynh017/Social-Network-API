// destructuring two models: 
// extracting Thought and User from the exported models folder.
const { Thought, User } = require('../models');

// gathering all thoughts
const thoughtController = {
    // retrieving info from the Thought and using the find() method from Mongoose.
    getThoughts(req, res) {
      Thought.find()
      // sorted in descending order
        .sort({ createdAt: -1 })
        .then((dbThoughtData) => {
            // returning data in JSON format.
          res.json(dbThoughtData);
        })
        // showing an error.
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },

    // getting a single thought by the ID.
    // defining a method called getSingleThought.
    getSingleThought(req, res) {
        // requesting for a document from the Thought.js
        Thought.findOne({ _id: req.params.thoughtId })
          .then((dbThoughtData) => {
            if (!dbThoughtData) {
              return res.status(404).json({ message: 'There was no thought with this id!' });
            }
            res.json(dbThoughtData);
          })
          // returning an error if occurs.
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

      // creating a thought
      createThought(req, res) {
        // creating a new Thought with the data from the request.
        Thought.create(req.body)
          .then((dbThoughtData) => {
            // when successful then the created Thought id is added to the user thought id.
            return User.findOneAndUpdate(
              { _id: req.body.userId },
              { $push: { thoughts: dbThoughtData._id } },
              { new: true }
            );
          })
          // if there is no data then it returns a 404 with the provided message.
          .then((dbUserData) => {
            if (!dbUserData) {
              return res.status(404).json({ message: 'The thought was created but there is no user with the id.' });
            }
    
            // if there is data then the message provided is displayed. 
            res.json({ message: 'The thought was created.' });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

      // updating a thought.
      updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
          .then((dbThoughtData) => {
            if (!dbThoughtData) {
              return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(dbThoughtData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
}