const { User } = require('../models');

const UserController = {
  async getAllUsers(req, res) {
    try {
      const userData = await User.find({});
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getUserById(req, res) {
    try {
      const userData = await User.findById(req.params.userId);
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUserById(req, res) {
    try {
      const userData = await User.findOneAndUpdate(req.params.id, req.body, { new: true });
      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteUserById(req, res) {
    try {
      const userData = await User.findOneAndDelete(req.params.id);
      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body.friendId || req.params.friendId } },
        { new: true }
      );
      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async removeFriend({ params }, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true }
      );
      if (!dbUserData) {
        return res.status(404).json({ message: "No user with this id!" });
      }
      const removed = !dbUserData.friends.includes(params.friendId);
      if (removed) {
        res.json({ message: "Friend removed successfully!", dbUserData });
      } else {
        res.json(dbUserData);
      }
    } catch (err) {
      res.status(400).json(err);
    }
  },
};

module.exports = UserController;