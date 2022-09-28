import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LinearProgressWithLabel from "../LinearProgressWithLabel";

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
export const WatchList = (props) => {
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
  const [progress,setProgress]= useState();
  useEffect(() => {
    // console.log("mounted");
    getCustomerList();
  }, []);
  const getCustomerList = () => {
    axios
      .get(
        `${customerServerUrl}/advancedlist`,
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

  return (
    <Grid {...props} container spacing={3}>
      {progress &&
      <Grid item xl={12} lg={12} sm={12} xs={12}>
        <LinearProgressWithLabel value = {progress}/>
      </Grid>
      }
      <Grid item xl={12} lg={12} sm={12} xs={12}>
        <ThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            title={"Recent 5 customers"}
            data={tabledata}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </Grid>
    </Grid>
  );
};
