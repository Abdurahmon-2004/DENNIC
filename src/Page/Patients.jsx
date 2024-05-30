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
} from "@mui/material";

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://admin.dennic.uz/v1/patient/?Page=1&Limit=10")
      .then((res) => res.json())
      .then((json) => {
        console.log(json); // Log the response to check its structure
        if (json.patients && Array.isArray(json.patients)) {
          setData(json.patients);
        } else {
          console.error("Unexpected data format:", json);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "65px" }}>
        <TableContainer sx={{ maxHeight: "550px" }} component={Paper}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Birth Date</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Blood Group</TableCell>
                <TableCell>Patient Problem</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{`${row.first_name} ${row.last_name}`}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>{row.phone_number}</TableCell>
                  <TableCell>{row.birth_date}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.city}</TableCell>
                  <TableCell>{row.country}</TableCell>
                  <TableCell>{row.blood_group}</TableCell>
                  <TableCell>{row.patient_problem}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
