const { Schema, model, Types } = require("mongoose");
const dayjs = require("dayjs");

function displayTime(time) {
  dayjs(time).format("MMM DD, YYYY [at] hh:mm:ss a");
}

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: "Please enter your username",
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: "Please enter your email",
      match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: displayTime,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thoughts",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;
