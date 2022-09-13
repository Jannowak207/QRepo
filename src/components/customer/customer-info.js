import Head from "next/head";
import {
  Box,
  Button,
  Container,
  Grid,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { DashboardLayout } from "../dashboard-layout";
import { useRouter } from "next/router";
import { useState } from "react";

const CustomerInfo = () => {
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
  });
  const [changeMode, setChangeMode] = useState("1");
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };
  const handleClick = (event) => {
    // save routine
    router.push("/customers");
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
  const handleDeleteAccount = (event) => {
    // account delete routine
  };
  return (
    <>
      <Head>
        <title>Customer | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 , alignItems:"center"}}>
            <Typography sx={{ mb: 3 }} variant="h4">
              Customer Settings
            </Typography>
            <Button color="error" variant="contained" onClick={handleDeleteAccount} size="small" 
            sx={{height:30}}>
              Delete your account
            </Button>
          </Box>

          <Grid container spacing={3}>
            <Grid item lg={12} md={12} xs={12}>
              <Box>
                <Box>
                  <Tabs value={tabIndex} onChange={handleTabChange}>
                    <Tab label="Account" />
                    <Tab label="Password" />
                    <Tab label="Own short domain" />
                    <Tab label="Language" />
                    <Tab label="Integrations" />
                    <Tab label="Invoice" />
                    <Tab label="Email preferences" />
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
                      <Grid item md={2} sx={6}>
                        <TextField
                          fullWidth
                          label="Expiry date"
                          name="expiryDate"
                          onChange={handleChange}
                          required
                          value={values.expiryDate}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={4} sx={6}>
                        <Button color="secondary" variant="contained" onClick={handleAddMoreTime}>
                          Add more time to your subscription
                        </Button>
                      </Grid>
                      <Grid item md={5} sx={6}>
                        <TextField
                          fullWidth
                          label="apiKey"
                          name="apiKey"
                          onChange={handleChange}
                          required
                          value={values.apiKey}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={1} sx={6}>
                        <Box sx={{ alignItems: "center" }}>
                          <Button color="secondary" variant="contained" onClick={handleCopy}>
                            Copy
                          </Button>
                        </Box>
                      </Grid>
                      <Grid item md={6} sx={12}>
                        <TextField
                          fullWidth
                          label="API request left"
                          name="apiRequestLeft"
                          onChange={handleChange}
                          required
                          value={values.apiRequestLeft}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={1} sx={6}>
                        <Typography>Plan:</Typography>
                      </Grid>
                      <Grid item md={5} sx={6}>
                        <Select
                          fullWidth
                          value={changeMode}
                          defaultValue={changeMode}
                          onChange={(event) => setChangeMode(event.target.value)}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem value={1}>{values.plan[0]}</MenuItem>
                          <MenuItem value={2}>{values.plan[1]}</MenuItem>
                        </Select>
                      </Grid>
                    </Grid>
                  )}
                  {tabIndex === 1 && (
                    <Box>
                      <Typography>The second tab</Typography>
                    </Box>
                  )}
                  {tabIndex === 2 && (
                    <Box>
                      <Typography>The third tab</Typography>
                    </Box>
                  )}
                  {tabIndex === 3 && (
                    <Box>
                      <Typography>The forth tab</Typography>
                    </Box>
                  )}
                  {tabIndex === 4 && (
                    <Box>
                      <Typography>The fifth tab</Typography>
                    </Box>
                  )}
                  {tabIndex === 5 && (
                    <Box>
                      <Typography>The sixth tab</Typography>
                    </Box>
                  )}
                  {tabIndex === 6 && (
                    <Box>
                      <Typography>The seventh tab</Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
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
        </Container>
      </Box>
    </>
  );
};

CustomerInfo.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CustomerInfo;
