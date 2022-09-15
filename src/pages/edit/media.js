import Head from "next/head";
import NextLink from "next/link";
import {
  Avatar,
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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
// for qr options----------------------------------------------------------------
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import PortraitIcon from "@mui/icons-material/Portrait";
import BrushIcon from "@mui/icons-material/Brush";
import FilterFramesIcon from "@mui/icons-material/FilterFrames";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import { patterns } from "../../__mocks__/qr-code/patterns";
import { eyes } from "../../__mocks__/qr-code/eyes";
import { frames } from "../../__mocks__/qr-code/frames";
import { templates } from "../../__mocks__/qr-code/templates";
import { QRGenOptionCard } from "../../components/qr-code-gen/qr-gen-option-card";
import FileInput from "../../components/qr-code-gen/file-input";
import SetColor from "../../components/qr-code-gen/set-color";
// end for qr options -------------------------------------------------------------
import AddIcon from "@mui/icons-material/Add";
import { DashboardLayout } from "../../components/dashboard-layout";
import { useRouter } from "next/router";
import QRCodeGen from "../../components/qr-code-gen";

import QRCodeStyling, { dotTypes } from "qr-code-styling";
import { useState, useEffect, useRef } from "react";

// for qr code
const qrCode = new QRCodeStyling({
  width: 500,
  height: 500,
  //image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
  // dotsOptions: {
  //   color: "#4267b2",
  //   type: "rounded",
  // },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 20,
  },
});
// end for qr code

const EditMedia = () => {
  const [qrColors, setQRColors] = useState({
    backColor: "#ffffff",
    dotColor: "#000000",
    eyeDotColor: "#000000",
    eyeSquareColor: "#000000",
  });
  //for download type
  const [changeMode, setChangeMode] = useState("1");

  // for accordian=================
  const [expanded, setExpanded] = useState(false);
  const handleAccordianChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  //======end for accordian============================
  // for qr code------------------------------------------------------------------------------
  const [url, setUrl] = useState("https://qr-code-styling.com"); // file url update
  const [dotType, setDotType] = useState("rounded");
  const [dotColor, setDotColor] = useState("#ff0000");
  const [eyeType, setEyeType] = useState("dot");
  const [eyeDotColor, setEyeDotColor] = useState("#0000ff");
  const [eyeSquareColor, setEyeSqureColor] = useState("#00ff00");
  const [backColor, setBackColor] = useState("#dddddd");
  const [logoImage, setLogo] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
  );

  const [fileExt, setFileExt] = useState("png");
  const ref = useRef(null);
  useEffect(() => {
    qrCode.append(ref.current);
  }, []);

  //for the url update
  useEffect(() => {
    qrCode.update({
      data: url,
      image: logoImage,
      dotsOptions: { color: dotColor, type: dotType },
      cornersDotOptions: { type: eyeType[0], color: eyeDotColor },
      cornersSquareOptions: { type: eyeType[1], color: eyeSquareColor },
      backgroundOptions: { color: backColor },
    });
    console.log("logo !!!!!!!:" + logoImage);
  }, [url, dotType, eyeType, logoImage, dotColor, eyeDotColor, eyeSquareColor, backColor]);

  const onSetDotType = (e) => {
    setDotType(e.target.value);
    if(e.target.alt)
      setDotType(e.target.alt)
    console.log(e.target.alt)
  };
  const onSetEyeType = (e) => {
    let eyeArray = e.target.value.split(".");
    setEyeType(eyeArray);
  };
  const onSetLog = (logoImg) => {
    console.log("logo received.");
    setLogo(logoImg);
    logoImage = logoImg;
    console.log("received logo:" + logoImg);
  };
  const onSetQRColors = (colors) => {
    if (colors) {
      setQRColors(colors);
      qrColors = colors;
      setDotColor(colors.dotColor);
      setBackColor(colors.backColor);
      setEyeDotColor(colors.eyeDotColor);
      setEyeSqureColor(colors.eyeSquareColor);
    }
  };
  const onUrlChange = (event) => {
    event.preventDefault();
    setUrl(event.target.value);
  };

  const onExtensionChange = (event) => {
    setFileExt(event.target.value);
  };

  const onDownloadClick = () => {
    qrCode.download({
      extension: fileExt,
    });
  };
  // end for qr code-----------------------------------------------------------------------------
  const [mediaData, setMediaData] = useState({
    fileName: "",
    fileType: "",
    fileSize: 0,
    fileUrl: "",
  });
  const handleChange = (event) => {
    setMediaData({
      ...mediaData,
      fileName: event.target.value,
      fileType: event.target.files[0].type,
      fileSize: event.target.files[0].size,
      fileUrl: event.target.value,
    });
    setUrl(event.target.value);
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
              <Divider />
              <Grid container spacint={3} my={3}>
                <Grid item lg={6} md={6} sx={12}>
                  <Typography variant="button">Options</Typography>
                  <Accordion
                    expanded={expanded === "panel1"}
                    onChange={handleAccordianChange("panel1")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <QrCodeScannerIcon />
                      <Typography variant="button" ml={2}>
                        Choose patterns
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>Data Patterns</Typography>
                      {/* {patterns.map((pattern, key) => (
                        <QRGenOptionCard
                          option={pattern}
                          onClick={(event) => handlePattern(event, key)}
                          key={key}
                          parentCallback={onDotTypeChange}
                        />
                      ))} */}
                    
                      <Button 
                      sx={{p:0, my:2}}
        
                      onClick={onSetDotType} 
                      startIcon={
                        <Avatar 
                          onClick={onSetDotType} 
                          alt="square" 
                          src={'/static/images/qr_code/patterns/1.png'} 
                          variant="square" 
                          />}
                      value="square">
                      </Button>
                      <Button 
                      sx={{p:0, my:2}}
                  
                      onClick={onSetDotType} 
                      startIcon={
                        <Avatar
                          onClick={onSetDotType} 
                          alt="rounded"
                          src={'/static/images/qr_code/patterns/2.png'}
                          variant="square" 
                          value="rounded"/>}
                      value="rounded">
                      </Button>
                      <Button 
                      sx={{p:0, my:2}}
                      
                      onClick={onSetDotType} 
                      startIcon={
                        <Avatar 
                          onClick={onSetDotType} 
                          alt="dots" 
                          src={'/static/images/qr_code/patterns/3.png'} 
                          variant="square" 
                          />}
                      value="dots">
                      </Button>
                      <Button
                      sx={{p:0, my:2}}
                       onClick={onSetDotType} 
                       startIcon={
                        <Avatar 
                          onClick={onSetDotType} 
                          alt="classy" 
                          src={'/static/images/qr_code/patterns/4.png'} 
                          variant="square" 
                          />}
                       value="classy">
                  
                      </Button>
                      <Button
                      sx={{p:0, my:2}}
                       onClick={onSetDotType} 
                       startIcon={
                        <Avatar 
                          onClick={onSetDotType} 
                          alt="classy-rounded" 
                          src={'/static/images/qr_code/patterns/5.png'} 
                          variant="square" 
                          />}
                       value="classy-rounded">
                    
                      </Button>
                      <Button
                      sx={{p:0, my:2}}
                      onClick={onSetDotType} 
                      startIcon={
                        <Avatar 
                          onClick={onSetDotType} 
                          alt="extra-rounded" 
                          src={'/static/images/qr_code/patterns/6.png'} 
                          variant="square" 
                          />}
                      value="extra-rounded">
              
                      </Button>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "panel2"}
                    onChange={handleAccordianChange("panel2")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2bh-content"
                      id="panel2bh-header"
                    >
                      <img
                        alt="eye.svg imported from public directory"
                        src="/static/images/qr_code/eyes/eye.svg"
                      />
                      <Typography variant="button" ml={2}>
                        Choose eyes
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>Eye Patterns</Typography>
                      {/* {eyes.map((eye) => (
                        <QRGenOptionCard option={eye} key={eye.id} />
                      ))} */}

                      {/* for eye dot type */}
                      <Button variant="outlined" onClick={onSetEyeType} value="dot.dot">
                        dot.dot
                      </Button>
                      <Button variant="outlined" onClick={onSetEyeType} value="dot.square">
                        dot.square
                      </Button>
                      <Button variant="outlined" onClick={onSetEyeType} value="dot.extra-rounded">
                        dot.extra-rounded
                      </Button>
                      <Button variant="outlined" onClick={onSetEyeType} value="square.dot">
                        dot.dot
                      </Button>
                      <Button variant="outlined" onClick={onSetEyeType} value="square.square">
                        dot.square
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={onSetEyeType}
                        value="square.extra-rounded"
                      >
                        dot.extra-rounded
                      </Button>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "panel3"}
                    onChange={handleAccordianChange("panel3")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel3bh-content"
                      id="panel3bh-header"
                    >
                      <PortraitIcon fontSize="medium" />
                      <Typography variant="button" ml={2}>
                        Add logo
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <FileInput parentCallback={onSetLog} />
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "panel4"}
                    onChange={handleAccordianChange("panel4")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel4bh-content"
                      id="panel4bh-header"
                    >
                      <BrushIcon />
                      <Typography variant="button" ml={2}>
                        Set colors
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <SetColor parentCallback={onSetQRColors} />
                    </AccordionDetails>
                  </Accordion>
                  {/* <Accordion
                    expanded={expanded === "panel5"}
                    onChange={handleAccordianChange("panel5")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel5bh-content"
                      id="panel5bh-header"
                    >
                      <FilterFramesIcon />
                      <Typography variant="button" ml={2}>
                        Choose frame (optional)
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {frames.map((frame) => (
                        <QRGenOptionCard option={frame} key={frame.id} />
                      ))}
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "panel6"}
                    onChange={handleAccordianChange("panel6")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel6bh-content"
                      id="panel6bh-header"
                    >
                      <QrCode2Icon />
                      <Typography variant="button" ml={2}>
                        Templates (optional)
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {templates.map((template) => (
                        <QRGenOptionCard option={template} key={template.id} />
                      ))}
                    </AccordionDetails>
                  </Accordion> */}
                </Grid>
                <Grid item lg={6} md={6} sx={12}>

                  {/* for qr code---------------------------------------------------------------------- */}
                  <Grid container spacing={0} direction="column" alignItems="center">
                    <Grid item lg={12} md={12} sx={12}>
                      <Box>
                        <Box sx={{ width: "90%" }} ref={ref} />
                      </Box>
                    </Grid>
                  </Grid>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      m: 3,
                    }}
                  >
                    {/* <select onChange={onExtensionChange} value={fileExt}>
                          <option value="png">PNG</option>
                          <option value="jpeg">JPEG</option>
                          <option value="webp">WEBP</option>
                        </select> */}
                    <Select
                      value={fileExt}
                      defaultValue={fileExt}
                      onChange={onExtensionChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="png">PNG</MenuItem>
                      <MenuItem value="jpeg">JPEG</MenuItem>
                      <MenuItem value="webp">WEBP</MenuItem>
                    </Select>
                    <Button variant="contained" color="secondary" onClick={onDownloadClick}>
                      Download
                    </Button>
                  </Box>
                </Grid>
              </Grid>
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
// //------ for qr code ------------------------------------------------------------------------
// const styles = {
//   inputWrapper: {
//     margin: "20px 0",
//     display: "flex",
//     justifyContent: "space-between",
//     width: "100%",
//   },
//   inputBox: {
//     flexGrow: 1,
//     marginRight: 20,
//   },
// };
// // ----------end for qr code -----------------------------------------------------------------
