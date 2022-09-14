import Head from "next/head";
import NextLink from "next/link";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Drawer,
  Grid,
  Input,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DashboardLayout } from "../../components/dashboard-layout";
import { useRouter } from "next/router";
import QRCodeGen from "../../components/qr-code-gen";
import { useState, useEffect } from "react";

const EditMedia = () => {

  const [mediaData, setMediaData] = useState({
    fileName:"",
    fileType: "",
    fileSize: 0,
    fileUrl: "",
  });
  const handleChange = (event) => {
    setMediaData({
      ...mediaData,
      fileName: event.target.value,
      fileType: event.target.files[0].type,
      fileSize:event.target.files[0].size,
      fileUrl:event.target.value
    });
    // let array = mediaData.fileName.split(".")
    // console.log("array:"+array)
    // mediaData.fileType = array.pop();
    // console.log("fileType:"+mediaData.fileType)
    // mediaData.fileSize=event.target.files[0].size
    // mediaData.fileName=event.target.files[0].name
    // mediaData.fileType=event.target.files[0].type
    // setMediaData({
    //   ...mediaData,
    //   fileType:
    // })

  };
  const router = useRouter();
  const handleSave = () => {
    //save routine
    router.push("/media");
  };
  return (
    <>
      <Head>
        <title>Media Library</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          {/* <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "flex-start",
              flexWrap: "wrap",
              m: 3,
            }}
          >
            <Box sx={{ m: 1 }}>
              <NextLink href="/qr-code-gen" passHref>
                <Button
                  color="error"
                  component="a"
                  startIcon={<AddIcon />}
                  sx={{ mt: 2 }}
                  variant="contained"
                >
                  New QR Code
                </Button>
              </NextLink>
            </Box>
          </Box> */}
          <Card>
            <Typography variant="h5" sx={{ m: 3 }}>
              Media Details
            </Typography>
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item lg={6} md={6} sx={12}>
                  <Input
                    autoFocus
                    margin="dense"
                    id="mediafile"
                    type="file"
                    name="fileName"
                    fullWidth
                    variant="standard"
                    label="Media File"
                    value={mediaData.fileName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item lg={3} md={3} sx={12}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="filetype"
                    type="text"
                    fullWidth
                    variant="standard"
                    label="File Type"
                    name="fileType"
                    value={mediaData.fileType}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item lg={3} md={3} sx={12}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="size"
                    type="number"
                    fullWidth
                    variant="standard"
                    label="File Size"
                    name="fileSize"
                    value={mediaData.fileSize}
                    o
                  />
                </Grid>
                <Divider />
                <Grid item lg={6} md={6} sx={12}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="url"
                    type="url"
                    fullWidth
                    variant="standard"
                    label="File URL"
                    name="fileUrl"
                    value={mediaData.fileName}
                    
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Card mt={3}>
            <CardContent mt={3}>
              <QRCodeGen url={mediaData.fileUrl}/>
            </CardContent>
            <Divider />
            <CardActions>
              <Button sx={{ ml: 3 }} color="success" variant="contained" onClick={handleSave}>
                Save
              </Button>
            </CardActions>
          </Card>
        </Container>
      </Box>
    </>
  );
};
EditMedia.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default EditMedia;
