const express = require('express');
const feedbackHandler = require('../handlers/feedback');
const { verifyStudents, verifyCounsellors } = require('../middleware/verify');

const router = express.Router();

/* Counsellor Feedback section */

router.post('/addCounsellorFeed',verifyCounsellors, async(req,res)=>{
	try {
		const {counsellor_id,student_id,performance,comments,status,start_date} = req.body;
		await feedbackHandler.addcounsellorfeedback(counsellor_id,student_id,performance,comments,status,start_date);
		
		res.status(200).send({message:"Feedback added successfully !"})
	} catch (err) {
		return res.status(404).send({error:err.message})
	}
})

router.patch('/updateCounsellorFeed',verifyCounsellors,async(req,res)=>{
	try {
		const {id,Performance,comments,status,start_date} = req.body;
		await feedbackHandler.updatecounsellorfeedback(id,Performance,comments,status,start_date);

		res.status(200).send({message:"Updated successfully !"})
	} catch (err) {
		return res.status(404).send({error:err.message})
	}
})

router.get('/counsellor/:counsellor_id',verifyCounsellors,async(req,res)=>{
	try {
		const {rowCount,rows} = await feedbackHandler.getcounsellorfeedback(req.params.counsellor_id);
		
		if (rowCount <= 0) {
			return res.status(404).json({ error: 'No feedbacks found!' });
		} else {
			res.status(200).json({ rowCount, rows: rows });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
})

router.get('/student/:counsellor_id',verifyCounsellors, async (req, res) => {

	try {
		const { rowCount, rows } = await feedbackHandler.getallfeedback(req.params.counsellor_id);

		if (rowCount <= 0) {
			return res.status(404).json({ error: 'No feedbacks found!' });
		} else {
			res.status(200).json({ rowCount, rows: rows });
		}
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

router.post('/student', verifyStudents, async (req, res) => {
	try {
		const { counsellor_id, rating, overall_experience, referal } = req.body;
		const student_id = req.user.id;

		await feedbackHandler.addStudentFeedback(student_id, counsellor_id, referal, rating, overall_experience);

		res.status(202).send({ message: 'Feedback added!' });
	} catch (err) {
		return res.status(500).send({ error: err.message });
	}
});

router.get('/counsellor', verifyStudents, async (req, res) => {
	try {
		const student_id = req.user.id;
		const { rows, rowCount } = await feedbackHandler.getCounsellorFeedback(student_id);
		res.status(200).send({ rows, rowCount });
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
});

module.exports = router;
