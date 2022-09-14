import CustomerInfo from "src/components/customer/customer-info";
import { DashboardLayout } from "../../components/dashboard-layout";
import Head from "next/head";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { useRouter } from "next/router";
import { useState } from "react";
const EditManager = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    name: "Afrim Bunjaku",
    email: "ab@virast.org",
    phone: "+383 49 309 060",
    registeredOn: "25 Jul 2022",
    plan: ["Standard", "Premium"],
    expiryDate: "25 Jul 2023",
    apiKey: "cc580da0-0bf1-11ed-ad04-dd1c66620",
    apiRequestLeft: 100,
    password: "*********",
  });
  const newPassword = "";
  const [changeMode, setChangeMode] = useState("1");
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };
  const handleClick = (event) => {
    // save routine
    router.push("/managers");
  };
  const handleChange = (event) => {
    //change routine
  };
  const handleCopy = (event) => {
    // apiKey copy routine
  };
  const handleAddMoreTime = (event) => {
    // add more time to your subscription routine
  };
  const handleDeleteManager = (event) => {
    // manager delete routine
    router.push('/managers')
  };
  return (
    <>
      <Head>
        <title>Manager Edit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Container maxWidth="lg">
          <Card>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 2,
                alignItems: "center",
              }}
            >
              <Typography sx={{ mb: 0 }} variant="h4">
                Manager Settings
              </Typography>
              <Button
                color="error"
                variant="contained"
                onClick={handleDeleteManager}
                size="small"
                sx={{ height: 30 }}
              >
                Delete manager
              </Button>
            </Box>

            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item lg={12} md={12} xs={12}>
                  <Box>
                    <Box>
                      <Tabs value={tabIndex} onChange={handleTabChange}>
                        <Tab label="Profile" />
                        <Tab label="Password" />
                      </Tabs>
                    </Box>
                    <Box sx={{ padding: 2 }}>
                      {tabIndex === 0 && (
                        <Grid container spacing={3}>
                          <Grid item md={6} sx={12}>
                            <TextField
                              fullWidth
                              helperText="Please specify the name"
                              label="Name"
                              name="name"
                              onChange={handleChange}
                              required
                              value={values.name}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item md={6} sx={12}>
                            <TextField
                              fullWidth
                              label="Email Address"
                              name="email"
                              onChange={handleChange}
                              required
                              value={values.email}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item md={6} sx={12}>
                            <TextField
                              fullWidth
                              label="Phone number"
                              name="phone"
                              onChange={handleChange}
                              required
                              value={values.phone}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item md={6} sx={12}>
                            <TextField
                              fullWidth
                              label="Registered on:"
                              name="registeredOn"
                              onChange={handleChange}
                              required
                              value={values.registeredOn}
                              variant="outlined"
                            />
                          </Grid>
                        </Grid>
                      )}
                      {tabIndex === 1 && (
                        <Box>
                          <Grid item md={6} sx={12}>
                            <Typography sx={{ mt: 3 }} variant="button" gutterBottom>
                              Current Password:
                            </Typography>
                          </Grid>
                          <Grid item md={6} sx={12}>
                            <TextField
                              fullWidth
                              // helperText="Please specify the name"
                              // label="Name"
                              // name="name"
                              onChange={handleChange}
                              // required
                              value={values.password}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item md={6} sx={12}>
                            <Typography sx={{ mt: 3 }} variant="button" gutterBottom>
                              New Password:
                            </Typography>
                          </Grid>
                          <Grid item md={6} sx={12}>
                            <TextField
                              fullWidth
                              helperText="Please enter new password"
                              // label="Name"
                              // name="name"
                              onChange={handleChange}
                              // required
                              value={newPassword}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item md={6} sx={12}>
                            <Typography sx={{ mt: 3 }} variant="button" gutterBottom>
                              Confirm New Password:
                            </Typography>
                          </Grid>
                          <Grid item md={6} sx={12}>
                            <TextField
                              fullWidth
                              helperText="Please re-enter new password"
                              // label="Name"
                              // name="name"
                              onChange={handleChange}
                              // required
                              value={newPassword}
                              variant="outlined"
                            />
                          </Grid>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  p: 2,
                }}
              >
                <Button color="success" variant="contained" onClick={handleClick}>
                  Save details
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Container>
      </Box>
    </>
  );
};

EditManager.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default EditManager;
