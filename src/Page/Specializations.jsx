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
    fetch("https://admin.dennic.uz/v1/specialization/?Page=1&Limit=10")
      .then((res) => res.json())
      .then((json) => {
        console.log(json); // Log the response to check its structure
        if (json && Array.isArray(json.specializations)) {
          // Update to match new data structure
          setData(json.specializations);
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
        <TableContainer sx={{ maxHeight: "500px" }} component={Paper}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                {/* <TableCell>Image</TableCell> */}
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Department ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((spec) => (
                <TableRow key={spec.id}>
                  {/* <TableCell>
                    <img
                      src={spec.image_url}
                      alt={spec.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                  </TableCell> */}
                  <TableCell>{spec.name}</TableCell>
                  <TableCell>{spec.description}</TableCell>
                  <TableCell>{spec.department_id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
