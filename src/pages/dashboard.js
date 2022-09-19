import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { TotalScans } from '../components/dashboard/total-scans';
import { LatestOrders } from '../components/dashboard/latest-orders';
import { LatestProducts } from '../components/dashboard/latest-products';
import { LatestQRCodes } from '../components/dashboard/latest-qr-codes';
import { TotalQRCampaigns } from '../components/dashboard/total-qr-campaigns';
import { QRCampaignsRemaining } from '../components/dashboard/qr-campaigns-remaining';
import { TopTenQRCampaigns } from '../components/dashboard/top-ten-qr-campaigns';
import { WatchList } from 'src/components/dashboard/watch-list';
import { QRCodesByDevice } from '../components/dashboard/qr-codes-by-device';
import { DashboardLayout } from '../components/dashboard-layout';

const Dashboard = () => (
  <>
    <Head>
      <title>
        Dashboard
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          {/* <Grid
            item
            lg={4}
            sm={12}
            xl={4}
            xs={12}
          >
            <TotalScans />
          </Grid>
          <Grid
            item
            xl={4}
            lg={4}
            sm={12}
            xs={12}
          >
            <QRCampaignsRemaining />
          </Grid>
          <Grid
            item
            xl={4}
            lg={4}
            sm={12}
            xs={12}
          >
            <TotalQRCampaigns />
          </Grid> */}
          <Grid
            item
            xl={12}
            lg={12}
            sm={12}
            xs={12}
          >
            <TopTenQRCampaigns />
          </Grid>
          <Grid
            item
            xl={12}
            lg={12}
            sm={12}
            xs={12}
          >
            <WatchList />
          </Grid>
          {/* <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestQRCodes />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <QRCodesByDevice sx={{ height: '100%' }} />
          </Grid> */}
          {/* <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestProducts sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders />
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  </>
);

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
