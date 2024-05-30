import React, { useState } from "react";
import "./Creater.scss";

import { Backdrop, Modal } from "@mui/material";

export default function Creater({ openModal, setOpenModal }) {
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [last, setLast] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file)
    }
  };

  const handleFileUpload = async () => {
    if (!image) {
      console.error('No image selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await fetch(
        'https://admin.dennic.uz/v1/file-upload?bucketName=user',
        {
          method: 'POST',
          body: formData,
        }
      );
      if (response.ok) {
        console.log('Image uploaded successfully');
      } else {
        console.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const CreateUser = (e) => {
    e.preventDefault();
    const newUser = { data, name, gender, last, password, phone };
    handleFileUpload();

    console.log(newUser);
    fetch("https://admin.dennic.uz/v1/user/create", {
      method: "POST",
      body: JSON.stringify({
        birth_date: data,
        first_name: name,
        gender: gender,
        last_name: last,
        password: password,
        phone_number: `+` + phone,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.access_token) {
          setTimeout(() => {
            setOpenModal(false);
          }, 2000);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Modal
        className="modal"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <form onSubmit={CreateUser}>
          <h2 className="subtitle">Add A New User</h2>
          <input
            placeholder="Date.."
            value={data}
            onChange={(e) => setData(e.target.value)}
            type="date"
          />
          <input
            placeholder="First Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
          <select onChange={(e) => setGender(e.target.value)}>
            <option disabled selected>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input
            value={last}
            placeholder="Last Name"
            onChange={(e) => setLast(e.target.value)}
            type="text"
          />
          <input
            placeholder="Passsword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <input
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="number"
          />
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Create</button>
        </form>
      </Modal>
    </div>
  );
}
