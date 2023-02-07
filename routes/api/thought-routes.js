// code requires thought-controller file and exporting multiple functions
const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thought-controller');

// exporting different routes.
// GET request with getThoughts and post with createThought.
router.route('/').get(getThoughts).post(createThought);

// GET getSingleThoughtm PUT request updateThought and then DELETE deleteThought.
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// defining a route where it handles POST request.
router.route('/:thoughtId/reactions').post(addReaction);

// handling DELETE request.
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
