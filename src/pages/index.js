import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, Divider, Grid, Link, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Facebook as FacebookIcon } from "../icons/facebook";
import { Google as GoogleIcon } from "../icons/google";
// for modal dlg
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "src/config";
import { SignalCellularNull } from "@mui/icons-material";

const AdminUserSignInUrl = `${baseUrl}/admin/auth/signin`;

const Login = () => {
  const [storageEmail, setStorateEmail] = useState("");
  const [storagePassword, setStoragePassword] = useState("");
  const [token, setToken] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      // console.log('token:',JSON.parse(localStorage.getItem('token')))
      // console.log('email',JSON.parse(localStorage.getItem('email')).email)
      // console.log('password:',JSON.parse(localStorage.getItem('password')).password)
      if (
        localStorage.getItem("token") &&
        localStorage.getItem("email") &&
        localStorage.getItem("password")
      ) {
        setToken(JSON.parse(localStorage.getItem("token")));
        setStorateEmail(JSON.parse(localStorage.getItem("email")).email);
        setStoragePassword(JSON.parse(localStorage.getItem("password")).password);
      }
    }
  }, []);

  // for "Add a customer" modal dialog
  const [open, setOpen] = useState(false);
  // for one time show modal-----------------
  // useEffect(() => {
  //   let timer = setTimeout(() => {
  //     setOpen(() => true);
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, []);
  //------------------------------------------
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };
  ///////////////////////////////////////////////
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: storageEmail,
      password: storagePassword,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    // onSubmit: () => {
    //   if (token==null) {
    //     // there is no token, so go to register page
    //     router.push("/register");
    //   } else {
    //     // email and password validation for inputed
    //     if(formik.values.email == storageEmail && formik.values.password == storagePassword){
    //       axios
    //       .post(`${AdminUserSignInUrl}`, token)
    //       .then((res) => {
    //         if (res.data.status) {
    //           router.push("/dashboard"); // go to dashboard page
    //         } else {
    //           router.push('/register')
    //         }
    //       })
    //       .catch((err) => console.log(err));
    //     } else{
    //       router.reload()
    //     }
    //   }
    // },
  });
  const [loginState, setLoginState] = useState();
  const onSubmitSend = () => {
    console.log("clicked.");
    axios
      .post(`${AdminUserSignInUrl}`, {
        email: formik.values.email,
        password: formik.values.password,
      })
      .then((res) => {
        console.log("res.status:",res.data.status)
        if (res.data.status == 2) {
          // have to register
          setLoginState(2);
          setOpen(true)
          console.log("Have to register.");
        } else if (res.data.status == 1) {
          router.push("/dashboard");
        } else {
          // show modal
          console.log("show modal");
          setLoginState(1);
          setOpen(true);
        }
      });
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle color="error">Note</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {loginState == 1 && (
              <Typography variant="subtitle1">
                Your email or password is not correct. Please retype your information.
              </Typography>
            )}
            {loginState == 2 && (
              <Typography variant="subtitle1">
                You have to register.
              </Typography>
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
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Sign in
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                // disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={onSubmitSend}
              >
                Sign In Now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Don&apos;t have an account?{" "}
              <NextLink href="/register">
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  Sign Up
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
