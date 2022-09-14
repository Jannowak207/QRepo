import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export const TopTenQRCampaigns = (props) => {
  
  //sample data
  const columns = ["id","Campaign Name", "QR ID", "Country", "City", "Date", "Time","Type", "Top Device", "Top Location", "Scans"];
  const data = [
    ["2","Campaign WVC2", "WVC2", "US", "Los Angeles", "9-1-2022", "9:30 AM", "URL", "iOS", "Bjaerred","1"],
    ["1","Campaign ACD", "ACD", "Australia", "Sydney", "4-19-2022", "10:30 AM", "File", "Android", "ABCV","5"],
  ];
  const rowData = [];
  const rowMeta = {};
  const onRowClicked = (rowData, rowMeta) =>{
    //row click routine
    console.log("row clicked.");
    console.log("rowData:"+rowData);
    console.log("rowMeta:"+rowMeta);
  };
  const options = {
    filterType: "checkbox",
    onRowClick:onRowClicked,
  };

  return (

        <Grid {...props}
          container
          spacing={3}
          
        >
          <Grid
            item
            xl={12}
            lg={12}
            sm={12}
            xs={12}
            >
            <MUIDataTable
              title={"Top 10 QR Code Campaigns"}
              data={data}
              columns={columns}
              options={options}
            />
          </Grid>
        </Grid>
  )
};
