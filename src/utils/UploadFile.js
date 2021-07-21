import firebase from "../Firebase/Firebase";
const storage = firebase.storage().ref();

export const uploadFile = async (file, bucket) => {
  const { name } = file;
  const bucketRef = storage.child(bucket).child(name.split(".")[0]);
  try {
    let upload = await bucketRef.put(file);
    return await upload.ref.getDownloadURL();
  } catch (error) {
    return false;
  }
};
