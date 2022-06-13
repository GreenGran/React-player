import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import Stack from "@mui/material/Stack";
import { styled } from '@mui/material/styles';


export default function VerticalSlider(props) {


//changes slider color to black
  const BlackSlider = styled(Slider)({
    color: '#14171A',
  });


  function preventHorizontalKeyboardNavigation(event) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
    }
  }

function changeVolumeStateOnCommit(event, value)
{
  props.onCommitVolume(value/100);
}

function volumeStateHandler(){
    return props.volumeState * 100
}

function labelFormatter(labelValue){
  return labelValue.toFixed(0);//fixing formating issue
}

  const handleChange = (event, newValue) => {
     props.volumeFunc(newValue/100);
  };

  return (
    <Box sx={{ height: "100%" }}>
      <Stack
        spacing={2}
        orientation="vertical"
        sx={{ height: "100%" }}
        alignItems="center"
      >
       <VolumeUp  color={!props.videoLoaded ? 'disabled' : 'inherit'} />
        <BlackSlider
         
          defaultValue={volumeStateHandler()}
          orientation="vertical"
         onChange={handleChange}
          aria-label="volume"
          onKeyDown={preventHorizontalKeyboardNavigation}
          onChangeCommitted={changeVolumeStateOnCommit}
          min={0}
          max={100}
          step={1}
          valueLabelDisplay='on'
          valueLabelFormat={labelFormatter} 
          color='secondary'
          disabled={!props.videoLoaded}
          
        />
        
        <VolumeDown color={!props.videoLoaded ? 'disabled' : 'inherit'} />
       
      </Stack>
    </Box>
  );
}
