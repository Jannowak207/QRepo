import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export const WatchList = (props) => {
  
  //sample data
  const columns = ["Campaign Name", "QR ID", "Country", "City", "Date", "Time","Type", "Top Device", "Top Location", "Scans"];
  const data = [

  ];
  const options = {
    filterType: "checkbox",
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
              title={"Watchlist"}
              data={data}
              columns={columns}
              options={options}
            />
          </Grid>
        </Grid>
  )
};
