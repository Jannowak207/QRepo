import { Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";

import { QRCode } from "react-qrcode";
// hooks
import { useQRCode } from "react-qrcode";

export const QRGenMain = (props) => {
  const [checked, setChecked] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const [value, setValue] = useState("https://www.1stg.me");
  const opt = {
    width: 400,
    margin: 2,
    color: {
      dark: "#ff0000ff", //bgcolor
      light: "#00FFFFFF", //background-color
    },
    value: value,
  };
  const dataUrl = useQRCode(opt);

  return (
    <Card>
      <CardContent>
        <Grid container spacing={0} direction="column" alignItems="center">
          {props.qrRes && (
            <Box
              component="img"
              sx={{
                width: "75%",
              }}
              alt="QR code image"
              src={props.qrRes}
            />
          )}
        </Grid>
      </CardContent>
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
              href={props.qrRes}
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
      {/* <div>dataUrl: {dataUrl}</div>
      <img src={dataUrl} />
      <input onChange={(e) => setValue(e.currentTarget.value)} />
      <Button
        color="success"
        href={dataUrl}
        download="qrcode12.png"
        variant="contained"
        style={{
          width: "100%",
        }}
      >
        Print quality Download
      </Button> */}
    </Card>
  );
};
