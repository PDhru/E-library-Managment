const multer = require('multer');

// Define storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');  // Specify the directory to store images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);  // Generate unique filename
  }
});

// File validation to ensure only images are uploaded
const fileFilter = (req, file, cb) => {
  // Only accept image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Images Only!'), false);  // Reject files that are not images
  }
};

// Set up multer upload middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,  // Apply the file validation
});

module.exports = upload;
