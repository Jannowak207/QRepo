import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import { baseUrl } from "src/config";

const accountServiceUrl = `${baseUrl}/account`;

const states = [
  {
    value: "alabama",
    label: "Alabama",
  },
  {
    value: "new-york",
    label: "New York",
  },
  {
    value: "san-francisco",
    label: "San Francisco",
  },
];

export const AccountProfileDetails = (props) => {
  const router = useRouter();
  const [values, setValues] = useState({
    firstName: "Katarina",
    lastName: "Smith",
    email: "demo@devias.io",
    phone: "",
    state: "Alabama",
    country: "USA",
    currentPassword: "********",
    newPassword: "",
    confirmNewPassword: "",
  });
  // for change account info: there is change if or not, if yes=>post req, no=> no post
  const [changeCount, setChangeCount] = useState(0);
  // for tabs
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  }; //=========

  useEffect(() => {
    console.log(values);
    setChangeCount((c) => c++);
  }, [values]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const saveAccount = () => {
    // post to the server routine
    // if changeCount>0 =>post
    // if(changeCount > 0)
    //   axios
    //     .post(accountServiceUrl,values,{
    //       headers:{
    //         Accept: "application/json",
    //         "Content-Type":"application/json;charset=UTF-8",
    //       },
    //     })
    //     .then(({data})=>{
    //       console.log(data);//response data
    //     });
    router.push("/dashboard");
  };
  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <Tabs value={tabIndex} onChange={handleTabChange} sx={{ mt: 2 }}>
          <Tab label="My Profile" />
          <Tab label="Password" />
        </Tabs>
        <Divider />
        <CardContent>
          {tabIndex === 0 && (
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.firstName}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={values.lastName}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
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
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  onChange={handleChange}
                  type="number"
                  value={values.phone}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  onChange={handleChange}
                  required
                  value={values.country}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Select State"
                  name="state"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.state}
                  variant="outlined"
                >
                  {states.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          )}
          {tabIndex === 1 && (
            <Box
              sx={{
                p: 0,
              }}
            >
              <TextField
                fullWidth
                label="Current Password"
                name="currentPassword"
                onChange={handleChange}
                required
                value={values.currentPassword}
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="New Password"
                name="newPassword"
                onChange={handleChange}
                required
                value={values.newPassword}
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Confirm New Password"
                name="confirmNewPassword"
                onChange={handleChange}
                required
                value={values.confirmNewPassword}
                variant="outlined"
              />
            </Box>
          )}
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
            mr: 1,
          }}
        >
          <Button color="primary" variant="contained" onClick={saveAccount}>
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
