const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Directory where files will be uploaded
const uploadDir = path.join(__dirname, '..', '..', 'uploads'); // Move up two levels from current directory

// Function to create the upload directory if it doesn't exist
const ensureUploadDirExists = () => {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
};

// Call the function to ensure the upload directory exists
ensureUploadDirExists();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadDir); // Use the uploadDir variable
  },
  filename: function(req, file, cb) {
    // Use a safe version of the original file name
    const safeFileName = file.originalname.replace(/[^a-zA-Z0-9.]/g, "_");
    // Append the current timestamp and the file extension
    cb(null, safeFileName + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }).array('document', 10); // Allow up to 10 files

module.exports = upload;
