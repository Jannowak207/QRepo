import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { medias } from "../__mocks__/medias";
import { MediaListToolbar } from "../components/media/media-list-toolbar";
import { MediaList } from "../components/media/media-list";
import { DashboardLayout } from "../components/dashboard-layout";
import NextLink from "next/link";
import AddIcon from "@mui/icons-material/Add";

//////////////////////////

import { useState } from "react";
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

const Medias = () => {
  const router = useRouter();

  const rowData = [];
  const rowMeta = {};
  const onRowClicked = (rowData, rowMeta) => {
    //row click routine
    console.log("row clicked.");
    console.log("rowData:" + rowData);
    console.log("rowMeta:" + rowMeta);
    router.push("/edit/media");
  };

  const columns = ["ID", "File Name", "Type", "Url", "Size", "Date"];
  const data = [
    ["1", "Movie 1", "movie", "url 1", "320MB", "9-1-2022"],
    ["2", "Audio 19", "audio", "url 10", "5MB", "9-1-2022"],
    ["3", "Movie 3", "movie", "url 5", "90MB", "5-1-2000"],
    ["4", "Audio 2", "audio", "url 8", "9MB", "9-1-2022"],
    ["5", "Movie 6", "movie", "url 90", "321MB", "9-8-2017"],
    ["6", "Movie 22", "movie", "url 7", "333MB", "9-18-2019"],
    ["7", "Audio 2", "audio", "url 12", "11MB", "7-1-2019"],
    ["8", "Movie 3", "movie", "url 4", "85MB", "8-1-2015"],
    ["9", "Movie 4", "movie", "url 9", "9MB", "6-15-2012"],
    ["1", "Movie 1", "movie", "url 1", "320MB", "9-1-2022"],
    ["2", "Audio 19", "audio", "url 10", "5MB", "9-1-2022"],
    ["3", "Movie 3", "movie", "url 5", "90MB", "5-1-2000"],
    ["4", "Audio 2", "audio", "url 8", "9MB", "9-1-2022"],
    ["5", "Movie 6", "movie", "url 90", "321MB", "9-8-2017"],
    ["6", "Movie 22", "movie", "url 7", "333MB", "9-18-2019"],
    ["7", "Audio 2", "audio", "url 12", "11MB", "7-1-2019"],
    ["8", "Movie 3", "movie", "url 4", "85MB", "8-1-2015"],
    ["9", "Movie 4", "movie", "url 9", "9MB", "6-15-2012"],
  ];
  const options = {
    filterType: "checkbox",
    onRowClick: onRowClicked,
  };
  const getMuiTheme = () =>
    createTheme({
      components: {
        MuiTableCell: {
          styleOverrides: {
            root: {
              padding: "8px",
              // backgroundColor: "#CDCAC6",
              border: "1px solid #CDCAC6",
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
                  <Button color="primary" variant="contained" onClick={onRowClicked}>
                    Add a media
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xl={12} lg={12} sm={12} xs={12}>
              <ThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                  title={"Media Library"}
                  data={data}
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
