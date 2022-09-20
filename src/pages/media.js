import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useRouter } from "next/router";
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
      label: "ID",
      name: "_id",
      options: {
        display: false,
      },
    },
    {
      label: "File Name",
      name: "file_name",
    },
    {
      label: "Type",
      name: "file_type",
    },
    {
      label: "Url",
      name: "file_url",
    },
    {
      label: "Size",
      name: "file_size",
    },
    {
      label: "Uploaded At",
      name: "created_at",
    },
  ];
  const [tabledata, settabledata] = useState([]);
  useEffect(() => {
    getMediaList();
  }, []);
  const getMediaList = () => {
    axios
      .get(`${mediaServerUrl}/list`, {
        params: {},
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
    selectableRows: "none", //for none display checkbox before every table row
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
          <Grid container 
          spacing={3}>
            <Grid item 
            xl={12} 
            lg={12} 
            sm={12} 
            xs={12}>
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
                  <Button color="primary" 
                  variant="contained" 
                  onClick={onAddButtonClicked}>
                    Add a media
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item 
            xl={12} 
            lg={12} 
            sm={12} 
            xs={12}>
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
