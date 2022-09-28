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
import LinearProgressWithLabel from "src/components/LinearProgressWithLabel";
import { red } from "@mui/material/colors";
import CustomerInfo from "src/components/customer/customer-info";
import axios from "axios";
import { baseUrl } from "src/config";

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
  const router = useRouter();
  const [rowData, setRowData] = useState({});
  //for one customer detail data from server
  const onRowClicked = (rowData, rowMeta) => {
    const first_name = rowData[0];

    router.push({
      pathname: "/edit/customer",
      query: { id: rowData[0] },
    });
  };

  const columns = [
    //"plan",
    //"apiLeft",
    {
      label: "ID",
      name: "_id",
      options: {
        display: false,
      },
    },
    {
      label: "First Name",
      name: "first_name",
    },
    {
      label: "Last Name",
      name: "last_name",
    },
    {
      label: "Phone Number",
      name: "phone_number",
    },
    {
      label: "Email Address",
      name: "email",
    },
    //"password",
    {
      label: "Created At",
      name: "created_at",
    },
    // "__V",
  ];
  const [tabledata, settabledata] = useState([]);
  const [progress, setProgress] = useState();
  useEffect(() => {
    // console.log("mounted");
    getCustomerList();
  }, []);
  const getCustomerList = () => {
    axios
      .get(
        `${customerServerUrl}/list`,
        {
          params: {
            key: [],
            pageNumber: 1,
            sort: "created_at",
          },
        },
        {
          onDownloadProgress: (data) => {
            setProgress(Math.round((100 * data.loaded) / data.total));
          },
        }
      )
      .then((res) => {
        // console.log("res:", res);
        // console.log("res.data:", res.data);
        settabledata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const options = {
    filterType: "checkbox",
    selectableRows: "none",
    onRowClick: onRowClicked,
    //onRowsDelete:false,
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
            {progress && (
              <Grid item xl={12} lg={12} sm={12} xs={12}>
                <LinearProgressWithLabel value={progress} />
              </Grid>
            )}
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
