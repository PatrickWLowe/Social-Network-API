const { Thoughts, User } = require("../models");

module.exports = {
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getThoughtById({ params }, res) {
    try {
      const thoughtById = await Thoughts.findOne({ _id: params.id });
      res.status(200).json(thoughtById);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  async createThought({ body }, res) {
    try {
      const newThought = await Thoughts.create(body);
      res.status(200).json(newThought);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  async updateThought({ params, body }, res) {
    try {
      const updatedThought = await Thoughts.findOneAndUpdate(
        { _id: params.id },
        body,
        { new: true }
      );
      res.status(200).json(updatedThought);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  async deleteThought({ params }, res) {
    try {
      const deletedThought = await Thoughts.findOneAndDelete({
        _id: params.id,
      });
      res.status(200).json(deletedThought);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  async addReaction({ params, body }, res) {
    try {
      const updatedThought = await Thoughts.findOneAndUpdate(
        { _id: params.id },
        { $push: { reactions: body } },
        { new: true }
      );
      res.status(200).json(updatedThought);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  async deleteReaction({ params }, res) {
    try {
      const updatedThought = await Thoughts.findOneAndUpdate(
        { _id: params.id },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
      );
      res.status(200).json(updatedThought);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
