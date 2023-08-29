const { Schema, model, Types } = require("mongoose");
const dayjs = require("dayjs");

function DisplayTime(time) {
  dayjs(time).format("MMM DD, YYYY [at] hh:mm:ss a");
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
      get: DisplayTime,
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
      get: DisplayTime,
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

ThoughtsSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thoughts = model("Thoughts", ThoughtsSchema);

module.exports = Thoughts;
