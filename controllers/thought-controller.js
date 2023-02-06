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
}