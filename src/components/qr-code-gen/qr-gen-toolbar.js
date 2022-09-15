import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  CardActions,
} from "@mui/material";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";
import { Download as DownloadIcon } from "../../icons/download";


import { useState, useEffect } from "react";

import QRCode from "qrcode";
import { blue, red } from "@mui/material/colors";

export const QRGenToolbar = (props) => {
  // console.log("QR toolbar here:props:"+props)
  // console.log("url"+props.url)
  // const [url, setUrl] = useState("");
  // const [qr, setQr] = useState("");

  // variable and handler for "Save as a template" check box
  // const [checked, setChecked] = useState(false);
  // const handleChange = (event) => {
  //   setChecked(event.target.checked);
  // };
  //---------------------------------------------------------
  // const GenerateQRCode = () => {
  //   QRCode.toDataURL(
  //     url,
  //     {
  //       width: 600,
  //       margin: 2,
  //       qrOptions: {
  //         typeNumber: 0,
  //         mode: "Byte",
  //         // backgroundColor:"red",
  //         // foregroundColor:"blue",
  //       },
  //       dotsOptions: {
  //         type: "rounded",
  //         gradient: true,
  //       },
  //       color: {
  //         dark: "#ff0000FF",
  //         light: "#001234FF",
  //       },
  //     },
  //     (err, url) => {
  //       if (err) return console.error(err);
  //       //setQr(url)//not read
  //       qr = url;
  //     }
  //   );
  // };

  // const onClickGenQR = () => {
  //   // props.parentCallback(url);
  //   //here qr code generation routin with qrcode module
  //   GenerateQRCode();
  //   props.parentCallback(qr);
  // };

  // const getInputUrl = (e) => {
  //   setUrl(e.target.value);
  // };

  return (
    <Box {...props}>
      <Box
        sx={{
          mt: 1,
        }}
      >

        {/* <Card> */}
        {/* <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              m: 1,
            }}
          > */}
{/* 
        <Box sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            m: 1,
          }}>
             <TextField
              sx={{width:'60%'}}
              InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>,
              }}
              placeholder="https://www.mywebsite.com"
              variant="outlined"
              onChange={getInputUrl}
            />
             <Button color="primary" variant="contained" onClick={onClickGenQR} sx={{ mt: 0 }}>
              Generate QR Code
            </Button>
          </Box> */}
        {/* </Box> */}
        {/* <Divider />
          <CardContent>
            <Grid container spacing={1}>
              <Grid item lg={6} md={6} xs={12}>
                <Typography mt={2} variant="button">
                  Options
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <Box
                  sx={{
                    width: "75%",
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    m: 1,
                  }}
                >
                  
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    p: 2,
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={<Checkbox checked={checked} onChange={handleChange} />}
                        label="Save as a template"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        color="success"
                        href={qr}
                        download="qrcode.png"
                        variant="contained"
                        style={{
                          width: "100%",
                        }}
                      >
                        Save
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        color="success"
                        variant="contained"
                        style={{
                          width: "100%",
                        }}
                      >
                        Email Me
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions></CardActions> */}
        {/* </Card> */}
      </Box>
    </Box>
  );
};
