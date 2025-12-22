const express = require("express");
const {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require("../controllers/users.controller");

const router = express.Router();

router.get("/", listUsers);        // list + limit/offset + search
router.get("/:id", getUser);       // details
router.post("/", createUser);      // create
router.put("/:id", updateUser);    // update
router.delete("/:id", deleteUser); // delete

module.exports = router;
