const express = require("express");
const router = express.Router();
const toDo = require("../controllers/toDo")

router.post('/add', toDo.add);
router.get('/delete', toDo.delete);
router.get('/complete', toDo.complete);


module.exports = router;