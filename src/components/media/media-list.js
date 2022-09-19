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

export const MediaList = ({ medias, ...rest }) => {
  const router = useRouter();
  const rowData = [];
  const rowMeta = {};
  const onRowClicked = (rowData, rowMeta) => {
    //row click routine
    // console.log("row clicked.");
    // console.log("rowData:" + rowData);
    // console.log("rowMeta:" + rowMeta);
    router.push("#");
  };

  const columns = ["ID", "File Name", "Type", "Url", "Size", "Date"];
  const data = [
    [
      "1",
      "Movie 1",
      "movie",
      "url 1",
      "320MB",
      "9-1-2022",
    ],
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
          <Typography sx={{ m: 1 }} variant="h4"></Typography>
          <Box sx={{ m: 1 }}>
            <Button color="primary" variant="contained">
              Add a media
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid item xl={12} lg={12} sm={12} xs={12}>
        <MUIDataTable title={"Media Library"} data={data} columns={columns} options={options} />
      </Grid>
    </Grid>
  );
};

MediaList.propTypes = {
  medias: PropTypes.array.isRequired,
};
