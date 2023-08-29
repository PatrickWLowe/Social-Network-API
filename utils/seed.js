const connection = require("../config/connection");
const { Thoughts, User } = require("../models");
const getRandomName = require("./data");

console.log(getRandomName());
connection.on("error", (err) => err);

connection.once("open", async () => {
  // Delete the collections if they exist
  let postCheck = await connection.db
    .listCollections({ name: "Thoughts" })
    .toArray();
  if (postCheck.length) {
    await connection.dropCollection("Thoughts");
  }

  let userCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("users");
  }

  const users = [];

  for (let i = 0; i < 20; i++) {
    const username = getRandomName();

    users.push({
      username,
    });
  }

  await User.collection.insertMany(users);
  console.log(users);
  process.exit(0);
});
