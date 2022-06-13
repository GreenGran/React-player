import React from "react";
import Switch from '@mui/material/Switch';
    function LoopingToggle(props) {

      
      function handleChange(event){
    
        props.loopToggleChanger(event.target.checked);
      }
      return (<div >
     
      <p><b> Video looping</b></p>
    <Switch color="default"
      // checked={props.checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}/>
    </div>
     );
    }
  
export default LoopingToggle;