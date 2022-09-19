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
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import { baseUrl } from "src/config";
const isConfirmed = true;
const isChanged = false;
const adminInfoUrl = `${baseUrl}/admin/auth`;

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
  //for no change
  // const [isChanged, setIsChanged] = useState(true);
  //for confirm password
  // const [isConfirmed, setIsConfirmed] = useState(true);
  const [values, setValues] = useState({
    _id: null,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  // temp for comparison
  const [tempValues, setTempValues] = useState({
    _id: null,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  // for get admin info
  useEffect(() => {
    if (typeof window !== "undefined") {
      axios
        .get(`${adminInfoUrl}/get`, {
          params: JSON.parse(localStorage.getItem("token")),
        })
        .then((res) => {
          if (res.data.status) {
            console.log("get admin:", res.data.data);
            setValues({ ...values, ...res.data.data });
            setTempValues({ ...values, ...res.data.data });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  // for tabs
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  }; //=========

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const saveAccount = () => {
    if (JSON.stringify(values) == JSON.stringify(tempValues)) {
      isChanged = false;
    } else {
      isChanged = true;
    }
    console.log("newPassword:", values.newPassword);
    if (values.newPassword != "" && values.newPassword == values.confirmNewPassword) {
      console.log("here");
      console.log("here ", values);
      values.password = values.newPassword;
      isConfirmed = true;
    } else {
      isConfirmed = false;
    }
    if (isChanged) {
      let editData = {
        _id: values._id,
        email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
        password: values.password,
      };
      console.log("ischanged:", isChanged);
      console.log("isconfirmed", isConfirmed);
      console.log("password:", values.password);
      console.log("values:", editData);
      if (values.newPassword == "" || values.newPassword == values.confirmNewPassword) {
        axios
          .post(`${adminInfoUrl}/edit`, values)
          .then((res) => {
            console.log(res.data.data);
            if (res.data.status) {
              //setValues(res.data.data);// memory leak
              // change the localstorage
              if (typeof window !== "undefined") {
                localStorage.removeItem("email");
                localStorage.setItem("email", JSON.stringify({ email: res.data.data.email }));
                localStorage.removeItem("password");
                localStorage.setItem(
                  "password",
                  JSON.stringify({ password: res.data.data.password })
                );
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
        router.push("/dashboard");
      }
    } else {
    }
  };
  const cancelAccount = () => {
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
                  name="first_name"
                  onChange={handleChange}
                  required
                  value={values.first_name}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Last name"
                  name="last_name"
                  onChange={handleChange}
                  required
                  value={values.last_name}
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
              {/* <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  onChange={handleChange}
                  type="number"
                  value={values.phone}
                  variant="outlined"
                />
              </Grid> */}
              {/* <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  onChange={handleChange}
                  required
                  value={values.country}
                  variant="outlined"
                />
              </Grid> */}
              {/* <Grid item md={6} xs={12}>
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
              </Grid> */}
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
                name="password"
                //onChange={handleChange}
                required
                value={values.password}
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
          {!isChanged && (
            <Typography variant="body1" mt={1} mr={4} color="error">
              No changes.
            </Typography>
          )}
          {!isConfirmed && (
            <Typography variant="body1" mt={1} mr={4} color="error">
              Please confirm your password.
            </Typography>
          )}
          <Button color="primary" sx={{ mr: 3 }} variant="contained" onClick={saveAccount}>
            Save
          </Button>
          <Button color="primary" variant="contained" onClick={cancelAccount}>
            Cancel
          </Button>
        </Box>
      </Card>
    </form>
  );
};
