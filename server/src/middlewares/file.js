import multer from "multer";

const storageLocal = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "uploads/");
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const storage = multer.memoryStorage({});
// const storageLocal = multer.diskStorage({
//   destination: (_req, _file, cb) => {
//     cb(null, "uploads/");
//   },
// });

export const upload = multer({ storage });
export const store = multer({ storage: storageLocal });
