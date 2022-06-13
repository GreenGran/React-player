
import React from "react";
import Switch from '@mui/material/Switch';


export default function TimeFormatToggle(props) {


  const handleChange = (event) => {
    props.timeFormatChanger();
  };

  return (
    <div>
     <p> <b>normal/seconds only </b></p>
    <Switch color="default"
      checked={props.checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
    </div>
  );
}