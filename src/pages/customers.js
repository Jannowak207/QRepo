import Head from "next/head";
import { Box, Button, Grid, Container, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DashboardLayout } from "../components/dashboard-layout";
import { customers } from "../__mocks__/customers";
import styled from "styled-components";

import { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";

import MUIDataTable from "mui-datatables";
import { useRouter } from "next/router";
import { RouterOutlined } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import CustomerInfo from "src/components/customer/customer-info";
import axios from "axios";
import { baseUrl } from "src/config";
// for use context
import { useAppContext } from "src/context/state";

const customerServerUrl = `${baseUrl}/admin/customer`;

const getMuiTheme = () =>
  createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: "8px",
            borderBottom: "1px solid #CDCAC6",
            cursor: "pointer",
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          regular: {
            minHeight: "8px",
          },
        },
      },
    },
  });

const Customers = (props) => {
  // for use context
  const mycontext = useAppContext();
  console.log("myconext.id:", mycontext.id);

  const router = useRouter();
  const [rowData, setRowData] = useState({});
  //for one customer detail data from server
  const onRowClicked = (rowData, rowMeta) => {

    router.push({
      pathname: "/edit/customer",
      query: { id: rowData[2] },
    });
  };

  const columns = [
    "plan",
    "apiLeft",
    "_id",
    "firstname",
    "lastname",
    "phone_number",
    "email",
    "password",
    "created-at",
    "__V",
  ];
  const [tabledata, settabledata] = useState([]);
  useEffect(() => {
    console.log("mounted");
    getCustomerList();
  }, []);
  const getCustomerList = () => {
    axios
      .get(`${customerServerUrl}/list`, {
        params: {
          key: [],
          pageNumber: 0,
          sort: "created_at",
        },
      })
      .then((res) => {
        settabledata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const options = {
    filterType: "checkbox",
    onRowClick: onRowClicked,
  };

  const onAddButtonClicked = () => {
    router.push("/add/customer");
  };

  return (
    <>
      <Head>
        <title>Customers</title>
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
                  <Button color="primary" variant="contained" onClick={onAddButtonClicked}>
                    Add a customer
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xl={12} lg={12} sm={12} xs={12}>
              <ThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                  variatnt="standard"
                  title={"Customers"}
                  data={tabledata}
                  columns={columns}
                  options={options}
                />
              </ThemeProvider>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Customers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Customers;
