import { Checkbox, FormControlLabel } from '@mui/material';
import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';



export const QRGenMain = (props) => {
  const [checked, setChecked] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };


  return (
      <Card>
        <CardContent>
          <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
            >
            <Box
                component="img"
                sx={{
                  width: '75%',
                }}
                alt="qr code"
                src={props.qrRes}
              />
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}>
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
                Print quality Download
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
      </Card>
  );
};
