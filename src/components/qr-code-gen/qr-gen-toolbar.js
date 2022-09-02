import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';
import { Download as DownloadIcon } from '../../icons/download';

import { useState, useEffect } from 'react';

import QRCode from 'qrcode';


export const QRGenToolbar = (props) => {

  const [ url, setUrl ] = useState("");
  const [ qr, setQr ] = useState("");

  const GenerateQRCode = () => {
    QRCode.toDataURL(url,{
      width:800,
      margin:2,
      color:{
        // dark: '#335383FF',
        // light: '#EEEEEEEE'
      }
    }, (err, url) => {
      if(err) return console.error(err)
      console.log(url)
      setQr(url)
    }
    )
  }

  const onClickGenQR = () =>{
   // props.parentCallback(url);
    //here qr code generation routin with qrcode module
    GenerateQRCode()
    props.parentCallback(qr)
  }

  const getInputUrl = (e) =>{
    setUrl(e.target.value);
  }

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
          Enter the URL of your site:{url}
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={onClickGenQR}
          >
            Generate QR Code
          </Button>
        </Box>
      </Box>
      <Box 
        sx={{ 
          mt: 3,
        }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                    </InputAdornment>
                  )
                }}
                placeholder="https://www.mywebsite.com"
                variant="outlined"
                onChange={getInputUrl}
              />
            </Box>

          </CardContent>
        </Card>
      </Box>
    </Box>
  )
};
