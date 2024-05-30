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
    fetch("https://admin.dennic.uz/v1/doctor/?Page=1&Limit=10")
      .then((res) => res.json())
      .then((json) => {
        console.log(json); // Log the response to check its structure
        if (json && Array.isArray(json.doctors)) {
          setData(json.doctors);
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
        <TableContainer sx={{ maxHeight: "550px" }} component={Paper}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Birth Date</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Bio</TableCell>
                <TableCell>Specializations</TableCell>
                <TableCell>Patient Count</TableCell>
                <TableCell>Room Number</TableCell>
                <TableCell>Salary</TableCell>
                <TableCell>Start Work Date</TableCell>
                <TableCell>End Work Date</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>Finish Time</TableCell>
                <TableCell>Work Years</TableCell>
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
                      alt="Doctor"
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
                  <TableCell>{formatDate(row.birth_date)}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.city}</TableCell>
                  <TableCell>{row.country}</TableCell>
                  <TableCell>{row.bio}</TableCell>
                  <TableCell>
                    {row.specializations.map((spec) => spec.Name).join(", ")}
                  </TableCell>
                  <TableCell>{row.patient_count}</TableCell>
                  <TableCell>{row.room_number}</TableCell>
                  <TableCell>{row.salary}</TableCell>
                  <TableCell>{formatDate(row.start_work_date)}</TableCell>
                  <TableCell>{formatDate(row.end_work_date)}</TableCell>
                  <TableCell>{row.start_time}</TableCell>
                  <TableCell>{row.finish_time}</TableCell>
                  <TableCell>{row.work_years}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
