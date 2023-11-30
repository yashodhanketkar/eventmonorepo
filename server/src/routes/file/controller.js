import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebase.js";

export class FileController {
  upload = async (req, res) => {
    try {
      const file = ref(
        storage,
        `uploads/${Date.now()}-${req.file.originalname}`
      );
      const firestoreURL = await uploadBytes(file, req.file.buffer).then(
        async (snapshot) => {
          return await getDownloadURL(snapshot.ref).then((url) => {
            return url;
          });
        }
      );
      return res.status(201).json({ url: firestoreURL }).send();
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  };
  store = async (req, res) => {
    try {
      return res
        .status(201)
        .json({
          url: `/uploads/${req.file.filename}`,
        })
        .send();
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  };
}
