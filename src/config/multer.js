const multer = require('multer');
const path = require('path');
const fs = require('fs');
const config = require('./env');

// Ensure upload directory exists
const uploadDir = config.UPLOAD_DIR || './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fileType = req.body.type || 'general';
    const dest = path.join(uploadDir, fileType);
    
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept all file types for now - can be customized
  cb(null, true);
};

const upload = multer({
  storage,
  limits: {
    fileSize: config.UPLOAD_MAX_SIZE || 10 * 1024 * 1024 // 10MB default
  },
  fileFilter
});

module.exports = upload;
