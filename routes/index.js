const router = require("express").Router();
const APIRoutes = require("./api/ThoughtsRoutes");

router.use("./api", APIRoutes);

router.use((req, res) => {
  res.status(404).send("<h1>😝 404 Error!</h1>");
});

module.exports = router;
