const { Thought, User } = require('../models');


// Define the ThoughtController object, which contains methods for handling various API requests related to thoughts
const ThoughtController = {

  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getThoughtsById(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
      } else {
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findByIdAndUpdate(
        req.body.user_id,
        {$addToSet: {thoughts: thought._id}},
        {new: true}
    )
      res.status(201).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
      } else {
        res.status(200).json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateThoughtById(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
        new: true,
      });
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
      } else {
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createReaction(req, res) {
    const notFound = "Thought not found";
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      thought ? res.json(thought) : res.status(404).json({ message: notFound });
    } catch (e) {
      res.status(500).json(e);
    }
  },

  async deleteReaction(req, res) {
    const notFound = "Thought not found";
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      thought ? res.json(thought) : res.status(404).json({ message: notFound });
    } catch (e) {
      res.status(500).json(e);
    }
  },

};

// Export ThoughtController
module.exports = ThoughtController;