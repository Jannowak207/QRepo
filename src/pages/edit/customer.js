import { DashboardLayout } from "../../components/dashboard-layout";
import axios from "axios";
import { baseUrl } from "src/config";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Container,
  Divider,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";

//for use context for id
import { useAppContext } from "src/context/state";

const EditCutomer = (props) => {
  //for use context
  const mycontext = useAppContext();

  const customerEditUrl = `${baseUrl}/admin/customer/edit`;
  const customerDelUrl = `${baseUrl}/admin/customer/delete`;
  const customerGetOneUrl = `${baseUrl}/admin/customer/one`;
  const router = useRouter();
  
  // _id received previous page for edit or delete actions
  //const { customerId } = router.query
  //const { customerId } = props.match.state
  //const { state } = props.location
  //console.log()

  // get selected customer details data from server when mounted this page
  useEffect(() => {
   
    axios
    .get(customerGetOneUrl,{
      params:{
        "_id":router.query.id
      }
    })
    .then( res => {
      if(res.data){
        console.log("one data;",res.data)
       // values = res.data;
        setValues(res.data);
      }
    })
    .catch(err => {
      console.log(err)
    })
    console.log("here:", router.query);
  },[router.query])

  //for edit request to server
  const EditCustomer = (customer) => {
    axios
      .post(`${customerEditUrl}`, customer)
      .then((res) => {
        if (res.data) {
          //  console.log("Edit success:",res.data)
        }
      })
      .catch((err) => console.log(err));
  };

  const DeleteCustomer = () => {
    // need id for del
    axios
      .get(`${customerDelUrl}`,{
        params:{
          "_id":router.query.id,
        }
      })
      .then(res=>{
        console.log("delete success.")
      })
      .catch(err => {
        console.log(err)
      })
  };

  // for edit customer data
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

  //for tab
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  // for edit save btn clicked
  const handleSaveClick = (event) => {
    // save routine
    let editData = {
      id: values._id,
      plan: values.plan,
      apiLeft: values.apiLeft,
      first_name: values.first_name,
      last_name: values.last_name,
      phone_number: values.phone_number,
      email: values.email,
      password: values.password,
    };
    EditCustomer(editData);
    router.push("/customers");
  };

  //for input fields
  const handleChange = (event) => {
    //change routine
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  //for delete customer
  const handleDeleteCustomer = (event) => {
    // account delete routine
    DeleteCustomer();
    router.push("/customers");
  };

  //for cancel
  const handleCancelClick = () =>{
    router.push('/customers')
  }

  return (
    <>
      <Head>
        <title>Customer | Edit</title>
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
              <Button
                color="error"
                variant="contained"
                onClick={handleDeleteCustomer}
                size="small"
                sx={{ height: 30 }}
              >
                Delete your customer
              </Button>
            </Box>
            <Divider />
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
                <Button color="success" variant="contained" onClick={handleCancelClick}>
                  Cancel
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Container>
      </Box>
    </>
  );
};
EditCutomer.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default EditCutomer;
