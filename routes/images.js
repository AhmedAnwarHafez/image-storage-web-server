const express = require('express')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const db = require('../db')

const router = express.Router()

router.post('/', upload.single('image'), (req, res) => {
  const { originalname, mimetype, buffer } = req.file
  const file = {
    filename: originalname,
    mimetype,
    imageBase64: buffer.toString('base64'),
  }

  db.addImage(file)
    .then(([id]) => {
      res.json({ id: id })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ message: 'Cannot insert image in database' })
    })
})

module.exports = router
