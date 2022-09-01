import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@mui/material';

import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import PortraitIcon from '@mui/icons-material/Portrait';
import BrushIcon from '@mui/icons-material/Brush';
import FilterFramesIcon from '@mui/icons-material/FilterFrames';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import { patterns } from '../../__mocks__/qr-code/patterns';
import { eyes } from '../../__mocks__/qr-code/eyes';
import { frames } from '../../__mocks__/qr-code/frames';
import { templates } from '../../__mocks__/qr-code/templates';
import { QRGenOptionCard } from './qr-gen-option-card';
import FileInput from './file-input';
import SetColor from './set-color';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};

export const QRGenOptions = (props) => {
  const [ expanded, setExpanded ] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded?panel:false);
  };
  
  return (
    <>

    <Card {...props}>
      <CardContent>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <QrCodeScannerIcon/>
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              Choose patterns
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Data Patterns
            </Typography>
            <Box sx={{
              display: 'flex',
            }}>
              {patterns.map((pattern) => (
                <QRGenOptionCard option={pattern} />
              ))}
            </Box>
        </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <img
              alt="eye.svg imported from public directory"
              src="/static/images/qr_code/eyes/eye.svg"
            />
            <Typography sx={{ width: '33%', flexShrink: 0 }}>Choose eyes</Typography>
          </AccordionSummary>
          <AccordionDetails>

            <Typography>
              Eye Patterns
            </Typography>
            <Box sx={{
              display: 'flex',
            }}>
              {eyes.map((eye) => (
                <QRGenOptionCard option={eye} />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <PortraitIcon fontSize="medium"/>
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Add logo
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FileInput/>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <BrushIcon/>
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Set colors</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SetColor />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5bh-content"
          id="panel5bh-header"
        >
          <FilterFramesIcon/>
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Choose frame (optional)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Choose frame part here
          </Typography>
          <Box sx={{
              display: 'flex',
            }}>
              {frames.map((frame) => (
                <QRGenOptionCard option={frame} />
              ))}
            </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6bh-content"
          id="panel6bh-header"
        >
          <QrCode2Icon/>
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Templates (optional)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Templates part here
          </Typography>
          <Box sx={{
              display: 'flex',
            }}>
              {templates.map((template) => (
                <QRGenOptionCard option={template} />
              ))}
            </Box>
        </AccordionDetails>
      </Accordion>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          
        </Box>
      </CardContent>
    </Card>
    </>
  )
};
