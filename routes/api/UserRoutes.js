const router = require("express").Router();
const {
  getUsers,
  GetSingleUser,
  CreateUser,
  UpdateUser,
  DeleteUser,
  Addfriend,
  DeleteFriend,
} = require("../../controllers/usercon.js");

// /api/users
router.route("/").get(getUsers).post(CreateUser);

// /api/users/:id
router.route("/:id").get(GetSingleUser).put(UpdateUser).delete(DeleteUser);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(Addfriend).delete(DeleteFriend);

module.exports = router;
