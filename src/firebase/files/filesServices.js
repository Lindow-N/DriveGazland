import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const storage = getStorage();
const firestore = db;

export const uploadFile = async (file, type, tags, user, onProgress) => {
  if (!file || !file.name) {
    throw new Error("Le fichier est invalide ou manquant.");
  }

  const filePath = `${type === "image" ? "images" : "videos"}/${
    file.name
  }_${Date.now()}`;
  const storageRef = ref(storage, filePath);

  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        if (onProgress) {
          onProgress(progress);
        }
      },
      (error) => {
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        const docRef = await addDoc(collection(firestore, "files"), {
          name: file.name,
          url: downloadURL,
          type: type,
          tags: tags,
          addBy: user.id,
          createdAt: new Date(),
        });

        resolve(downloadURL);
      }
    );
  });
};
