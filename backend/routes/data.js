const express = require("express");
const router = express.Router();
const data = require("../controllers/data")
const auth = require("../config/authenticate")

router.post('/new_upload', auth.authenticateToken, data.save);
router.post('/add_evaluators/:record_id', auth.authenticateToken, data.addEvaluators);
router.get('/past_uploads', auth.authenticateToken, data.fetch);
router.delete('/delete_record/:record_id', auth.authenticateToken, data.delete);
router.get('/send_email_to_mentors/:record_id', auth.authenticateToken, data.sendLinkMentors);
router.get('/evaluators_list', auth.authenticateToken, data.fetchEvaluatorsList);
router.post('/send_email_to_evaluators/:record_id', auth.authenticateToken, data.sendLinkEvaluators);
router.get('/existing_marks/:record_id', auth.authenticateToken, data.fetchStudentMarks);
router.get('/mentor/marksFetch/:record_id', auth.authenticateToken, data.fetchStudentMarksMentor);
router.post('/mentor/marksSave/:group_id', auth.authenticateToken, data.saveStudentMarksMentor);
router.get('/evaluator/marksFetch/:record_id', auth.authenticateToken, data.fetchAllStudentsEvaluator);
router.get('/evaluator/record_number/:record_id/group_number/:groupNumber', auth.authenticateToken, data.fetchGroupEvaluator);
router.post('/evaluator/marksSave/:group_id/:record_id', auth.authenticateToken, data.saveStudentMarksEvaluator);

module.exports = router;