const { Schema, model, Types } = require("mongoose");
const dayjs = require("dayjs");

function displayTime() {
  dayjs().format("MMM DD, YYYY [at] hh:mm:ss a");
}

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: "Please enter your reaction",
      maxlength: 280,
    },
    username: {
      type: String,
      required: "Please enter your username",
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: displayTime(),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const ThoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "Please enter your thought",
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: displayTime(),
    },
    username: {
      type: String,
      required: "Please enter your username",
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

const Thoughts = model("Thoughts", ThoughtsSchema);

module.exports = Thoughts;
