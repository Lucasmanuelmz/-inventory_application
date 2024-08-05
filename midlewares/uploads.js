const multer = require('multer');
const crypto = require('crypto')
const imageStorage = multer.diskStorage({destination: (req, file, done) => {
  done(null,'uploads');
},
filename: (req, file, done) => {
  const extentionFile = file.originalname.split('.').pop();
  const newNameFile = crypto.randomBytes(8).toString('hex')
  done(null, `${newNameFile}.${extentionFile}`)
}})

module.exports = imageStorage;