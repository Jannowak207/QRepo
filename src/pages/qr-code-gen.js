import Head from "next/head";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { QRGenToolbar } from "../components/qr-code-gen/qr-gen-toolbar";
import { QRGenOptions } from "../components/qr-code-gen/qr-gen-options";
import { QRGenMain } from "../components/qr-code-gen/qr-gen-main";
import { DashboardLayout } from "../components/dashboard-layout";
import NextLink from 'next/link';
//import { customers } from '../__mocks__/customers';
// for qr result
import { useState } from "react";

const QRCodeGen = () => {
  const [qrResult, setQRResult] = useState("default");
  // when qr result is received from qr-gen-toolbar
  const handleCallback = (qrRes) => {
    setQRResult(qrRes);
  };

  return (
    <>
      <Head>
        <title>New QR Code Generate</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          {/* from this child component receive qr result */}
          <QRGenToolbar parentCallback={handleCallback} />
          <Box sx={{ mt: 3 }}>
            <Typography sx={{ mb: 3 }} variant="h4">
              Options
            </Typography>
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} xs={12}>
                <QRGenOptions />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                {/* name=value format */}
                <QRGenMain qrRes={qrResult} />
              </Grid>
            </Grid>
            <NextLink href="/media" 
            passHref>
              <Button sx={{mt:2}} variant="contained" color="success">Go back to media library</Button>
            </NextLink>
          </Box>
        </Container>
      </Box>
    </>
  );
};
QRCodeGen.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default QRCodeGen;
