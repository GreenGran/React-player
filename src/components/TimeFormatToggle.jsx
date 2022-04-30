
import React, { useState } from "react";

    function TimeFormatToggle(props) {
      const [toggle,setToggle] = useState(false);
      function temp(event){
        setToggle(!toggle);
        props.timeFormatChanger()
        //console.log("toggleing "+toggle);
      }
      return (<div>
        <p> <b>normal/seconds only </b></p>
          <label  className="switch">
           <input onChange={temp} type="checkbox" />
            <span className="slider round"></span>
            </label> 
        </div>);
    }
  
export default TimeFormatToggle;