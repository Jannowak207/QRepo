import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { ManagerList } from '../components/managers/managerList';
import { SettingsPassword } from '../components/managers/settings-password';

const Settings = () => (
  <>
    <Head>
      <title>
        Managers | List
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Managers
        </Typography>
        <ManagerList />
        {/* <Box sx={{ pt: 3 }}>
          <SettingsPassword />
        </Box> */}
      </Container>
    </Box>
  </>
);

Settings.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Settings;
