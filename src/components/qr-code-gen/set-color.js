import { Button, Divider, Grid, RadioGroup, FormControlLabel, Radio, FormLabel, Checkbox} from '@mui/material';
import { ColorPicker, ColorBox, ColorInput, ColorPalette, ColorButton  } from 'material-ui-color';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';



const data = [
  {
    id: "1",
    value: "Single color"
  },
  { id: "2", value: "Color gradient" }
];

// color mode access with {selection.value2}

const SetColor = () => {

  const [selection, setSelection] = useState({
    value: "1",
    value2: "1"
  });
  const [changeMode, setChangeMode] = useState('1');
  const [checked, setChecked] = useState(true);
  const [transBackgroundChecked, setTransBackgroundChecked]= useState(false);
  const updateSelection = (event, value) => {
    event.persist();
    const name = event.target.name;
    setSelection({ ...selection, [name]: value });
  };
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleTransBackgroundChange = (event) => {
    setTransBackgroundChecked(event.target.checked);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={8}>
        <RadioGroup
            name="value2"
            value={selection.value2}
            onChange={updateSelection}
          >
          {data.map((datum) => (
            // <Grid container spacing={1}>
              <Grid 
                item
                xs={12}
                md={8}
                key={datum.id}
                >
                <FormControlLabel
                  label={datum.value}
                  key={datum.id}
                  value={datum.id}
                  control={<Radio color="primary" />}
                />
              </Grid>
            // </Grid>
          ))}
        </RadioGroup>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={handleChange} />}
          label="Custom Eye Color"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <ColorPicker defaultValue="transparent"/>
      </Grid>
      <Grid item xs={12} md={6}>
        {selection.value2 == 2 && <ColorPicker defaultValue="transparent"/>}
      </Grid>
      <Grid item xs={12} md={12}>
        <Button>
          <SyncAltIcon />
        </Button>
        <Select
          value={changeMode}
          defaultValue={changeMode}
          onChange={(event) => setChangeMode(event.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
     
        >
          <MenuItem value={1}>Left-Right</MenuItem>
          <MenuItem value={2}>Top-Bottom</MenuItem>
          <MenuItem value={3}>NW-SE</MenuItem>
          <MenuItem value={4}>SW-NE</MenuItem>
          <MenuItem value={5}>Radial</MenuItem>
        </Select>
      </Grid>
      { checked && <Grid item xs={12} md={12}>
        Eye color
      </Grid>}
      { checked && <Grid item xs={12} md={6}>
          <ColorPicker defaultValue="transparent"/>
      </Grid>}
      { checked && <Grid item xs={12} md={6}>
        <ColorPicker defaultValue="transparent"/>
      </Grid>}
      <Grid item xs={12} md={12}>
        Background color
      </Grid>
      <Grid item xs={12} md={12}>
        <ColorPicker defaultValue="transparent"/>
      </Grid>
      <Grid item xs={12} md={12}>
      <FormControlLabel
          control={<Checkbox checked={transBackgroundChecked} onChange={handleTransBackgroundChange} />}
          label="Transparent background"
        />
      </Grid>
    </Grid>
  )
}

export default SetColor;