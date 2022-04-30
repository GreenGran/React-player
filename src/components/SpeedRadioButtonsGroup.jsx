import React ,{useEffect, useState} from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { styled } from '@mui/material/styles';



export default function SpeedRadioButtonsGroup(props) {
  

 
    

    const [button,setButton] = useState(props.speedState);


    function HandleChange(event) {
    const StringToNumVar = Number(event.target.value)
    console.log(StringToNumVar);
    console.log(typeof(StringToNumVar));
    setButton(StringToNumVar);
    props.speedFunc(StringToNumVar);
  }
  
 
  

  return (
    <FormControl disabled={!props.videoLoaded }  style={{margin: "auto"}}  >
      <FormLabel ><b>Video Speed</b></FormLabel>
      <RadioGroup style={{margin: "auto"}}
        aria-labelledby="demo-radio-buttons-group-label"
        value={button}
        name="radio-buttons-group"
       
    
      >
        <FormControlLabel 
          onChange={HandleChange}
          labelPlacement="top"
          value="8"
          control={<Radio  color="default"  />}
          label="8"
          
        />
       
        <FormControlLabel 
          onChange={HandleChange}
          labelPlacement="top"
          value="5"
          control={<Radio color="default" />}
          label="5"
        /> 
        <FormControlLabel 
          onChange={HandleChange}
          labelPlacement="top"
          value="2"
          control={<Radio color="default" />}
          label="2"
        />
        <FormControlLabel 
          onChange={HandleChange}
          labelPlacement="top"
          value="1"
          control={<Radio  color="default"/>}
          label="1"
        />
        <FormControlLabel 
          onChange={HandleChange}
          labelPlacement="top"
          value="0.5"
          control={<Radio  color="default"/>}
          label="0.5"
        />
        <FormControlLabel 
          onChange={HandleChange}
          labelPlacement="top"
          value="0.25"
          control={<Radio  color="default"/>}
          label="0.25"
        />
        <FormControlLabel 
          onChange={HandleChange}
          labelPlacement="top"
          value="0.12"
          control={<Radio  color="default"/>}
          label="0.12"
        />
   
      </RadioGroup>
    </FormControl>
    
  );
}
