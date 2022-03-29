const express = require("express");
const router = express.Router();
const toDo = require("../controllers/toDo")

router.post('/add', toDo.add);
router.delete('/delete/:task_id', toDo.delete);
router.get('/complete/:task_id', toDo.complete);


module.exports = router;