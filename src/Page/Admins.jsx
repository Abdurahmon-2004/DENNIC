import React, { useState, useEffect } from "react";
import SideBar from "../Component/SideBar";
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
    fetch("https://admin.dennic.uz/v1/admin/?Page=1&Limit=10")
      .then((res) => res.json())
      .then((json) => {
        console.log(json); // Log the response to check its structure
        if (json.admins && Array.isArray(json.admins)) {
          setData(json.admins);
        } else {
          console.error("Unexpected data format:", json);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const formatDate = (dateString) => {
    return dateString.split("T")[0];
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "65px" }}>
        <TableContainer sx={{ maxHeight: "500px" }} component={Paper}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell align="center">Birth Date</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Salary</TableCell>
                <TableCell>Biography</TableCell>
                <TableCell>Start Work Year</TableCell>
                <TableCell>End Work Year</TableCell>
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
                    {row.image_url ? (
                      <img
                        src={row.image_url}
                        alt="Admin"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </TableCell>
                  <TableCell>{`${row.first_name} ${row.last_name}`}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>{row.phone_number}</TableCell>
                  <TableCell align="center">
                    {formatDate(row.birth_date)}
                  </TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.salary}</TableCell>
                  <TableCell>{row.biography}</TableCell>
                  <TableCell>{formatDate(row.start_work_year)}</TableCell>
                  <TableCell>{formatDate(row.end_work_year)}</TableCell>
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
