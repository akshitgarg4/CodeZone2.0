const express = require("express");
const router = express.Router();
const toDo = require("../controllers/toDo")
const auth = require("../config/authenticate")

router.post('/add', auth.authenticateToken, toDo.add);
router.delete('/delete/:task_id', auth.authenticateToken, toDo.delete);
router.patch('/complete/:task_id', auth.authenticateToken, toDo.complete);
router.patch('/update/:task_id', auth.authenticateToken, toDo.update);

router.get('/', toDo.getAllTasks)


module.exports = router;