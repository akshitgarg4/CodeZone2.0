const express = require("express");
const router = express.Router();
const data = require("../controllers/data")
const auth = require("../config/authenticate")

router.post('/new_upload', auth.authenticateToken, data.save);
router.get('/past_uploads', auth.authenticateToken, data.fetch);
router.delete('/delete/:record_id', auth.authenticateToken, data.delete);

module.exports = router;