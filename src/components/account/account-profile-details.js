import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
//for modal dialog
// for modal dlg
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LinearProgressWithLabel from "../LinearProgressWithLabel";

import { useRouter } from "next/router";
import axios from "axios";
import { baseUrl } from "src/config";

//for validate
const isConfirmed = true;
const isChanged = false;
const adminInfoUrl = `${baseUrl}/admin/auth`;

export const AccountProfileDetails = (props) => {
  const router = useRouter();

  //for modal
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

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
  //for progressbar
  const [progress, setProgress] = useState();
  // for get admin info
  useEffect(() => {
    if (typeof window !== "undefined") {
      axios
        .get(
          `${adminInfoUrl}/get`,
          {
            params: JSON.parse(localStorage.getItem("token")),
          },
          {
            onDownloadProgress: (data) => {
              setProgress(Math.round((100 * data.loaded) / data.total));
            },
          }
        )
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
      setOpen(true);
    } else {
      isChanged = true;
      setOpen(false);
    }
    console.log("newPassword:", values.newPassword);
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

      <Card>
        {progress && <LinearProgressWithLabel value={progress} />}
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
              {/* <Grid
                item
                lg={12}
                md={12}
                xs={12}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                {!isChanged && (
                  <Typography variant="body1" 
                  mt={1}
                  mr={4} 
                  color="error">
                    No changes.
                  </Typography>
                )}
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
              {/* {!isConfirmed && (
                <Typography variant="body1" 
                mt={1} 
                mr={4} 
                color="error">
                  Please confirm your password.
                </Typography>
              )} */}
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
