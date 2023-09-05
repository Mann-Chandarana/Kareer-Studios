const express = require('express');
const upload = require('../db/multer');
const router = express.Router();

const documentsHandler = require('../handlers/documents');

router.get('/:id', async (req, res) => {
  const student_id = req.params.id;
  try {
    const results = await documentsHandler.getDocuments(student_id);
    if (results.rowCount <= 0) {
      return res.status(404).send({ error: 'No File!' });
    }
    console.log({ programFile: results.rows[0] })
    res.status(200).send({ programFile: results.rows[0] });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post('/:id/:file_id', upload.single('file'), async (req, res) => {
  const { filename, fileurl } = req.body;

  const student_id = req.params.id;
  const file_id = req.params.file_id;

  console.log("hi");

  try {
    const { rowCount } = await documentsHandler.getDocuments(student_id);
    if (rowCount > 0) {
      await documentsHandler.updateDocument(student_id, filename, fileurl, file_id);
    } else {
      await documentsHandler.addDocument(student_id, filename, fileurl, file_id);
    }

    res.status(202).send({ message: 'File Uploaded!' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
