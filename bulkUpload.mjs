// import fs from 'fs';
// import path from 'path';
// import dotenv from 'dotenv';
// import { uploadImage } from './utils.js';

// dotenv.config();

// // Function to read files from a directory
// const readFiles = (dir) => {
//   return fs.readdirSync(dir).map((file) => path.join(dir, file));
// };

// // Function to bulk upload images
// const bulkUploadImages = async (dir) => {
//   try {
//     const filePaths = readFiles(dir);
//     const uploadPromises = filePaths.map((filePath) => uploadImage(filePath));
//     const results = await Promise.all(uploadPromises);
//     return results;
//   } catch (error) {
//     throw new Error(`Failed to upload images: ${error.message}`);
//   }
// };
// // Path images directory
// const imagesDir = 'D:/myzon React web react/backend/frontend/public/images'; // Adjust actual directory structure

// // Start bulk upload
// bulkUploadImages(imagesDir)
//   .then((results) => {
//     console.log('Bulk upload completed.');
//     results.forEach((result) => {
//       if (result) {
//         console.log(`Uploaded to: ${result.secure_url}`);
//       }
//     });
//   })
//   .catch((error) => {
//     console.error('Bulk upload failed:', error.message);
//   });
