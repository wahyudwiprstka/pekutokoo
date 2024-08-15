import { storage } from "@/app/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const uploadImage = async (image, folder, post) => {
  let imageUrl = "";
  const fileName = image.name.split(".").slice(0, -1).join(".");
  const extension = image.name.split(".").slice(1, 2).join(".");
  const imageRef = ref(
    storage,
    `${folder}/${fileName + "_" + v4() + "." + extension}`
  );
  uploadBytes(imageRef, image).then((snapshot) => {
    // alert("Image uploaded successfully");
    getDownloadURL(snapshot.ref).then((url) => {
      console.log("You can download the image at: " + url);
      imageUrl = url;
      post(imageUrl);
    });
  });
};
