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
      res.json(id)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ message: 'Cannot insert image in database' })
    })
})

router.get('/:fileName', (req, res) => {
  const fileName = req.params.fileName
  db.getImageById(fileName)
    .then((record) => {
      if (!record) {
        res.sendStatus(404)
      }

      const img = Buffer.from(record.imageBase64, 'base64')
      res.writeHead(200, {
        'Content-Type': record.mimetype,
        'Content-Length': img.length,
      })

      res.end(img)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ message: 'Cannot retrieve image from database' })
    })
})

module.exports = router
