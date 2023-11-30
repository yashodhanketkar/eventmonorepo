import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { firebaseConfig } from "../secrets/firebaseConfig.js";

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app, "gs://eshopebrand.appspot.com");
