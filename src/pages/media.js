import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { medias } from "../__mocks__/medias";
import { MediaListToolbar } from "../components/media/media-list-toolbar";
import { MediaList } from "../components/media/media-list";
import { DashboardLayout } from "../components/dashboard-layout";
import NextLink from "next/link";
import AddIcon from "@mui/icons-material/Add";

//////////////////////////

import { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Button,
  Card,
  Checkbox,
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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { baseUrl } from "src/config";

const mediaServerUrl = `${baseUrl}/admin/media`;

const getMuiTheme = () =>
  createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: "8px",
            // backgroundColor: "#CDCAC6",
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

const Medias = () => {
  const router = useRouter();

  const rowData = [];
  const rowMeta = {};
  const onRowClicked = (rowData, rowMeta) => {
    //row click routine
    // console.log("media row data;", rowData[0])
    router.push({
      pathname: "/edit/media",
      query: { id: rowData[0] },
    });
  };

  const onAddButtonClicked = () => {
    router.push("/add/media");
  };
  const columns = [
    {
      label:"ID",
      name:"_id",
      options:{
        display:false
      }
    }, 
    {
      label:"File Name",
      name:"file_name",
    },
    {
      label:"Type",
      name:"file_type",
    },
    {
      label:"Url",
      name:"file_url",
    },
    {
      label:"Size",
      name:"file_size",
    },
    {
      label:"Uploaded At",
      name:"created_at"
    }
  ];
  const [tabledata, settabledata] = useState([]);
  useEffect(() => {
    // console.log("mounted");
    getMediaList();
  }, []);
  const getMediaList = () => {
    axios
      .get(`${mediaServerUrl}/list`, {
        params: {

        },
      })
      .then((res) => {
        // console.log("res:", res);
        // console.log("res.data:", res.data);
        settabledata(res.data);
        // console.log("tabledata:",tabledata)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  const options = {
    filterType: "checkbox",
    selectableRows:"none",//for none display checkbox before every table row
    onRowClick: onRowClicked,
  };

  return (
    <>
      <Head>
        <title>Media Library</title>
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
                    Add a media
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xl={12} lg={12} sm={12} xs={12}>
              <ThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                  title={"Media Library"}
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

Medias.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Medias;
