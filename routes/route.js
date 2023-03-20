const router = require("express").Router();
const user = require("../controllers/userController");


const auth = require("../Auth/auth");

router.post("/signup", user.Register);
router.post("/signin", user.Login);
router.get("/getUser",auth.Authenticate, user.getUser);
module.exports = router;
