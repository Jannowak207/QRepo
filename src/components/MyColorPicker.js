import { style } from "@mui/system";
import { useState } from "react";
import { SketchPicker } from "react-color";
import styled from "styled-components";



export const MyColorPicker = () => {
  const [state, setState] = useState({
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
  });

  const handleClick = () => {
    setState({...state, displayColorPicker: !state.displayColorPicker });
  };

  const handleClose = () => {
    setState({...state, displayColorPicker: false });
  };

  const handleChange = (color) => {
    setState({...state, color: color.rgb });
  };

  return (
    <StyledDiv>
      <StyledSwatch onClick={ handleClick }>
        <StyledColorDiv style={{background: `rgba(${ state.color.r }, ${ state.color.g }, ${ state.color.b }, ${ state.color.a })`}}/>
      </StyledSwatch>
      { state.displayColorPicker ?
        <StyledPopover>
          <StyledCover onClick={ handleClose }/>
          <SketchPicker color={ state.color } onChange={ handleChange } />
        </StyledPopover> : null
      }
    </StyledDiv>
  )
}
// styled components
const StyledDiv = styled.div`

`
const StyledSwatch = styled.div`
padding: 5px;
background: #fff;
border-radius: 1px;
box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
display: inline-block;
cursor: pointer;
`
const StyledColorDiv = styled.div`
width: 36px;
height: 14px;
border-radius: 2px;
`
const StyledPopover = styled.div`
position: absolute;
z-index: 2;
`

const StyledCover = styled.div`
position: fixed;
top: 0px;
right: 0px;
bottom: 0px;
left: 0px;
`