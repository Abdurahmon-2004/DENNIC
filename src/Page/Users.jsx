import React, { useState, useEffect } from "react";
import SideBar from "../Components/SideBar";
import Box from "@mui/material/Box";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
} from "@mui/material";
import Creater from "../Components/Creater";

export default function Dashboard() {
  const [data, setData] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetch("https://admin.dennic.uz/v1/user/?Page=1&Limit=30")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.users && Array.isArray(json.users)) {
          setData(json.users);
        } else {
          console.error("Unexpected data format:", json);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const formatDate = (dateString) => {
    return dateString.split(" ")[0];
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "65px" }}>
        <div className="chap">
          <Button onClick={() => setOpenModal(true)} variant="contained">
            Add
          </Button>
          <Creater openModal={openModal} setOpenModal={setOpenModal} />
        </div>
        <TableContainer sx={{ maxHeight: "550px" }} component={Paper}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell align="center">Birth Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <img
                      src={row.image_url}
                      alt="User"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                  </TableCell>
                  <TableCell>{`${row.first_name} ${row.last_name}`}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>{row.phone_number}</TableCell>
                  <TableCell align="center">
                    {formatDate(row.birth_date)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
