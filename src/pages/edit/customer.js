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
// for modal dlg
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LinearProgressWithLabel from "src/components/LinearProgressWithLabel";
var isConfirmed = true;
var isChanged = false;

const EditCutomer = (props) => {
  const customerEditUrl = `${baseUrl}/admin/customer/edit`;
  const customerDelUrl = `${baseUrl}/admin/customer/delete`;
  const customerGetOneUrl = `${baseUrl}/admin/customer/one`;
  const router = useRouter();
  const [progress, setProgress] = useState();
  const [progressEdit,setProgressEdit] = useState();
  // get selected customer details data from server when mounted this page
  useEffect(() => {
    axios
      .get(
        customerGetOneUrl,
        {
          params: {
            _id: router.query.id,
          },
        },
        {
          onDownloadProgress: (data) => {
            setProgress(Math.round((100 * data.loaded) / data.total));
          },
        }
      )
      .then((res) => {
        if (res.data) {
          // console.log("one data;", res.data);
          // values = res.data;
          setValues({ ...values, ...res.data });
          setTempValues({ ...values, ...res.data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log("here:", router.query);
  }, [router.query]);

  //for edit request to server
  const EditCustomer = (customer) => {
    axios
      .post(`${customerEditUrl}`, customer,{
        onUploadProgress: (data) => {
          setProgressEdit(Math.round((100 * data.loaded) / data.total));
        },
      })
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
      .get(`${customerDelUrl}`, {
        params: {
          _id: router.query.id,
        },
      })
      .then((res) => {
        //console.log("delete success.")
      })
      .catch((err) => {
        console.log(err);
      });
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
    newPassword: "",
    confirmNewPassword: "",
  });
  // temp for compare with original
  const [tempValues, setTempValues] = useState({
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
    newPassword: "",
    confirmNewPassword: "",
  });

  //for tab
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  //for modal
  //for modal
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };
  // for edit save btn clicked
  const handleSaveClick = (event) => {
    // save routine
    //validate
    if (JSON.stringify(values) == JSON.stringify(tempValues)) {
      isChanged = false;
      setOpen(true);
    } else {
      isChanged = true;
      setOpen(false);
    }
    if (values.newPassword != "" && values.newPassword == values.confirmNewPassword) {
      console.log("here");
      console.log("here ", values);
      values.password = values.newPassword;
      isConfirmed = true;
      setOpen(false);
    } else {
      isConfirmed = false;
      setOpen(true);
    }

    if (isChanged) {
      // console.log("changed?", isChanged);
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

      if (values.newPassword == "" || values.newPassword == values.confirmNewPassword) {
        isConfirmed = true;
        EditCustomer(editData);
        router.push("/customers");
      }
    }
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
  const handleCancelClick = () => {
    router.push("/customers");
  };

  return (
    <>
      <Head>
        <title>Customer | Edit</title>
      </Head>
      <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle color="error">Note</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {!isChanged && (
              <Typography variant="subtitle1">
                There is no changed information. Please input different information.
              </Typography>
            )}
            {!isConfirmed && (
              <Typography variant="subtitle1">Please confirm your new password.</Typography>
            )}
          </DialogContentText>
          <Divider />
          <Button variant="outlined" onClick={handleClickClose} sx={{ mt: 2, width: "30%" }}>
            OK
          </Button>
        </DialogContent>
      </Dialog>

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
            
            {progress && <LinearProgressWithLabel value={progress} />}
            {progressEdit && <LinearProgressWithLabel value={progressEdit} />}
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                {/* {!isChanged && (
                  <Grid item 
                  lg={12} 
                  md={12} 
                  sx={12}>
                    <Typography color="error" 
                    sx={{ ml: 2 }}>
                      No changes
                    </Typography>
                  </Grid>
                )} */}
                {/* {!isConfirmed && (
                  <Grid item 
                  lg={12} 
                  md={12} 
                  sx={12}>
                    <Typography color="error" 
                    sx={{ ml: 2 }}>
                      Password no confirmed.
                    </Typography>
                  </Grid>
                )} */}
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
                              //onChange={handleChange}
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
                              value={values.newPassword}
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
                              value={values.confirmNewPassword}
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

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 2,
                ml: 3,
                mr: 3,
              }}
            >
              <Button color="success" variant="contained" onClick={handleSaveClick}>
                Save details
              </Button>
              {/* {!isChanged && (
                <Grid item 
                lg={12} 
                md={12} 
                sx={12}>
                  <Typography color="error" 
                  sx={{ ml: 2 }}>
                    No changes
                  </Typography>
                </Grid>
              )} */}
              {/* {!isConfirmed && (
                <Grid item 
                lg={12} 
                md={12} 
                sx={12}>
                  <Typography color="error" 
                  sx={{ ml: 2 }}>
                    Password no confirmed.
                  </Typography>
                </Grid>
              )} */}
              <Button color="success" variant="contained" onClick={handleCancelClick}>
                Cancel
              </Button>
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};
EditCutomer.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default EditCutomer;
