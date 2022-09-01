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
  const [checked, setChecked] = useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };


  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>

        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <img src='/static/images/sidebar_pro.png'/>

 




          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
                <FormControlLabel
        control={<Checkbox checked={checked} onChange={handleChange} />}
        label="Save as a template"
      />
          <Button
            color="primary"
            variant="contained"
          >
            Print quality Download
          </Button>
          <Button
            color="primary"
            variant="contained"
          >
            Email Me
          </Button>
        </Box>
      </Card>
    </form>
  );
};
