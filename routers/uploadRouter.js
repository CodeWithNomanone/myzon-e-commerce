import express from 'express';
import multer from 'multer';
import { isAuth } from '../utils.js';
import path from 'path';

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded' });
    }
    // Return a relative URL
    res.send({ path: `/uploads/${req.file.filename}` });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'File upload failed', error: error.toString() });
  }
});

export default uploadRouter;

//2nd
// import path from 'path';
// import multer from 'multer';
// import express from 'express';
// import { isAuth } from '../utils.js';

// const uploadRouter = express.Router();
// const __dirname = path.resolve(); // Ensure __dirname is set correctly

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, path.join(__dirname, 'uploads')); // Use path.join for cross-platform compatibility
//   },
//   filename(req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

// uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
//   try {
//     console.log(req.file);
//     if (!req.file) {
//       return res.status(400).send({ message: 'No file uploaded' });
//     }
//     res.send(`/${req.file.path}`);
//   } catch (error) {
//     console.error('File upload error:', error);
//     res
//       .status(500)
//       .send({ message: 'File upload failed', error: error.toString() });
//   }
// });

// export default uploadRouter;

// import multer from 'multer';
// import express from 'express';
// import { isAuth } from '../utils.js';

// const uploadRouter = express.Router();

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, path.join(__dirname, 'uploads/')); // Use path.join for cross-platform compatibility
//   },
//   filename(req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

// uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send({ message: 'No file uploaded' });
//   }
//   res.send(`/${req.file.path}`);
// });
// // uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
// //   console.log(req.file);
// //   res.send(`/${req.file.path}`);
// // });

// export default uploadRouter;
