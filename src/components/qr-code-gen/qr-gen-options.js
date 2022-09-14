import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  switchClasses,
  Typography,
} from "@mui/material";

import { useState } from "react";
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
import { QRGenOptionCard } from "./qr-gen-option-card";
import FileInput from "./file-input";
import SetColor from "./set-color";

const user = {
  avatar: "/static/images/avatars/avatar_6.png",
  city: "Los Angeles",
  country: "USA",
  jobTitle: "Senior Developer",
  name: "Katarina Smith",
  timezone: "GTM-7",
};

export const QRGenOptions = (props) => {
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // const handlePattern = (e) => {
  //   console.log(e.target.src)
  //   const baseStr = "http://localhost:3000/static/images/qr_code/patterns/"
  //   switch (e.target.src) {
  //     case baseStr+"1.svg":
  //       console.log("pattern1");
  //       break;
  //     case baseStr+"2.png":
  //       console.log("pattern2");
  //       break;
  //     case baseStr+"3.png":
  //       console.log("pattern3");
  //       break;
  //     case baseStr+"4.png":
  //       console.log("pattern4");
  //       break;
  //     case baseStr+"5.png":
  //       console.log("pattern5");
  //       break;
  //     case baseStr+"6.png":
  //       console.log("pattern6");
  //       break;
  //     case baseStr+"7.png":
  //       console.log("pattern7");
  //       break;
  //     case baseStr+"8.png":
  //       console.log("pattern8");
  //       break;
  //     case baseStr+"9.png":
  //       console.log("pattern9");
  //       break;
  //     case baseStr+"10.png":
  //       console.log("pattern10");
  //       break;
  //     case baseStr+"11.png":
  //       console.log("pattern11");
  //       break;
  //     case baseStr+"12.png":
  //       console.log("pattern12");
  //       break;
  //     default:
  //       console.log("default pattern");
  //       break;
  //   }

  // }

  const handlePattern = (event, key) => {
    console.log(event.target);
    console.log("key index:", key);
  };

  return (
    <>
      <Card {...props}>
        <CardContent>
        <Typography sx={{ ml: 2,mb:2 }} variant="h6">
            Options
          </Typography>
          <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <QrCodeScannerIcon />
              <Typography variant="button" ml={2}>Choose patterns</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Data Patterns</Typography>
              {patterns.map((pattern, key) => (
                <QRGenOptionCard
                  option={pattern}
                  onClick={(event) => handlePattern(event, key)}
                  key={key}
                />
              ))}
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <img
                alt="eye.svg imported from public directory"
                src="/static/images/qr_code/eyes/eye.svg"
              />
              <Typography variant="button" ml={2}>Choose eyes</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Eye Patterns</Typography>
              {eyes.map((eye) => (
                // <Grid
                //   item
                //   key={eye.id}
                //   lg={12}
                //   md={12}
                //   xs={12}
                //   >
                <QRGenOptionCard option={eye} key={eye.id} />
                // </Grid>
              ))}
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <PortraitIcon fontSize="medium" />
              <Typography variant="button" ml={2}>Add logo</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FileInput />
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === "panel4"} onChange={handleChange("panel4")}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <BrushIcon />
              <Typography variant="button" ml={2}>Set colors</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <SetColor />
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === "panel5"} onChange={handleChange("panel5")}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel5bh-content"
              id="panel5bh-header"
            >
              <FilterFramesIcon />
              <Typography variant="button" ml={2}>Choose frame (optional)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {frames.map((frame) => (
                <QRGenOptionCard option={frame} key={frame.id} />
              ))}
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === "panel6"} onChange={handleChange("panel6")}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel6bh-content"
              id="panel6bh-header"
            >
              <QrCode2Icon />
              <Typography variant="button" ml={2}>Templates (optional)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {templates.map((template) => (
                <QRGenOptionCard option={template} key={template.id} />
              ))}
            </AccordionDetails>
          </Accordion>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          ></Box>
        </CardContent>
      </Card>
    </>
  );
};
