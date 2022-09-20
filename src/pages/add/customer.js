import { DashboardLayout } from "../../components/dashboard-layout";
import { baseUrl } from "src/config";
import { useState, useEffect } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Container,
  Card,
  CardContent,
  CardActions,
  Divider,
  Grid,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
  CardHeader,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";

const customerAddUrl = `${baseUrl}/admin/customer/add`;
const AddCutomer = () => {
  const router = useRouter();
  // add axios function
  const AddCustomer = (customer) => {
    axios
      .post(`${customerAddUrl}`, customer)
      .then((res) => {
        //  console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // for add data
  const [values2, setValues2] = useState({
    plan: 0,
    apiLeft: 0,
    _id: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
    created_at: "",
    __v: 0,
  });

  // for tab
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };
  //for input validate
  const [okAllFields, setOkAllFields] = useState(true);
  // for add buton clicked function
  const onAddClicked = (event) => {
    // save routine
    // for validation
    let addData = {
      first_name: values2.first_name,
      last_name: values2.last_name,
      phone_number: values2.phone_number,
      email: values2.email,
      password: values2.password,
    };
    if (
      addData.first_name == "" ||
      addData.last_name == "" ||
      addData.phone_number == "" ||
      addData.email == "" ||
      addData.password == ""
    ) {
      // console.log("all fields required.");
      setOkAllFields(false);
    } else {
      AddCustomer(addData);
      router.push("/customers");
    }
  };
  // for cancel button clicked
  const onCancelClicked = () => {
    router.push("/customers");
  };

  //for input bind
  const handleChange = (event) => {
    setValues2({
      ...values2,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <Head>
        <title>Customer | Add</title>
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
                p: 0,
                alignItems: "center",
              }}
            >
              <Typography sx={{ mt: 3, mb: 2, ml: 5 }} 
              variant="h4">
                Add Customer
              </Typography>

              <Divider />

              <CardContent>
                <Grid container 
                spacing={3}>
                  <Grid item 
                  lg={12} 
                  md={12} 
                  xs={12}>
                    <Box>
                      <Box sx={{ ml: 2, mr: 2 }}>
                        <Grid container 
                        spacing={3}>
                          {!okAllFields && (
                            <Grid item 
                            lg={12} 
                            md={12} 
                            sx={12}>
                              <Typography color="error">All fields are required</Typography>
                            </Grid>
                          )}
                          <Grid item 
                          md={6} 
                          sx={12}>
                            <TextField
                              fullWidth
                              helperText="Please specify the name"
                              label="Name"
                              name="first_name"
                              onChange={handleChange}
                              required
                              value={values2.first_name}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item 
                          md={6} 
                          sx={12}>
                            <TextField
                              fullWidth
                              label="Last Name"
                              name="last_name"
                              onChange={handleChange}
                              required
                              value={values2.last_name}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item 
                          md={6} 
                          sx={12}>
                            <TextField
                              fullWidth
                              label="Phone number"
                              name="phone_number"
                              onChange={handleChange}
                              required
                              value={values2.phone_number}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item 
                          md={6} 
                          sx={12}>
                            <TextField
                              fullWidth
                              label="Email Address"
                              name="email"
                              onChange={handleChange}
                              required
                              value={values2.email}
                              variant="outlined"
                            />
                          </Grid>

                          <Grid item 
                          md={6} 
                          sx={12}>
                            <TextField
                              fullWidth
                              label="API request left"
                              name="apiLeft"
                              onChange={handleChange}
                              required
                              value={values2.apiLeft}
                              variant="outlined"
                            />
                          </Grid>
                        </Grid>
                        <Divider sx={{ my: 2 }} />
                        <Typography sx={{ mt: 3 }} 
                        variant="button" 
                        gutterBottom>
                          Password
                        </Typography>
                        <TextField
                          fullWidth
                          // helperText="Please specify the name"
                          // label="Name"
                          name="password"
                          onChange={handleChange}
                          required
                          value={values2.password}
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Box>
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 2,
                alignItems: "center",
                ml: 5,
                mr: 5,
              }}
            >
              <Button color="success" 
              variant="contained" 
              onClick={onAddClicked}>
                Add Customer
              </Button>
              <Button color="success" 
              variant="contained"
               onClick={onCancelClicked}>
                Cancel
              </Button>
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};
AddCutomer.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default AddCutomer;
