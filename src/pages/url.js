import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../components/url/customer-list-results';
import { UrlQRToolbar } from '../components/url/url-qr-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';

const Url = () => (
  <>
    <Head>
      <title>
        Url
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
        <UrlQRToolbar />
        <Box sx={{ mt: 3 }}>
          <CustomerListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);
Url.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Url;
