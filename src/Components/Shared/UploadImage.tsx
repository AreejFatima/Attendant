/* eslint-disable jsx-a11y/label-has-associated-control */

import { IconButton, Avatar } from "@mui/material";
import { useState } from "react";
import { empType } from "../../Adapter/types";

interface propType {
  onUpload: (image: string) => void;
  activeUser: empType;
}
const UploadImage = (props: propType): JSX.Element => {
  const { onUpload, activeUser } = props;
  const [baseImage, setBaseImage] = useState(activeUser.profilePic);

  async function uploadImage(e) {
    const file = e.target.files[0];
    const base64: any = await convertBase64(file);
    setBaseImage(base64);
    onUpload(base64);
  }

  const convertBase64 = (file) =>
    new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

  return (
    <div className="App">
      <input
        type="file"
        onChange={(e) => {
          uploadImage(e);
        }}
        id="upload"
        accept="image/*"
        style={{ display: "none" }}
      />
      <label htmlFor="upload">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <Avatar
            className="avatar"
            src={baseImage}
            style={{
              width: "150px",
              height: "150px",
              marginTop: "10%",
              marginLeft: "13%",
              border: "4px solid #04aa6d",
            }}
          />
        </IconButton>
      </label>
      <label htmlFor="avatar" />
    </div>
  );
};

export default UploadImage;
