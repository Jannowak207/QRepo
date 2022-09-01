import { RadioGroup, FormControlLabel, Radio, FormLabel, Checkbox} from '@mui/material';
import { ColorPicker, ColorBox, ColorInput, ColorPalette, ColorButton  } from 'material-ui-color';
import { useState } from 'react';

const palette = {
  red: '#ff0000',
  blue: '#0000ff',
  green: '#00ff00',
  yellow: 'yellow',
  cyan: 'cyan',
  lime: 'lime',
  gray: 'gray',
  orange: 'orange',
  purple: 'purple',
  black: 'black',
  white: 'white',
  pink: 'pink',
  darkblue: 'darkblue',
};

const data = [
  {
    id: "1",
    value: "Single color"
  },
  { id: "2", value: "Color gradient" }
];


const SetColor = () => {

  const [selection, setSelection] = useState({
    value: "1",
    value2: "1"
  });
  const [checked, setChecked] = useState(true);
  const updateSelection = (event, value) => {
    event.persist();
    const name = event.target.name;
    setSelection({ ...selection, [name]: value });
  };
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <>
<FormLabel component="legend">Color Mode</FormLabel>
  Value: {selection.value2}

      <RadioGroup
        name="value2"
        value={selection.value2}
        onChange={updateSelection}
      >
        {data.map(datum => (
          <FormControlLabel
            label={datum.value}
            key={datum.id}
            value={datum.id}
            control={<Radio color="primary" />}
          />
        ))}
      </RadioGroup>
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={handleChange} />}
        label="Custom Eye Color"
      />
      <ColorPicker
        name="color"
        defaultValue="#000"
        // value={this.state.color} - for controlled component
        onChange={color => console.log(color)}
      />
       <ColorPicker defaultValue="transparent"/>
       <ColorBox defaultValue="transparent"/>
       <ColorInput defaultValue="red"/>
       <ColorPalette palette={palette} />
       <ColorButton color="red"/>
    </>
  )
}

export default SetColor;