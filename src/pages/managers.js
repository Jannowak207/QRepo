import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import Head from "next/head";
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import MUIDataTable from "mui-datatables";
import { useRouter } from "next/router";
import { RouterOutlined } from "@mui/icons-material";
import { DashboardLayout } from "../components/dashboard-layout";

const Managers = () => {
  const router = useRouter();
  const rowData = [];
  const rowMeta = {};
  const onRowClicked = (rowData, rowMeta) => {
    //row click routine
    console.log("row clicked.");
    console.log("rowData:" + rowData);
    console.log("rowMeta:" + rowMeta);
    router.push("/edit/manager");
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
    <>
      <Head>
        <title>Managers</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item xl={12} lg={12} sm={12} xs={12}>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "flex-end",
                  flexWrap: "wrap",
                  m: -1,
                }}
              >
                <Box sx={{ m: 1 }}>
                  <Button color="primary" variant="contained" onClick={handleClickOpen}>
                    Add a manager
                  </Button>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add a manager</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                       
                      </DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                      />
                      <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                      />
                      <TextField
                        autoFocus
                        margin="dense"
                        id="address"
                        label="Address"
                        type="address"
                        fullWidth
                        variant="standard"
                      />
                      <TextField
                        autoFocus
                        margin="dense"
                        id="phone"
                        label="Phone Number"
                        type="number"
                        fullWidth
                        variant="standard"
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={handleClose}>Add</Button>
                    </DialogActions>
                  </Dialog>
                </Box>
              </Box>
            </Grid>
            <Grid item xl={12} lg={12} sm={12} xs={12}>
              <MUIDataTable title={"Customers"} data={data} columns={columns} options={options} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Managers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Managers;
