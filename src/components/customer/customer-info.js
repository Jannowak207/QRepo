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
import { DashboardLayout } from "../dashboard-layout";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "src/config";

const customerUrl = `${baseUrl}/admin/customer`;

const CustomerInfo = (props) => {
  //console.log("here is customer info component: the rowdata from parent comp:", props.data);
  // if add else if edit?
  const AddCustomer = (customer) => {
    axios
      .post(`${customerUrl}/add`, customer)
      .then((res) => {
      //  console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const EditCustomer = (customer)=> {
    axios
      .post(`${customerUrl}/eidt`,customer)
      .then((res)=>{
        if(res.data){
        //  console.log("Edit success:",res.data)
        }
      }).catch(err=>console.log(err))
  }
  const [newPassword, setNewPassword] = useState("");
  const [values, setValues] = useState({
    plan: 0, // 0:standard,1:premium
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
  if (props.data) {
   // console.log("Edit mode");
    values = props.data;
    //setValues(props.data)
    // setValues(props.values);
    //values = Object.assign({}, props.data);
    // setValues({
    //   ...values,
    //   ...props.data
    // }) //How to assign object
  //  console.log("assigned values:", values);
  } else {console.log("Add mode");}
  const router = useRouter();

  const [changeMode, setChangeMode] = useState("0");
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };
  const handleSaveClick = (event) => {
    // save routine
    //router.push("/customers");
    if (props.data) {
      //edit request
      let editData={
        id:values._id,
        plan:values.plan,
        apiLeft:values.apiLeft,
        first_name:values.first_name,
        last_name:values.last_name,
        phone_number:values.phone_number,
        email:values.email,
        password:values.password,
      }
      EditCustomer(editData);
     // console.log("Edit Request")
    } else {
      //add request
    //  console.log("Add reques.")
      let addData = {
        plan:values2.plan,
        apiLeft:values2.apiLeft,
        first_name:values2.first_name,
        last_name:values2.last_name,
        phone_number:values2.phone_number,
        email:values2.email,
        password:values2.password
      };
      AddCustomer(addData);
    }
    props.parentCallback();
  };
  const handleChange = (event) => {
    //change routine
    if (props.data) {
      setValues({
        ...values,
        [event.target.name]: event.target.value,
      });
    } else{
      setValues2({
        ...values2,
      [event.target.name]: event.target.value,
      })
    }
  };

  const handleDeleteAccount = (event) => {
    // account delete routine
    props.parentCallback();
  };
  return (
    <>
      <Head>
        <title>Customer</title>
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
                Customer Settings
              </Typography>
              {props.data && 
               <Button
                color="error"
                variant="contained"
                onClick={handleDeleteAccount}
                size="small"
                sx={{ height: 30 }}
              >
                Delete your account
              </Button>
              }
             
            </Box>

            <Divider />
            {props.data && (
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item lg={12} md={12} xs={12}>
                    <Box>
                      <Box>
                        <Tabs value={tabIndex} onChange={handleTabChange}>
                          <Tab label="Account" />
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
                                name="first_name"
                                onChange={handleChange}
                                required
                                value={values.first_name}
                                variant="outlined"
                              />
                            </Grid>
                            <Grid item md={6} sx={12}>
                              <TextField
                                fullWidth
                                label="Last Name"
                                name="last_name"
                                onChange={handleChange}
                                required
                                value={values.last_name}
                                variant="outlined"
                              />
                            </Grid>
                            <Grid item md={6} sx={12}>
                              <TextField
                                fullWidth
                                label="Phone number"
                                name="phone_number"
                                onChange={handleChange}
                                required
                                value={values.phone_number}
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
                                label="Registered on:"
                                name="created_at"
                                onChange={handleChange}
                                required
                                value={values.created_at}
                                variant="outlined"
                              />
                            </Grid>

                            <Grid item md={6} sx={12}>
                              <TextField
                                fullWidth
                                label="API request left"
                                name="apiLeft"
                                onChange={handleChange}
                                required
                                value={values.apiLeft}
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
                                <MenuItem value={0}>Standard</MenuItem>
                                <MenuItem value={1}>Premium</MenuItem>
                              </Select>
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
                                name="password"
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
                                name="newPassword"
                                onChange={handleChange}
                                // required

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
                                name="confirmNewPassword"
                                onChange={handleChange}
                                // required

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
            )}
            {!props.data && (
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item lg={12} md={12} xs={12}>
                    <Box>
                      <Box>
                        <Tabs value={tabIndex} onChange={handleTabChange}>
                          <Tab label="Account" />
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
                                name="first_name"
                                onChange={handleChange}
                                required
                                value={values2.first_name}
                                variant="outlined"
                              />
                            </Grid>
                            <Grid item md={6} sx={12}>
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
                            <Grid item md={6} sx={12}>
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
                            <Grid item md={6} sx={12}>
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
                     

                            <Grid item md={6} sx={12}>
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
                                <MenuItem value={0}>Standard</MenuItem>
                                <MenuItem value={1}>Premium</MenuItem>
                              </Select>
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
                                name="password"
                                onChange={handleChange}
                                // required
                                value={values2.password}
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
            )}
            <Divider />
            <CardActions>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  p: 2,
                }}
              >
                <Button color="success" variant="contained" onClick={handleSaveClick}>
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

CustomerInfo.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CustomerInfo;
