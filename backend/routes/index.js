const express = require("express");
const router = express.Router();
const homeAPI = require("../controllers/home");
const googleLogin = require("../controllers/googleLogin");

router.get('/', homeAPI.home);
router.post('/googleLogIn', googleLogin.login);
router.use('/toDo', require("./toDo"));
router.use('/data', require("./data"));


module.exports = router;