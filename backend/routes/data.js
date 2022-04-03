const express = require("express");
const router = express.Router();
const data = require("../controllers/data")
const auth = require("../config/authenticate")

router.post('/add', auth.authenticateToken, data.save);
router.get('/past_uploads', auth.authenticateToken, data.fetch);

module.exports = router;