import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { QRGenToolbar } from '../components/qr-code-gen/qr-gen-toolbar';
import { QRGenOptions } from '../components/qr-code-gen/qr-gen-options';
import { QRGenMain } from '../components/qr-code-gen/qr-gen-main';
import { DashboardLayout } from '../components/dashboard-layout';
//import { customers } from '../__mocks__/customers';

const QRCodeGen = () => (
  <>
    <Head>
      <title>
        New QR Code Generate
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
        <QRGenToolbar />
        <Box sx={{ mt: 3 }}>
            <Typography
              sx={{ mb: 3 }}
              variant="h4"
            >
              Options
            </Typography>
            <Grid
              container
              spacing={2}
            >
              <Grid
                item
                lg={6}
                md={6}
                xs={12}
              >
                <QRGenOptions />
              </Grid>
              <Grid
                item
                lg={6}
                md={6}
                xs={12}
              >
                <QRGenMain />
              </Grid>
            </Grid>
        </Box>
      </Container>
    </Box>
  </>
);
QRCodeGen.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default QRCodeGen;
