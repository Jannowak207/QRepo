import Head from "next/head";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { QRGenToolbar } from "./qr-code-gen/qr-gen-toolbar";
import { QRGenOptions } from "./qr-code-gen/qr-gen-options";
import { QRGenMain } from "./qr-code-gen/qr-gen-main";
import { DashboardLayout } from "./dashboard-layout";
import NextLink from "next/link";
//import { customers } from '../__mocks__/customers';
// for qr result
import { useState } from "react";

const QRCodeGen = (props) => {
  console.log("Here is QR Gen compoenet:props:"+props)
  console.log("url:"+props.url)
  const [qrResult, setQRResult] = useState("default");
  // when qr result is received from qr-gen-toolbar
  const handleCallback = (qrRes) => {
    setQRResult(qrRes);
  };

  return (
    <>
      <Container maxWidth={false}>
        {/* from this child component receive qr result */}
        <QRGenToolbar parentCallback={handleCallback} 
        url={props.url}/>
        <Box sx={{ mt: 1 }}>
          <Grid container spacing={1}>
            <Grid item lg={6} md={6} xs={12}>
              <QRGenOptions />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              {/* name=value format */}
              <QRGenMain url={props.url} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};
QRCodeGen.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default QRCodeGen;
