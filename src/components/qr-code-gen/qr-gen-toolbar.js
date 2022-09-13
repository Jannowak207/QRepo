import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";
import { Download as DownloadIcon } from "../../icons/download";
import { QRCodeCanvas } from "qrcode.react";

import { useState, useEffect } from "react";

import QRCode from "qrcode";
import { blue, red } from "@mui/material/colors";

export const QRGenToolbar = (props) => {
  const [url, setUrl] = useState("");
  const [qr, setQr] = useState("");

  const GenerateQRCode = () => {
    QRCode.toDataURL(
      url,
      {
        width: 600,
        margin: 2,
        qrOptions: {
          typeNumber: 0,
          mode: "Byte",
          // backgroundColor:"red",
          // foregroundColor:"blue",
        },
        dotsOptions: {
          type: "rounded",
          gradient: true,
        },
        color: {
          dark: "#ff0000FF",
          light: "#001234FF",
        },
      },
      (err, url) => {
        if (err) return console.error(err);
        //setQr(url)//not read
        qr = url;
      }
    );
  };

  const onClickGenQR = () => {
    // props.parentCallback(url);
    //here qr code generation routin with qrcode module
    GenerateQRCode();
    props.parentCallback(qr);
  };

  const getInputUrl = (e) => {
    setUrl(e.target.value);
  };

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Enter the URL for QR code
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button color="primary" variant="contained" onClick={onClickGenQR}>
            Generate QR Code
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          mt: 3,
        }}
      >
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position="start"></InputAdornment>,
                }}
                placeholder="https://www.mywebsite.com"
                variant="outlined"
                onChange={getInputUrl}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* {url && <QRCodeCanvas value={url} />} */}
    </Box>
  );
};
