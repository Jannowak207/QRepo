import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
import MUIDataTable from "mui-datatables";
import { useRouter } from "next/router";
import { RouterOutlined } from "@mui/icons-material";
import CustomerInfo from "./customer-info";

export const CustomerListResults = ({ customers, ...rest }) => {
  const router = useRouter();
  const rowData = [];
  const rowMeta = {};
  const onRowClicked = (rowData, rowMeta) => {
    //row click routine
    // console.log("row clicked.");
    // console.log("rowData:" + rowData);
    // console.log("rowMeta:" + rowMeta);
    router.push("/customer/editCustomer");
  };

  const columns = ["ID", "Name", "Email", "Address", "Phone", "CreatedAt"];
  const data = [
    [
      "1",
      "Ekaterina Tankova",
      "ekaterina.tankova@devias.io",
      "West Virginia",
      "304-428-3097",
      "9-1-2022",
    ],
    ["2", "Cao Yu", "cao.yu@devias.io", "California", "712-351-5711", "9-1-2022"],
    ["3", "Alexa Richardson", "alexa.richardson@devias.io", "Georgia", "770-635-2682", "5-1-2000"],
    ["4", "Anje Keizer", "anje.keizer@devias.io", "Ohio", "908-691-3242", "9-1-2022"],
    ["5", "Clarke Gillebert", "clarke.gillebert@devias.io", "Texas", "972-333-4106", "9-8-2017"],
    ["6", "Adam Denisov", "adam.denisov@devias.io", "California", "858-602-3409", "9-18-2019"],
    ["7", "Ava Gregoraci", "ava.gregoraci@devias.io", "California", "415-907-2647", "7-1-2019"],
    ["8", "Emilee Simchenko", "emilee.simchenko@devias.io", "Nevada", "702-661-1654", "8-1-2015"],
    ["9", "Kwak Seong-Min", "kwak.seong.min@devias.io", "Michigan", "313-812-8947", "6-15-2012"],
  ];
  const options = {
    filterType: "checkbox",
    onRowClick: onRowClicked,
  };

  return (
    <Grid container spacing={3}>
      <Grid item xl={12} lg={12} sm={12} xs={12}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            m: -1,
          }}
        >
          <Typography sx={{ m: 1 }} variant="h4">
            
          </Typography>
          <Box sx={{ m: 1 }}>
            <Button color="primary" variant="contained">
              Add Customers
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid item xl={12} lg={12} sm={12} xs={12}>
        <MUIDataTable title={"Customers"} data={data} columns={columns} options={options} />
      </Grid>
    </Grid>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired,
};
