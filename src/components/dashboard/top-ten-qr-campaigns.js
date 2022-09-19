import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

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


export const TopTenQRCampaigns = (props) => {
  const router = useRouter();

  //sample data
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
    //console.log("mounted");
    getRecentMediaList();
  }, []);
  const getRecentMediaList = () => {
    axios
      .get(`${mediaServerUrl}/recentlist`, {
        params: {},
      })
      .then((res) => {
        // console.log("res:", res);
        // console.log("res.data:", res.data);
        settabledata(res.data);
        // console.log("tabledata:", tabledata);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const rowData = [];
  const rowMeta = {};
  const onRowClicked = (rowData, rowMeta) => {
    //row click routine
    router.push({
      pathname: "/edit/media",
      query: { id: rowData[0] },
    });
  };
  const options = {
    filterType: "checkbox",
    selectableRows: "none",
    onRowClick: onRowClicked,
  };

  return (
    <Grid {...props} container spacing={3}>
      <Grid item xl={12} lg={12} sm={12} xs={12}>
        <ThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            title={"Recent 5 Medias"}
            data={tabledata}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </Grid>
    </Grid>
  );
};
