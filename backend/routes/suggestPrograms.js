const express = require('express');
const upload = require('../db/multer');
const router = express.Router();

const suggestProgramsHandler = require('../handlers/suggestedPrograms');

router.get('/:id', async (req, res) => {
  const student_id = req.params.id;
  try {
    const results = await suggestProgramsHandler.getPrograms(student_id);
    if (results.rowCount <= 0) {
      return res.status(404).send({ error: 'No File!' });
    }
    res.status(200).send({ programFile: results.rows[0] });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post('/', upload.single('file'), async (req, res) => {
  const { student_id, filename, fileurl } = req.body;

  try {
    const { rowCount } = await suggestProgramsHandler.getPrograms(student_id);
    if (rowCount > 0) {
      await suggestProgramsHandler.updateProgram(student_id, filename, fileurl);
    } else {
      await suggestProgramsHandler.addProgram(student_id, filename, fileurl);
    }

    res.status(202).send({ message: 'File Uploaded!' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
